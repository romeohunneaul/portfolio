/**
 * The frame every card shares: paper card, hairline, off-square at rest, straight with a hard
 * offset shadow under the pointer. Put it on the element that is clicked, so hover and focus
 * draw its marks. Two kinds of cards exist: published notes and problems worked on.
 */
export const CARD_FRAME =
  "card-tilt draws bg-card border-rule flex flex-col border-[length:var(--border)] no-underline hover:shadow-[var(--shadow-hover)]";

/**
 * The frame of a project card: lighter than a note's, since the photo carries the card. A 1px rule at
 * half strength, no tilt, no shadow: under the pointer only the title's line draws.
 */
export const PROJECT_FRAME = "draws bg-card border-rule/50 flex flex-col border no-underline";
