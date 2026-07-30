"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
  visibleContent?: string;
};

const suggestions = ["Tell me about PU Stone", "Which products work for TV walls?", "How can I apply for franchise?"];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi, I am the Labith Interno assistant. Ask me about products, finishes, applications, projects or franchise details.",
      visibleContent: "Hi, I am the Labith Interno assistant. Ask me about products, finishes, applications, projects or franchise details.",
    },
  ]);
  const latestAssistantRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) latestAssistantRef.current?.scrollIntoView({ block: "start" });
  }, [messages, open]);

  useEffect(() => {
    const latest = messages[messages.length - 1];
    if (latest?.role !== "assistant" || latest.visibleContent === latest.content) return;

    const timer = window.setTimeout(() => {
      setMessages((current) => {
        const copy = [...current];
        const last = copy[copy.length - 1];
        if (!last || last.role !== "assistant") return current;
        const nextLength = Math.min(last.content.length, (last.visibleContent?.length || 0) + 4);
        copy[copy.length - 1] = { ...last, visibleContent: last.content.slice(0, nextLength) };
        return copy;
      });
    }, 14);

    return () => window.clearTimeout(timer);
  }, [messages]);

  async function ask(question: string) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || loading) return;

    setOpen(true);
    setInput("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: cleanQuestion }]);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: cleanQuestion }),
      });
      const data = await response.json();
      const answer = typeof data?.answer === "string" ? data.answer : "I could not read that clearly. Please ask again.";
      setMessages((current) => [...current, { role: "assistant", content: answer, visibleContent: "" }]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I can still help from the website context. Please ask about products, applications, projects or franchise information.",
          visibleContent: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(input);
  }

  return (
    <div className="chatbot-shell">
      <button className="chatbot-fab" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close Labith assistant" : "Open Labith assistant"}>
        {open ? <X /> : <MessageCircle />}
        <span>Ask Labith</span>
      </button>

      {open && (
        <section className="chatbot-panel" aria-label="Labith Interno chatbot">
          <div className="chatbot-head">
            <div>
              <span><Sparkles /> Website assistant</span>
              <h2>Labith Interno</h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat"><X /></button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => {
              const isLatestAssistant = message.role === "assistant" && index === messages.length - 1;
              return (
                <div ref={isLatestAssistant ? latestAssistantRef : null} className={`chatbot-message chatbot-message-${message.role}`} key={`${message.role}-${index}`}>
                  {message.role === "assistant" && <Bot />}
                  <p>{message.role === "assistant" ? message.visibleContent || "" : message.content}</p>
                </div>
              );
            })}
            {loading && <div className="chatbot-typing"><Loader2 /> Reading the website context</div>}
          </div>

          <div className="chatbot-suggestions">
            {suggestions.map((suggestion) => (
              <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={onSubmit}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about products or franchise..." aria-label="Ask Labith Interno assistant" />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Send question"><Send /></button>
          </form>
        </section>
      )}
    </div>
  );
}
