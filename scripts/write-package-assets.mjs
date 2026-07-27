import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { basename, join } from 'node:path'

const distDir = 'dist'
const generatedStylesDir = join(distDir, '_styles')
const stylesDir = join(distDir, 'styles')
const fontsDir = join(distDir, 'fonts')
const katexFontsDir = join(fontsDir, 'katex')

mkdirSync(stylesDir, { recursive: true })
mkdirSync(fontsDir, { recursive: true })
mkdirSync(katexFontsDir, { recursive: true })

function readGeneratedStyle(name) {
  return readFileSync(join(generatedStylesDir, name), 'utf8')
}

function writeStyle(name, sourceNames) {
  const content = sourceNames
    .map((sourceName) => readGeneratedStyle(sourceName))
    .join('\n')
  writeFileSync(join(stylesDir, name), `${content}\n`)
}

writeStyle('core.css', ['core.css', 'Button.css', 'IconButton.css'])
writeStyle('viewers.css', ['viewers.css', 'Button.css', 'IconButton.css'])
writeStyle('markdown.css', ['markdown.css'])
writeStyle('cad.css', ['cad.css', 'Button.css'])

copyFileSync('src/tokens.css', join(stylesDir, 'tokens.css'))
copyFileSync('src/base.css', join(stylesDir, 'base.css'))

const uiFonts = [
  ['Inter', 'inter', 400],
  ['Inter', 'inter', 600],
  ['IBM Plex Sans', 'ibm-plex-sans', 400],
  ['IBM Plex Sans', 'ibm-plex-sans', 600],
  ['JetBrains Mono', 'jetbrains-mono', 400],
  ['JetBrains Mono', 'jetbrains-mono', 600],
]

const fontFaces = uiFonts.map(([family, packageName, weight]) => {
  const filename = `${packageName}-latin-${weight}-normal.woff2`
  copyFileSync(
    join('node_modules', '@fontsource', packageName, 'files', filename),
    join(fontsDir, filename),
  )
  return [
    '@font-face {',
    `  font-family: '${family}';`,
    '  font-style: normal;',
    `  font-weight: ${weight};`,
    '  font-display: swap;',
    `  src: url('../fonts/${filename}') format('woff2');`,
    '}',
  ].join('\n')
})
writeFileSync(join(stylesDir, 'fonts.css'), `${fontFaces.join('\n\n')}\n`)

const katexSourceDir = join('node_modules', 'katex', 'dist')
let katexCss = readFileSync(join(katexSourceDir, 'katex.min.css'), 'utf8')
katexCss = katexCss
  .replace(/,url\(fonts\/[^)]+\.(?:woff|ttf)\) format\("(?:woff|truetype)"\)/g, '')
  .replaceAll('url(fonts/', 'url(../fonts/katex/')

if (/\.(?:woff|ttf)\)/.test(katexCss) || katexCss.includes('data:')) {
  throw new Error('KaTeX CSS still contains a non-WOFF2 or embedded font')
}
writeFileSync(join(stylesDir, 'katex.css'), `${katexCss}\n`)

for (const filename of readdirSync(join(katexSourceDir, 'fonts'))) {
  if (filename.endsWith('.woff2')) {
    copyFileSync(
      join(katexSourceDir, 'fonts', filename),
      join(katexFontsDir, filename),
    )
  }
}

const aggregateStyles = [
  'tokens.css',
  'base.css',
  'fonts.css',
  'core.css',
  'viewers.css',
  'markdown.css',
  'cad.css',
  'katex.css',
]
writeFileSync(
  join(distDir, 'ui.css'),
  `${aggregateStyles.map((name) => `@import './styles/${name}';`).join('\n')}\n`,
)

writeFileSync(
  join(distDir, 'ui.es.js'),
  [
    'export * from "./core.es.js";',
    'export * from "./viewers.es.js";',
    'export * from "./markdown.es.js";',
    'export * from "./cad.es.js";',
    '',
  ].join('\n'),
)

const declaration = [
  'declare const stylesheet: string',
  'export default stylesheet',
  '',
].join('\n')

writeFileSync(join(distDir, 'ui.d.css.ts'), declaration)
for (const name of aggregateStyles) {
  writeFileSync(
    join(stylesDir, `${basename(name, '.css')}.d.css.ts`),
    declaration,
  )
}

rmSync(generatedStylesDir, { recursive: true })
