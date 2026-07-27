import { beforeAll, describe, expect, test } from "bun:test";
import "@testing-library/react";
import {
	existsSync,
	readdirSync,
	readFileSync,
	statSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const dist = join(root, "dist");

beforeAll(async () => {
	const proc = Bun.spawn({
		cmd: [process.execPath, "run", "build"],
		cwd: root,
		env: { ...process.env, NODE_ENV: "production" },
		stdout: "pipe",
		stderr: "pipe",
	});
	const [stdout, stderr, exitCode] = await Promise.all([
		new Response(proc.stdout).text(),
		new Response(proc.stderr).text(),
		proc.exited,
	]);
	if (exitCode !== 0) {
		throw new Error(`package build failed\n${stdout}\n${stderr}`);
	}
}, 20_000);

type ConditionalExport = Record<string, string>;

function packageExports(): Record<string, ConditionalExport> {
	const manifest = JSON.parse(
		readFileSync(join(root, "package.json"), "utf8"),
	) as { exports: Record<string, ConditionalExport> };
	return manifest.exports;
}

function filesBelow(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name);
		return entry.isDirectory() ? filesBelow(path) : [path];
	});
}

describe("published package contract", () => {
	test("every exported condition points to a built file", () => {
		for (const conditions of Object.values(packageExports())) {
			for (const path of Object.values(conditions)) {
				expect(existsSync(join(root, path))).toBe(true);
			}
		}
	});

	test("keeps the aggregate entry while isolating optional layers", async () => {
		const [aggregate, core, viewers, markdown, cad] = await Promise.all([
			import("../dist/ui.es.js"),
			import("../dist/core.es.js"),
			import("../dist/viewers.es.js"),
			import("../dist/markdown.es.js"),
			import("../dist/cad.es.js"),
		]);

		expect(aggregate.Button).toBe(core.Button);
		expect(aggregate.DrawingViewer).toBe(viewers.DrawingViewer);
		expect(aggregate.MarkdownViewer).toBe(markdown.MarkdownViewer);
		expect(aggregate.CadDxfViewer).toBe(cad.CadDxfViewer);
		expect("MarkdownViewer" in core).toBe(false);
		expect("CadDxfViewer" in core).toBe(false);

		const coreSource = readFileSync(join(dist, "core.es.js"), "utf8");
		expect(coreSource).not.toContain("markdown-it");
		expect(coreSource).not.toContain("KaTeX");
		expect(coreSource).not.toContain("DxfViewer");
		expect(coreSource).not.toContain("jsx-dev-runtime");
		expect(statSync(join(dist, "core.es.js")).size).toBeLessThan(150_000);
	});

	test("ships semantic CSS with external WOFF2 fonts only", () => {
		const cssFiles = filesBelow(dist).filter((path) => path.endsWith(".css"));
		const css = cssFiles.map((path) => readFileSync(path, "utf8")).join("\n");
		expect(css).not.toContain("data:font");
		expect(css).not.toMatch(/\.(?:woff|ttf)\)/);

		const fontFiles = filesBelow(join(dist, "fonts"));
		expect(fontFiles).toHaveLength(26);
		expect(fontFiles.every((path) => path.endsWith(".woff2"))).toBe(true);

		for (const stylesheet of ["fonts.css", "katex.css"]) {
			const path = join(dist, "styles", stylesheet);
			const source = readFileSync(path, "utf8");
			for (const match of source.matchAll(/url\(['"]?([^)'"]+)/g)) {
				expect(existsSync(resolve(dirname(path), match[1]))).toBe(true);
			}
		}

		expect(readFileSync(join(dist, "styles", "base.css"), "utf8"))
			.not.toContain("@font-face");
		expect(readFileSync(join(dist, "ui.css"), "utf8"))
			.toContain("@import './styles/katex.css';");
	});
});
