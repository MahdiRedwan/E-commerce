const tickerItems = [
  { label: "DDR5 32GB Kit", trend: "-4.2%", direction: "down" as const },
  { label: "RTX 5080 16GB", trend: "+1.1%", direction: "up" as const },
  { label: "2TB NVMe Gen5", trend: "-6.8%", direction: "down" as const },
  { label: "850W Platinum PSU", trend: "0.0%", direction: "flat" as const },
  { label: "14900 Series CPU", trend: "-2.0%", direction: "down" as const },
];

const trendColor = {
  up: "text-alert",
  down: "text-circuit",
  flat: "text-muted",
};

export default function PricePledgeTicker() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 text-xs sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center gap-2 font-mono uppercase tracking-wide text-trace">
          <span className="pin-dot" /> Price Pledge Index
        </div>
        <ul className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-2 font-mono text-muted">
          {tickerItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className="text-ink/80">{item.label}</span>
              <span className={trendColor[item.direction]}>{item.trend}</span>
            </li>
          ))}
        </ul>
        <span className="shrink-0 text-muted">Updated weekly against 40+ suppliers</span>
      </div>
    </section>
  );
}
