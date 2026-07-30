import Link from "next/link";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="trace-node font-mono text-xs uppercase tracking-[0.2em] text-trace">
          {eyebrow}
        </div>
        <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="whitespace-nowrap font-mono text-xs uppercase tracking-wide text-trace hover:underline"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
