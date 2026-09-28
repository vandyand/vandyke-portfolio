import { NextResponse } from "next/server";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().trim().email().max(254),
  company: z.string().max(200).optional(),
});

const resendBaseUrl = "https://api.resend.com";

function allowedOrigin(origin: string | null) {
  if (!origin) return true;

  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    return (
      hostname === "vandykeportfolio.com" ||
      hostname === "www.vandykeportfolio.com" ||
      hostname === "localhost" ||
      hostname.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

function resendRequest(path: string, init: RequestInit, apiKey: string) {
  return fetch(`${resendBaseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "vandyke-portfolio/1.0",
      ...init.headers,
    },
  });
}

export async function POST(request: Request) {
  if (!allowedOrigin(request.headers.get("origin"))) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_BLOG_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    return NextResponse.json(
      { message: "The email list is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  let input: z.infer<typeof inputSchema>;
  try {
    input = inputSchema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (input.company) {
    return NextResponse.json({ message: "You are on the list." });
  }

  try {
    const email = input.email.toLowerCase();
    const create = await resendRequest(
      "/contacts",
      {
        method: "POST",
        body: JSON.stringify({
          email,
          unsubscribed: false,
          segments: [{ id: segmentId }],
        }),
      },
      apiKey,
    );

    if (create.ok) {
      return NextResponse.json({ message: "You are on the list. Thanks for reading." });
    }

    if (create.status === 409) {
      const contactPath = `/contacts/${encodeURIComponent(email)}`;
      const restore = await resendRequest(
        contactPath,
        { method: "PATCH", body: JSON.stringify({ unsubscribed: false }) },
        apiKey,
      );
      const addToSegment = await resendRequest(
        `${contactPath}/segments/${segmentId}`,
        { method: "POST" },
        apiKey,
      );

      if (restore.ok && (addToSegment.ok || addToSegment.status === 409)) {
        return NextResponse.json({ message: "You are on the list. Thanks for reading." });
      }
    }

    console.error("Resend subscriber update failed", { status: create.status });
  } catch {
    console.error("Resend subscriber update failed before a response was received");
  }

  return NextResponse.json(
    { message: "Unable to join the list right now. Please try again shortly." },
    { status: 502 },
  );
}
