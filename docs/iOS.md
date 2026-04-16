# iOS

**Theme ID:** `ios`

A faithful recreation of Apple's iOS/iPadOS UI language. Implements the HIG (Human Interface Guidelines) design tokens as closely as CSS allows — system colors, 44pt minimum touch targets, grouped table-view layouts, and SF Pro typography.

## Visual Character

Light gray system background (`#F2F2F7`) with pure white cards, Apple's standard blue (`#007AFF`) as the primary accent, and `#34C759` green for confirmations. Borders use Apple's `rgba(60,60,67,0.13)` separator color. The sidebar mimics an iOS navigation list with 44px minimum row height.

## Typography

- Body: `-apple-system`, `SF Pro Text`, `SF Pro Display`, `Helvetica Neue`
- Mono: `SF Mono`, `Menlo`

The font stack prioritizes native Apple fonts on Apple devices; everywhere else it falls back to Helvetica Neue.

## Key Design Traits

- 44px minimum touch targets on interactive rows
- 12px border-radius on cards and inputs
- 0.5px sidebar border (sub-pixel, Apple style)
- Grouped/inset table view layouts
- Light mode only
- No shadows — depth is conveyed through background color differences

## Use When

You want a clean, familiar light-mode UI that Apple users will immediately recognize. Good for productivity apps, settings screens, and anything targeting iOS-first users.
