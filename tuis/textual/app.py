# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "textual>=0.86",
# ]
# ///
"""UI showcase — Textual edition.

A TUI companion to the web showcase. Browse themes, preview their palettes,
and poke at a handful of Textual widgets styled with the active theme.
"""
from __future__ import annotations

import random
from dataclasses import dataclass

from rich.syntax import Syntax
from rich.text import Text as RichText
from textual.app import App, ComposeResult
from textual.binding import Binding
from textual.containers import Horizontal, Vertical
from textual.reactive import reactive
from textual.widgets import (
    Button,
    DataTable,
    Footer,
    Header,
    Input,
    Label,
    ListItem,
    ListView,
    Markdown,
    ProgressBar,
    Sparkline,
    Static,
    Switch,
    TabbedContent,
    TabPane,
)


@dataclass(frozen=True)
class Theme:
    id: str
    name: str
    tagline: str
    bg: str
    fg: str
    accent: str
    alt: str
    muted: str


THEMES: list[Theme] = [
    Theme("terminal",   "Terminal",    "phosphor green on black",        "#0a0f0a", "#9aff9a", "#39ff14", "#2fa82f", "#4d734d"),
    Theme("glass",      "Glass",       "frosted translucent minimalism", "#12162a", "#e6ecff", "#6ea8ff", "#a1b8ff", "#6b7798"),
    Theme("neobrutal",  "Neobrutal",   "hard shadows, primary colors",   "#fff7d6", "#111111", "#ff4f4f", "#2b7bff", "#777777"),
    Theme("cyberpunk",  "Cyberpunk",   "neon on midnight",               "#0a0018", "#fff6ff", "#ff2bd6", "#27f5ff", "#6a3a8a"),
    Theme("pastel",     "Pastel",      "soft candy palette",             "#fff5fa", "#4a3b52", "#ffb6c1", "#b6e3ff", "#b9a9c2"),
    Theme("y2k",        "Y2K",         "chrome and optimism",            "#e6f0ff", "#102040", "#ff8adf", "#60d0ff", "#7a8aa8"),
    Theme("swiss",      "Swiss",       "helvetica grid discipline",      "#f4f4f2", "#1a1a1a", "#ff1f1f", "#1a1a1a", "#888888"),
    Theme("catppuccin", "Catppuccin",  "soothing pastel mocha",          "#1e1e2e", "#cdd6f4", "#f5c2e7", "#89b4fa", "#6c7086"),
    Theme("retroos",    "RetroOS",     "beveled windows, 1996",          "#008080", "#000000", "#c0c0c0", "#0000aa", "#555555"),
    Theme("vaporwave",  "Vaporwave",   "aesthetic magenta & cyan",       "#1a0030", "#ffe0ff", "#ff71ce", "#01cdfe", "#7a4a9a"),
    Theme("shadcn",     "Shadcn Dark", "neutral engineered dark",        "#0b0b0d", "#f4f4f5", "#a1a1aa", "#6366f1", "#52525b"),
    Theme("dock",       "Dock IDE",    "editor slab with rail",          "#161821", "#d2d4de", "#84a0c6", "#a093c7", "#6b7089"),
]

CODE_SAMPLE = '''// Theme-aware component
export function Button({ label, onClick }: Props) {
  const theme = useTheme();
  return (
    <button
      onClick={onClick}
      style={{
        background: theme.accent,
        color: theme.bg,
        border: `1px solid ${theme.alt}`,
      }}
    >
      {label}
    </button>
  );
}
'''

ABOUT_MD = """\
# UI Showcase — Textual

This is the **Textual** half of the `ui tui` demo. Its sibling is a
**Storm** (TypeScript) app that showcases the same theme set in a very
different framework.

## What's here

- **Themes** — browse the palette of each web theme, rendered with the
  same colors the React showcase uses.
- **Widgets** — the usual Textual kit: Input, Switch, Buttons,
  ProgressBar, live Sparkline, DataTable. All driven by the palette.
- **Code** — Rich-highlighted TypeScript sample styled from the palette.
- **About** — this page.

## Keyboard

| Key         | Action                                |
|-------------|---------------------------------------|
| `j` / `k`   | next / previous theme                 |
| `↑` / `↓`   | same as `j`/`k`                       |
| `g` / `G`   | first / last theme                    |
| `/`         | filter themes by name                 |
| `1`-`4`     | jump to Themes / Widgets / Code / About |
| `d`         | toggle dark-mode trick on Textual UI  |
| `q`         | quit                                  |
"""


