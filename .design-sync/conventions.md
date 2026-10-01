# Notebook — conventions for building with this design system

Notebook is a paper notebook: warm paper, one ink, pastel tints used like a marker, hand-drawn marks,
**nothing rounded** (`--radius: 0`), one loud colour (`--accent-strong`). Components live on `window.Notebook`.

## Setup

- No provider or wrapper. Everything is CSS: load `styles.css` (it `@import`s the Google Fonts for
  Schibsted Grotesk + Space Mono and `_ds_bundle.css`, which holds the tokens, the Tailwind utilities and the
  component classes).
- Paint the page yourself: put `bg-paper text-ink font-sans` on the root element, or components sit on white.
- **Night theme**: set `data-theme="dark"` on `<html>` (`document.documentElement.dataset.theme = "dark"`).
  Every token flips (blue-black paper, chalk ink, dark accent tints). `ThemeToggle` does exactly this and
  persists the choice. Never theme a sub-tree: the dark tokens are declared on the root only.

## Styling idiom — tokens through Tailwind utilities

The Tailwind build is **precompiled**: only utilities the site already uses exist in `_ds_bundle.css`
(grep it before relying on one). Use the utilities below for colour and type; for layout glue that isn't
there (sizes, paddings, max-widths), write an inline `style` with tokens — `style={{ padding: "var(--space-8)" }}`.
Never raw colours.

| Role | Utilities / tokens |
|---|---|
| Surfaces | `bg-paper` (page), `bg-card` (raised surface) — `var(--paper)`, `var(--paper-card)` |
| Ink | `text-ink`, `text-soft` (metadata only) — `var(--ink)`, `var(--ink-soft)` |
| Lines | `border-rule` with `border-[length:var(--border)]` (1.5px hairline) — `var(--ink-rule)` |
| Type | `text-lede` (one page title), `text-title` (section heads), `text-meta` + `font-mono` (dates, counts, labels) |
| Accents | `var(--accent)`, `var(--highlight)`, `var(--highlight-punch)` as tints behind text; `var(--accent-strong)` for one mark |
| Grid paper | `style={{ backgroundImage: "var(--paper-grid-fine)" }}` on a `bg-card` box |
| Layout | `var(--measure)` (reading width), `var(--aside-width)` (272px margin column), `var(--space-4)` etc. |

Interaction classes: `btn` (ruled button, hard shadow on hover), `draws` on a container + a `DrawnMark`
inside a `hd` element (hand-drawn underline that draws on hover), `card-tilt` (card resting 0.3° off-square).

## Components

`Button` (outlined | quiet), `Chip`, `Disclosure`, `EntryRow` (the list row of the site), `NoteCard`,
`SectionHeading`, `Sticker` (one per page), `Highlight` (marker behind a word), `Mark` / `DrawnMark`
(hand-drawn icons), `Logo`, `LogoSquare` (company mark — pass `name` only: initials; image paths from the
site won't resolve here), `Trace` (GPX outline), `ThemeToggle`. Read each component's `.prompt.md` and
`.d.ts` before composing; `TextLink`, `Reveal`, `OpenOnHash` are exported without preview cards.

## Example

```jsx
const { SectionHeading, EntryRow, Sticker, ThemeToggle } = window.Notebook;

<main className="bg-paper text-ink font-sans" style={{ minHeight: "100vh", padding: "var(--space-8)" }}>
  <header className="border-rule flex items-center justify-between border-b-[length:var(--border)] pb-4">
    <span className="text-meta font-mono uppercase">Notebook</span>
    <ThemeToggle />
  </header>
  <section className="mt-10" style={{ maxWidth: "var(--measure)" }}>
    <SectionHeading aside="2 notes">Lab</SectionHeading>
    <EntryRow title="Books that stuck" meta="6 of them" />
  </section>
  <Sticker>work in progress</Sticker>
</main>
```
