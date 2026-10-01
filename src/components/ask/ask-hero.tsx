"use client";

import { useEffect, useRef, useState } from "react";
import { askHome } from "@/data/sections";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Mark } from "@/components/ui/mark";
import { useAsk } from "./ask-provider";

/**
 * The home's ask box: one field, starters inside it, the send button in its corner.
 * The placeholder cycles through examples until the visitor focuses or types; a starter
 * fills the field with its example to edit. Desktop shows starters as chips inside the box
 * (gone once there is text); phones get an "Examples" link that opens them as a bottom sheet.
 * Sending opens the panel with the message already sent. Without JS the form falls
 * through to #cv, so reading never depends on the assistant.
 * While it is on screen the phone's floating Ask stands aside (data-composer, see globals.css).
 */
export function AskHero() {
  const { open } = useAsk();
  const field = useRef<HTMLTextAreaElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const sheet = useRef<HTMLDialogElement>(null);
  const [input, setInput] = useState("");
  const [example, setExample] = useState(0);
  const [focused, setFocused] = useState(false);
  const empty = input.trim() === "";

  useEffect(() => {
    if (focused || !empty || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setExample((i) => (i + 1) % askHome.examples.length), 2800);
    return () => clearInterval(id);
  }, [focused, empty]);

  useEffect(() => {
    const root = document.documentElement;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) root.dataset.composer = "";
      else delete root.dataset.composer;
    });
    if (form.current) io.observe(form.current);
    return () => {
      io.disconnect();
      delete root.dataset.composer;
    };
  }, []);

  const send = () => {
    if (empty) return;
    open(null, input.trim());
    setInput("");
  };

  const start = (text: string) => {
    sheet.current?.close();
    setInput(text);
    const el = field.current;
    if (!el) return;
    el.focus();
    requestAnimationFrame(() => el.setSelectionRange(text.length, text.length));
  };

  return (
    <form
      ref={form}
      action="#cv"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
      className="border-ink bg-card flex w-full max-w-[var(--hero-measure)] flex-col border-[length:var(--border)] text-left shadow-[var(--shadow-hover)]"
    >
      <label htmlFor="ask-home" className="sr-only">
        {askHome.label}
      </label>
      <textarea
        id="ask-home"
        ref={field}
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          // Enter sends, Shift+Enter breaks the line; never mid-composition (IME).
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            send();
          }
        }}
        rows={3}
        maxLength={600}
        enterKeyHint="send"
        placeholder={askHome.examples[example]}
        className="resize-none bg-transparent px-[22px] pt-5 pb-2 leading-[1.5] outline-none max-sm:px-4"
      />
      <div className="flex items-end justify-between gap-3 pt-2.5 pr-3 pb-3 pl-4 max-sm:items-center max-sm:pl-[22px]">
        {empty ? (
          <>
            <ul className="m-0 flex list-none flex-wrap gap-x-1 gap-y-1 p-0 max-sm:hidden" aria-label="Start with an example">
              {askHome.starters.map(
                (s) =>
                  s.chip && (
                    <li key={s.label}>
                      <button type="button" onClick={() => start(s.example)} className="draws text-soft hover:text-ink cursor-pointer py-1">
                        <Chip>{s.chip}</Chip>
                      </button>
                    </li>
                  ),
              )}
            </ul>
            <button
              type="button"
              onClick={() => sheet.current?.showModal()}
              aria-haspopup="dialog"
              className="text-meta cursor-pointer py-2 sm:hidden"
            >
              <span className="underline underline-offset-4">{askHome.examplesLabel}</span> <span aria-hidden="true">+</span>
            </button>
          </>
        ) : (
          <span />
        )}
        <Button type="submit" className="shrink-0">
          Ask →
        </Button>
      </div>

      {/* Phones: the starters as a bottom sheet. Native dialog: focus trap, Escape and backdrop for free. */}
      <dialog
        ref={sheet}
        aria-labelledby="examples-title"
        onClick={(e) => e.target === sheet.current && sheet.current.close()}
        className="examples-sheet bg-card text-ink border-ink m-0 mt-auto w-full max-w-none border-t-[length:var(--border)] p-0 backdrop:bg-[var(--scrim)]"
      >
        <header className="border-rule flex items-center justify-between border-b py-2 pr-2 pl-5">
          <h2 id="examples-title" className="text-meta text-soft m-0 font-mono font-normal tracking-[var(--track-label)] uppercase">
            {askHome.sheetTitle}
          </h2>
          <button type="button" onClick={() => sheet.current?.close()} aria-label="Close" className="flex size-11 cursor-pointer items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <path d="M2 2l8 8" />
              <path d="M10 2l-8 8" />
            </svg>
          </button>
        </header>
        <ul className="m-0 list-none p-0 pb-[env(safe-area-inset-bottom)]">
          {askHome.starters.map((s) => (
            <li key={s.label} className="border-rule border-b last:border-b-0">
              <button type="button" onClick={() => start(s.example)} className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left">
                <span className="flex w-9 shrink-0 justify-center">
                  <Mark name={s.icon} scale={0.6} />
                </span>
                <span className="flex-1 whitespace-nowrap">{s.label}</span>
                <span className="text-meta text-soft min-w-0 text-right font-mono">{s.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </form>
  );
}
