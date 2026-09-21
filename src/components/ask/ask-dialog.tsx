"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Streamdown } from "streamdown";
import { resolve, suggestions, type AskContext } from "@/lib/ask/context";
import { Button } from "@/components/ui/button";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { AskDetail } from "./ask-detail";
import { ContactCard } from "./contact-card";

type AskDialogProps = { open: boolean; context: AskContext; onClose: () => void };

/**
 * A side panel on a native <dialog>: focus trap, Escape and backdrop come with
 * the platform. Top: the detail of the row that opened it. Bottom: the question
 * field, there from the start; suggestions arrive late, and only if nothing has
 * been typed. While the model works: pencil dots, a streaming caret, and Stop.
 */
export function AskDialog({ open, context, onClose }: AskDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const stick = useRef(true); // follow the stream only while the reader is at the bottom
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    // The dialog remounts per opening (keyed), so the context is constant here.
    transport: new DefaultChatTransport({ api: "/api/chat", body: { context } }),
  });
  const focus = resolve(context);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      field.current?.focus(); // showModal would focus the close button; the question field is the point
    }
    if (!open && d.open) d.close();
  }, [open]);

  // Scroll the thread, never the page — and never fight a reader who scrolled up.
  useEffect(() => {
    const el = thread.current;
    if (el && stick.current && messages.length > 0) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const ask = (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    stick.current = true;
    sendMessage({ text: q });
    setInput("");
  };

  const lastId = messages.at(-1)?.id;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="ask-title"
      className="ask-panel bg-paper text-ink border-rule m-0 ml-auto h-dvh max-h-none w-[min(460px,100vw)] max-w-none border-l-[length:var(--border)] p-0 backdrop:bg-[rgba(47,53,66,0.35)]"
    >
      <div className="flex h-full flex-col">
        <header className="border-rule flex items-start justify-between gap-4 border-b px-6 py-5">
          <h2 id="ask-title" className="text-title m-0 font-semibold text-balance">
            {focus ? focus.label : "Ask about François"}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="btn flex size-8 shrink-0 items-center justify-center !p-0">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round">
              <path d="M2 2l8 8" />
              <path d="M10 2l-8 8" />
            </svg>
          </button>
        </header>

        <div
          ref={thread}
          onScroll={(e) => {
            const el = e.currentTarget;
            stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
          }}
          className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-6"
        >
          {focus ? <AskDetail context={context} /> : <p className="m-0">Answers come from the data behind this site, nothing else. When it does not know, it says so.</p>}

          <div className="flex flex-col gap-4" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "border-rule self-end border bg-[var(--accent-tint)] px-4 py-2" : "flex flex-col gap-3"}>
                {m.parts.map((part, i) => {
                  if (part.type === "text") {
                    if (m.role === "user") {
                      return (
                        <p key={i} className="m-0 whitespace-pre-wrap">
                          {part.text}
                        </p>
                      );
                    }
                    return (
                      <div key={i} className="ask-md">
                        <Streamdown>{part.text}</Streamdown>
                        {status === "streaming" && m.id === lastId && i === m.parts.length - 1 && <span aria-hidden="true" className="ask-caret" />}
                      </div>
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

            {status === "submitted" && (
              <p className="text-soft m-0" aria-label="Thinking">
                <span aria-hidden="true" className="ask-thinking">
                  <span>·</span>
                  <span>·</span>
                  <span>·</span>
                </span>
              </p>
            )}

            {error && (
              <div className="flex flex-col gap-3">
                <p className="m-0">The assistant is not answering right now.</p>
                <Button variant="quiet" onClick={() => regenerate()} className="self-start">
                  Try again
                </Button>
                <ContactCard />
              </div>
            )}
          </div>
        </div>

        <div className="border-rule flex flex-col gap-3 border-t px-6 py-5">
          {/* Help arrives late: nothing for a beat, then one question at a time. Typing dismisses it. */}
          {messages.length === 0 && !input && (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {suggestions(context).map((q, i) => (
                <li key={q} className="ask-suggestion" style={{ "--i": i } as React.CSSProperties}>
                  <button type="button" onClick={() => ask(q)} className="draws text-soft hover:text-ink w-full text-left">
                    <span className="hd">
                      <span>{q}</span>
                      <DrawnMark />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex gap-3"
          >
            <label htmlFor="ask-input" className="sr-only">
              Your question
            </label>
            <input
              id="ask-input"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
              maxLength={600}
              autoComplete="off"
              placeholder={focus ? "Ask about this" : "Ask a question"}
              className="border-rule bg-card min-w-0 flex-1 border px-3 py-2"
            />
            {busy ? (
              <Button onClick={() => stop()}>Stop</Button>
            ) : (
              <Button type="submit" disabled={!input.trim()}>
                Ask
              </Button>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
}
