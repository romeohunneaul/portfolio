/**
 * The frame every card shares: paper card, hairline, off-square at rest, straight with a hard
 * offset shadow under the pointer. Put it on the element that is clicked, so hover and focus
 * draw its marks. Two kinds of cards exist: published notes and problems worked on.
 */
export const CARD_FRAME =
  "card-tilt draws bg-card border-rule flex flex-col border-[length:var(--border)] no-underline hover:shadow-[var(--shadow-hover)]";