class PalettePane(Vertical):
    """Right pane: shows the active theme's palette + sample text."""

    theme: reactive[Theme] = reactive(THEMES[0])

    def compose(self) -> ComposeResult:
        yield Label(id="palette-title")
        yield Label(id="palette-tagline")
        yield Static("", id="palette-swatches")
        yield Static("", id="palette-sample", classes="sample")

    def watch_theme(self, theme: Theme) -> None:
        self.query_one("#palette-title", Label).update(
            RichText(theme.name, style=f"bold {theme.accent}")
        )
        self.query_one("#palette-tagline", Label).update(
            RichText(theme.tagline, style="italic dim")
        )

        roles = [
            ("bg    ", theme.bg),
            ("fg    ", theme.fg),
            ("accent", theme.accent),
            ("alt   ", theme.alt),
            ("muted ", theme.muted),
        ]
        lines = RichText()
        for role, col in roles:
            lines.append("  ██████  ", style=f"{col} on {col}")
            lines.append(f"  {role}  ", style="dim")
            lines.append(f"{col}\n", style=col)
        self.query_one("#palette-swatches", Static).update(lines)

        sample = RichText()
        sample.append("  Lorem ipsum dolor sit amet, consectetur.  \n", style=f"{theme.fg} on {theme.bg}")
        sample.append("  > sudo make me a theme  \n", style=f"bold {theme.accent} on {theme.bg}")
        sample.append("  ● online   ", style=theme.accent)
        sample.append("● syncing   ", style=theme.alt)
        sample.append("● idle\n",     style=theme.muted)
        self.query_one("#palette-sample", Static).update(sample)


class ThemesTab(Horizontal):
    """Left: filter input + list of themes. Right: palette preview."""

    active_index: reactive[int] = reactive(0)
    visible_themes: reactive[list[Theme]] = reactive(list(THEMES), always_update=True)

    def compose(self) -> ComposeResult:
        with Vertical(id="theme-sidebar"):
            yield Input(placeholder="/ filter…", id="theme-filter")
            yield ListView(
                *[ListItem(Label(t.name), id=f"t-{t.id}") for t in THEMES],
                id="theme-list",
            )
        yield PalettePane(id="palette")

    def on_mount(self) -> None:
        self._apply(THEMES[0])

    def on_input_changed(self, event: Input.Changed) -> None:
        if event.input.id != "theme-filter":
            return
        q = event.value.strip().lower()
        matches = [
            t for t in THEMES
            if not q or q in t.name.lower() or q in t.id.lower() or q in t.tagline.lower()
        ]
        self.visible_themes = matches
        lv = self.query_one("#theme-list", ListView)
        lv.clear()
        for t in matches:
            lv.append(ListItem(Label(t.name), id=f"t-{t.id}"))
        if matches:
            lv.index = 0
            self.active_index = 0
            self._apply(matches[0])

    def on_list_view_highlighted(self, event: ListView.Highlighted) -> None:
        if event.item is None:
            return
        idx = self.query_one("#theme-list", ListView).index or 0
        self.active_index = idx
        themes = self.visible_themes or THEMES
        if 0 <= idx < len(themes):
            self._apply(themes[idx])

    def _apply(self, theme: Theme) -> None:
        self.query_one(PalettePane).theme = theme
        self.app.apply_theme(theme)

    def shift(self, delta: int) -> None:
        themes = self.visible_themes or THEMES
        if not themes:
            return
        lv = self.query_one("#theme-list", ListView)
        new_index = (self.active_index + delta) % len(themes)
        lv.index = new_index

    def jump(self, to_end: bool) -> None:
        themes = self.visible_themes or THEMES
        if not themes:
            return
        lv = self.query_one("#theme-list", ListView)
        lv.index = len(themes) - 1 if to_end else 0

    def focus_filter(self) -> None:
        self.query_one("#theme-filter", Input).focus()


class WidgetsTab(Vertical):
    """Showcase of Textual widgets styled by the active theme."""

    _spark_data: list[int]

    def compose(self) -> ComposeResult:
        yield Label("Textual widget sampler", id="widgets-title")
        with Horizontal(classes="widget-row"):
            yield Input(placeholder="type something…", id="demo-input")
            yield Switch(value=True, id="demo-switch")
        with Horizontal(classes="widget-row"):
            yield Button("Primary", variant="primary")
            yield Button("Success", variant="success")
            yield Button("Warning", variant="warning")
            yield Button("Error",   variant="error")
        yield Label("Load")
        yield ProgressBar(total=100, show_eta=False, id="demo-progress")
        yield Label("Throughput (live)")
        self._spark_data = [random.randint(1, 12) for _ in range(30)]
        yield Sparkline(self._spark_data, id="demo-spark")
        table = DataTable(id="demo-table")
        table.add_columns("theme", "bg", "fg", "accent", "alt", "muted")
        for t in THEMES:
            table.add_row(t.name, t.bg, t.fg, t.accent, t.alt, t.muted)
        yield table

    def on_mount(self) -> None:
        self.query_one("#demo-progress", ProgressBar).advance(62)
        self.set_interval(0.7, self._tick_spark)

    def _tick_spark(self) -> None:
        self._spark_data = self._spark_data[1:] + [random.randint(1, 12)]
        try:
            self.query_one("#demo-spark", Sparkline).data = self._spark_data
        except Exception:
            pass


