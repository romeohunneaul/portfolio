"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { resolve, suggestions, type AskContext } from "@/lib/ask/context";
import { ContactCard } from "./contact-card";

type AskDialogProps = { open: boolean; context: AskContext; onClose: () => void };

/** A native <dialog>: focus trap, Escape and backdrop come with the platform. */
export function AskDialog({ open, context, onClose }: AskDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat();
  const focus = resolve(context);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  // Scroll the thread, never the page behind the dialog.
  useEffect(() => {
    const el = thread.current;
    if (el && messages.length > 0) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    sendMessage({ text: q }, { body: { context } });
    setInput("");
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="ask-title"
      className="bg-paper text-ink border-rule m-auto w-[min(640px,calc(100vw-2rem))] border-[length:var(--border)] p-0 shadow-[6px_6px_0_var(--ink-shadow)] backdrop:bg-[rgba(47,53,66,0.35)]"
    >
      <div className="flex max-h-[min(640px,85vh)] flex-col">
        <header className="border-rule flex items-baseline justify-between gap-4 border-b px-5 py-4">
          <div className="flex flex-col">
            <h2 id="ask-title" className="text-title m-0 font-semibold">
              Ask about François
            </h2>
            <span className="text-soft text-meta">{focus ? `About: ${focus.label}` : "Answers come from this site's data, nothing else."}</span>
          </div>
          <button type="button" onClick={onClose} className="text-soft text-meta font-mono hover:underline">
            esc
          </button>
        </header>

        <div ref={thread} className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4" aria-live="polite">
          {messages.length === 0 && (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {suggestions(context).map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => ask(q)}
                    className="border-rule bg-card w-full border px-4 py-3 text-left hover:shadow-[var(--shadow-hover)]"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "self-end bg-[var(--accent-tint)] px-4 py-2" : "flex flex-col gap-3"}>
              {m.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <p key={i} className="m-0 whitespace-pre-wrap">
                      {part.text}
                    </p>
                  );
                }
                if (part.type === "tool-contact") {
                  const reason = (part.input as { reason?: string } | undefined)?.reason;
                  return <ContactCard key={i} reason={reason} />;
                }
                return null;
              })}
            </div>
          ))}

          {status === "submitted" && <p className="text-soft text-meta m-0 font-mono">thinking</p>}

          {error && (
            <div className="flex flex-col gap-3">
              <p className="m-0">The assistant is not answering right now.</p>
              <ContactCard />
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="border-rule flex gap-3 border-t px-5 py-4"
        >
          <label htmlFor="ask-input" className="sr-only">
            Your question
          </label>
          <input
            id="ask-input"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            maxLength={600}
            autoComplete="off"
            placeholder="Ask a question"
            className="border-rule bg-card min-w-0 flex-1 border px-3 py-2"
          />
          <button type="submit" disabled={busy || !input.trim()} className="border-rule bg-[var(--highlight)] border px-4 py-2 font-medium disabled:opacity-50">
            Ask
          </button>
        </form>
      </div>
    </dialog>
  );
}
