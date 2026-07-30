import { NextResponse } from "next/server";
import { buildFallbackAnswer, findRelevantContext, getWebsiteContext } from "@/lib/site-context";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ answer: "Please ask a question about Labith Interno products, projects or franchise details." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const fallbackAnswer = buildFallbackAnswer(message);

    if (!apiKey) {
      return NextResponse.json({ answer: fallbackAnswer, source: "website-context" });
    }

    const relevantContext = findRelevantContext(message, 8)
      .map((block) => `Title: ${block.title}\nURL: ${block.url}\nContent: ${block.text}`)
      .join("\n\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: [
              "You are Labith Interno's website assistant.",
              "Answer only from the provided website context. If exact pricing, official phone number, availability or commercial terms are not in the context, say that the visitor should submit an enquiry.",
              "Keep the tone premium, helpful and concise. Use first-person plural as Labith Interno when appropriate.",
            ].join(" "),
          },
          {
            role: "user",
            content: `Website context:\n${relevantContext || getWebsiteContext()}\n\nVisitor question: ${message}`,
          },
        ],
        temperature: 0.35,
        max_output_tokens: 520,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ answer: fallbackAnswer, source: "website-context" });
    }

    const data = await response.json();
    const answer =
      data.output_text ||
      data.output?.flatMap((item: { content?: { text?: string }[] }) => item.content || []).map((item: { text?: string }) => item.text).filter(Boolean).join("\n") ||
      fallbackAnswer;

    return NextResponse.json({ answer, source: "openai" });
  } catch {
    return NextResponse.json({ answer: buildFallbackAnswer("") }, { status: 200 });
  }
}
