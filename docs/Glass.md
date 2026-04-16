# Glass

**Theme ID:** `glass`

A glassmorphism theme with a deep cosmic purple gradient background. UI surfaces are frosted-glass cards with `backdrop-filter: blur` and semi-transparent backgrounds.

## Visual Character

Fixed cosmic gradient (`#0f0c29 → #302b63 → #24243e`) covers the entire viewport and never scrolls. Floating ambient "orbs" — large blurred radial gradients — sit behind the content layer and shift color between violet and blue. Cards use `rgba(255,255,255,0.08)` backgrounds so the cosmic backdrop bleeds through.

## Typography

- Body: Inter (system fallback chain)
- Code: JetBrains Mono / Fira Code / Cascadia Code

## Key Design Traits

- `backdrop-filter: blur(20px+)` on all cards and panels
- Semi-transparent borders (`rgba(255,255,255,0.15)`)
- Accent colors: violet (`#a78bfa`) and blue (`#60a5fa`)
- Large border-radius: `16px`
- Ambient glow orbs via `::before`/`::after` pseudo-elements
- All text is white or near-white

## Use When

You want something visually rich and modern without the aggression of Cyberpunk. Works well for dashboards, landing pages, and SaaS product marketing.
