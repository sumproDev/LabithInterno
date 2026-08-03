import { NextResponse } from "next/server";
import { buildFallbackAnswer, findRelevantContext, getDynamicWebsiteContext, getWebsiteContext } from "@/lib/site-context";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json({ answer: "Please ask a question about Labith Interno products, projects or dealership details." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const fallbackAnswer = buildFallbackAnswer(message);
    const dynamicContext = await getDynamicWebsiteContext();

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
              "You are Labith Interno's website AI assistant.",
              "Provide accurate, genuine, inspiring, and concise answers.",
              "If asked what to integrate when building or making a home/house, warmly encourage the visitor and list all our core product categories: UV Marble Sheet, PU Stone, WPC Louvers, Fluted Panels, Soffit Panels, WPC Doors & Frames, WPC Sheets, French Moldings, PVC Panels, and Charcoal Panels.",
              "If asked for contact details, email, gmail, or phone number, explicitly state: Email: labithinterno@gmail.com, Phone: +91 95708 00440, and Contact page: /contact.",
              "Speak helpfully as Labith Interno."
            ].join(" "),
          },
          {
            role: "user",
            content: `Website context:\n${dynamicContext || relevantContext || getWebsiteContext()}\n\nVisitor question: ${message}`,
          },
        ],
        temperature: 0.3,
        max_output_tokens: 300,
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
