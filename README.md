# ui

**A living style reference for every app I build.**

This repo exists for one reason: when I start a new app — CLI, TUI, or web —
I point the thing I'm building here and say *"your UI should look like
one of these."* It holds opinionated, copy‑pasteable reference designs
for both terminal and browser, each showing up in two forms:

- **Showcase** — a realistic, opinionated product screen. What the whole
  thing feels like once components are composed: dashboards, feature
  explorers, navigation, the works.
- **Style guide** — the token + component reference. Colour palette,
  borders, buttons, inputs, cards, alerts, typography. The atoms.

When I hand another agent / app off to "match the style", they open this
repo and browse. That's the whole product.

---

## How to run it

The dispatcher is `bin/ui` (symlink or `PATH`-add it). No args → a tiny
Storm TUI pops up and asks which of the four views you want. Picking
"Terminal · Showcase" opens a *second* picker listing the seven demo
screens — each one is an inspiration-based reference design.

```
ui                             open the top chooser menu
ui tui | ui web                open the top chooser menu
ui tui showcase                terminal showcase demo picker
ui tui showcase <demo>         open a showcase demo directly
                                 demos: feature, logbook, bios95,
                                        brutalist, flightdeck,
                                        posting, oxide
ui tui style                   terminal style guide
ui web showcase                web showcase   (http://localhost:3000)
ui web style                   web style guide (http://localhost:3000/?mode=style)
```

The menus themselves are Storm — arrow keys / digits / Enter to pick.
Exit codes (`10`/`11`/`20`/`21` for the top menu; `30`–`36` for the
showcase picker) tell the bash dispatcher what to launch next.

### The seven terminal showcase demos

| demo         | inspiration       | vibe                                       |
| ------------ | ----------------- | ------------------------------------------ |
| `feature`    | (the 8 themes)    | themed tree + tabbed detail explorer       |
| `logbook`    | Ornithology HUD   | red-on-black tactical logbook, species tree |
| `bios95`     | FOBOS             | 90s dithered menu with drop-shadow cards   |
| `brutalist`  | Chat\[Bot\] Analog | black + orange ledges, massive mono caps   |
| `flightdeck` | Ad Astra          | dense NASA cockpit instrument layout       |
| `posting`    | darrenburns/posting | polished textual purple API client       |
| `oxide`      | Oxide cloud shell | calm teal-on-dark shell with pipe-tree     |

The source Pinterest scraps live in `inspiration/terminal/`.

---

## Layout

```
ui/
├── bin/ui                      # dispatcher (bash)
├── index.html                  # web entry
├── server.ts                   # bun dev server
├── src/
│   ├── terminal/               # all TUIs — Storm only
│   │   ├── menu.tsx            # top chooser TUI
│   │   ├── themes.ts           # shared theme catalog (8 themes)
│   │   ├── showcase/
│   │   │   ├── app.tsx         # demo picker (7 options)
│   │   │   ├── feature.tsx     # themed feature explorer
│   │   │   ├── logbook.tsx     # ornithology HUD vibe
│   │   │   ├── bios95.tsx      # FOBOS vibe
│   │   │   ├── brutalist.tsx   # Shadow Drifter vibe
│   │   │   ├── flightdeck.tsx  # Ad Astra vibe
│   │   │   ├── posting.tsx     # textual purple vibe
│   │   │   └── oxide.tsx       # Oxide shell vibe
│   │   └── style/app.tsx       # terminal style guide (tokens)
│   └── web/                    # all browser UI — TypeScript + React only
│       ├── frontend.tsx        # showcase↔style router
│       ├── showcase/
│       │   ├── themes/         # 23 theme components (Terminal, Glass, …)
│       │   └── components/     # shared helpers (FeatureCard)
│       └── style/
│           └── StyleGuide.tsx
└── inspiration/
    └── terminal/               # Pinterest scraps I'm pulling the look from
```

**Rules of the house:**

- Anything terminal = [Storm](https://npmjs.com/package/@orchetron/storm)
  (TypeScript + React renderer for terminals). No Textual, no Ink.
- Anything web = TypeScript + React. No frameworks, no build config
  beyond what Bun gives us for free.
- Each platform has exactly two flavours: `showcase/` and `style/`.

---

## Pointing an agent here

> "Build this feature. The UI should match the `ui` repo at
> `<path>/ui`. Run `ui tui style` (or `ui web style`) to see the design
> tokens, and `ui tui showcase` (or `ui web showcase`) to see how a full
> screen is composed. Copy the idiom, not the exact markup."

That's it. The showcase says *what a composed screen feels like*, the
style guide says *which atoms to build from*, and inspiration/ has the
mood board the whole thing is chasing.
