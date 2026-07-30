import Link from "next/link";
import SectionHeader from "./SectionHeader";

const tools = [
  {
    title: "Bottleneck Analyzer",
    body: "Upload your current spec sheet and get a component-by-component read on what's holding your frame rates or render times back.",
    cta: "Run analysis",
    href: "/ai/bottleneck-analyzer",
  },
  {
    title: "Compatibility Checker",
    body: "Cross-checks CPU sockets, RAM speeds, PSU headroom, and case clearance before you check out — not after the parts arrive.",
    cta: "Check a build",
    href: "/ai/compatibility-checker",
  },
  {
    title: "Upgrade Path Planner",
    body: "Tell us your workload — gaming, rendering, ML training — and we'll rank upgrades by performance gained per pound spent.",
    cta: "Plan an upgrade",
    href: "/ai/upgrade-planner",
  },
];

export default function AIInsights() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeader
          eyebrow="Diagnostics"
          title="AI & Deep PC Analysis"
          description="Practical tooling, not a chatbot — built to read spec sheets and benchmark logs, and tell you what actually matters."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.title} className="chip-card flex flex-col p-6">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-circuit">
                <span className="pin-dot" /> AI-assisted
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {tool.title}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted">{tool.body}</p>
              <Link
                href={tool.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-trace hover:underline"
              >
                {tool.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
