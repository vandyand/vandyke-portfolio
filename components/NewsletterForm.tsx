"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type NewsletterFormProps = {
  /** Sidebars stay stacked so the call to action never becomes a narrow word column. */
  compact?: boolean;
};

export default function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company: data.get("company")?.toString() ?? "",
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Unable to join the list right now.");
      }

      setStatus("success");
      setMessage(result.message ?? "You are on the list.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to join the list right now. Please try again.",
      );
    }
  }

  return (
    <form onSubmit={subscribe} className="mt-6 max-w-xl">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className={`flex flex-col gap-3 ${compact ? "" : "sm:flex-row"}`}>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          maxLength={254}
          placeholder="you@example.com"
          className="min-h-12 min-w-0 flex-1 rounded-chip border border-line-strong bg-bg px-4 text-ink placeholder:text-ink-faint"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`min-h-12 shrink-0 rounded-chip bg-accent px-5 font-mono text-kicker uppercase whitespace-nowrap text-accent-ink transition-colors hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70 ${
            compact ? "w-full" : ""
          }`}
        >
          {status === "loading" ? "Joining..." : "Keep me posted"}
        </button>
      </div>
      <input
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name="company"
        autoComplete="off"
      />
      <p className="mt-3 text-sm leading-relaxed text-ink-faint">
        New articles only. Your email stays with the list provider, and every
        message includes an unsubscribe link.
      </p>
      <p
        aria-live="polite"
        className={`mt-3 text-sm ${
          status === "error" ? "text-accent" : "text-ink-muted"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