class CodeTab(Vertical):
    """Rich-highlighted TypeScript sample re-themed to the active palette."""

    def compose(self) -> ComposeResult:
        yield Label("Code — SyntaxHighlight", id="code-title")
        yield Static(id="code-view")

    def on_mount(self) -> None:
        self.apply_theme(THEMES[0])

    def apply_theme(self, theme: Theme) -> None:
        # "monokai" gives solid contrast across most palettes; we override
        # background to the theme bg to tint the block.
        syntax = Syntax(
            CODE_SAMPLE,
            "typescript",
            theme="monokai",
            line_numbers=True,
            background_color=theme.bg,
            word_wrap=True,
        )
        self.query_one("#code-view", Static).update(syntax)


class AboutTab(Vertical):
    def compose(self) -> ComposeResult:
        yield Markdown(ABOUT_MD)


class ShowcaseApp(App[None]):
    CSS = """
    Screen { layout: vertical; }

    TabbedContent { height: 1fr; }

    ThemesTab { height: 1fr; }
    #theme-sidebar { width: 30; border-right: solid $panel; }
    #theme-filter { margin: 1 1 0 1; height: 3; }
    #theme-list { height: 1fr; }
    #palette { padding: 1 2; }
    #palette-title { padding-bottom: 0; }
    #palette-tagline { padding-bottom: 1; }
    .sample { padding-top: 1; }

    WidgetsTab { padding: 1 2; }
    #widgets-title { padding-bottom: 1; text-style: bold; }
    .widget-row { height: 3; padding-bottom: 1; }
    .widget-row Button { margin-right: 1; }
    #demo-input { width: 40; margin-right: 2; }
    #demo-spark { height: 3; }
    #demo-table { height: 14; margin-top: 1; }

    CodeTab { padding: 1 2; }
    #code-title { padding-bottom: 1; text-style: bold; }
    #code-view { height: 1fr; }

    AboutTab { padding: 1 2; }
    """

    BINDINGS = [
        Binding("q", "quit", "Quit"),
        Binding("1", "show_tab('themes')",  "Themes",  show=False),
        Binding("2", "show_tab('widgets')", "Widgets", show=False),
        Binding("3", "show_tab('code')",    "Code",    show=False),
        Binding("4", "show_tab('about')",   "About",   show=False),
        Binding("j", "theme_shift(1)",  "Next"),
        Binding("k", "theme_shift(-1)", "Prev"),
        Binding("down", "theme_shift(1)",  "Next", show=False),
        Binding("up",   "theme_shift(-1)", "Prev", show=False),
        Binding("g", "theme_jump(False)", "Top"),
        Binding("G", "theme_jump(True)",  "End", show=False),
        Binding("slash", "focus_filter", "Filter"),
        Binding("d", "toggle_dark", "Dark"),
    ]

    def compose(self) -> ComposeResult:
        yield Header(show_clock=True)
        with TabbedContent(initial="themes", id="tabs"):
            with TabPane("Themes", id="themes"):
                yield ThemesTab()
            with TabPane("Widgets", id="widgets"):
                yield WidgetsTab()
            with TabPane("Code", id="code"):
                yield CodeTab()
            with TabPane("About", id="about"):
                yield AboutTab()
        yield Footer()

    def on_mount(self) -> None:
        self.title = "UI Showcase — Textual"
        self.sub_title = THEMES[0].name

    def apply_theme(self, theme: Theme) -> None:
        """Paint the app background, accents, borders, and tab from the active theme."""
        self.sub_title = theme.name
        screen = self.screen
        screen.styles.background = theme.bg
        screen.styles.color = theme.fg
        for node in self.query(PalettePane):
            node.styles.border = ("round", theme.accent)
        for node in self.query(ListView):
            node.styles.border_right = ("solid", theme.muted)
        try:
            header = self.query_one(Header)
            header.styles.background = theme.bg
            header.styles.color = theme.accent
        except Exception:
            pass
        try:
            footer = self.query_one(Footer)
            footer.styles.background = theme.bg
            footer.styles.color = theme.muted
        except Exception:
            pass
        try:
            tabbed = self.query_one(TabbedContent)
            tabbed.styles.background = theme.bg
        except Exception:
            pass
        # Retint code tab
        try:
            code_tab = self.query_one(CodeTab)
            code_tab.apply_theme(theme)
        except Exception:
            pass

    def action_theme_shift(self, delta: int) -> None:
        try:
            tab = self.query_one(ThemesTab)
        except Exception:
            return
        self.query_one(TabbedContent).active = "themes"
        tab.shift(delta)

    def action_theme_jump(self, to_end: bool) -> None:
        try:
            tab = self.query_one(ThemesTab)
        except Exception:
            return
        self.query_one(TabbedContent).active = "themes"
        tab.jump(to_end)

    def action_focus_filter(self) -> None:
        try:
            tab = self.query_one(ThemesTab)
        except Exception:
            return
        self.query_one(TabbedContent).active = "themes"
        tab.focus_filter()

    def action_show_tab(self, tab_id: str) -> None:
        self.query_one(TabbedContent).active = tab_id

    def action_toggle_dark(self) -> None:
        self.dark = not self.dark


if __name__ == "__main__":
    ShowcaseApp().run()
