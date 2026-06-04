import { afterEach, describe, expect, test } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { SortableList } from "../src/index";

const originalRect = HTMLElement.prototype.getBoundingClientRect;
const originalAnimate = HTMLElement.prototype.animate;

function SortableHarness() {
	const [items, setItems] = useState(["A", "B", "C"]);
	return (
		<SortableList
			aria-label="Items"
			items={items}
			onReorder={setItems}
			getKey={(item) => item}
			renderItem={(item) => <div>{item}</div>}
		/>
	);
}

describe("SortableList", () => {
	afterEach(() => {
		HTMLElement.prototype.getBoundingClientRect = originalRect;
		HTMLElement.prototype.animate = originalAnimate;
	});

	test("commits the reordered array without manually moving DOM nodes", () => {
		HTMLElement.prototype.animate = () => ({}) as Animation;
		HTMLElement.prototype.getBoundingClientRect = function () {
			const key = (this as HTMLElement).dataset.sortableKey;
			const order = key === "A" ? 0 : key === "B" ? 1 : key === "C" ? 2 : 0;
			const top = order * 30;
			return {
				x: 0,
				y: top,
				top,
				left: 0,
				right: 100,
				bottom: top + 20,
				width: 100,
				height: 20,
				toJSON: () => ({}),
			} as DOMRect;
		};

		render(<SortableHarness />);

		fireEvent.pointerDown(screen.getByText("A").parentElement!, {
			button: 0,
			clientY: 10,
		});
		fireEvent.pointerMove(document, { clientY: 75 });
		fireEvent.pointerUp(document);

		expect(
			screen.getAllByRole("listitem").map((item) => item.textContent),
		).toEqual(["B", "C", "A"]);
	});
});
