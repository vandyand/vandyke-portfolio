/**
 * Emberwick hero embed. The interactive viewer loads immediately so a visitor
 * lands in the town itself rather than an MP4 preview.
 *
 * The deployed viewer owns its model roster and replay/live state. It marks
 * a replay as a replay whenever no persistent live backend is available.
 */
export default function EmberwickEmbed() {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-card border border-line bg-[#14181c] shadow-card"
      data-testid="emberwick-embed"
    >
      <iframe
        src="https://agent-world-three.vercel.app/"
        title="Emberwick interactive agent town"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full border-0"
        data-testid="emberwick-iframe"
      />
    </div>
  );
}
