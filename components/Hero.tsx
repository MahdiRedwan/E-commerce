import Link from "next/link";
import { formatPrice } from "@/lib/format";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      {/* Schematic backdrop */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="#E3A24C" strokeWidth="1" fill="none">
          <path d="M0 80 H300 V180 H520" />
          <path d="M1200 60 H900 V220 H700" />
          <path d="M0 420 H260 V320 H480" />
          <path d="M1200 440 H940 V300 H760" />
          <path d="M600 0 V120" />
          <path d="M600 500 V360" />
        </g>
        <g fill="#E3A24C">
          <circle cx="300" cy="80" r="4" />
          <circle cx="520" cy="180" r="4" />
          <circle cx="900" cy="60" r="4" />
          <circle cx="700" cy="220" r="4" />
          <circle cx="260" cy="420" r="4" />
          <circle cx="480" cy="320" r="4" />
          <circle cx="940" cy="440" r="4" />
          <circle cx="760" cy="300" r="4" />
        </g>
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <div className="trace-node mb-6 font-mono text-xs uppercase tracking-[0.2em] text-trace">
            Component-level expertise
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Every build starts
            <br />
            with the right <span className="text-trace">part.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted">
            Hand-picked components, prebuilt towers, and workstation-grade
            hardware — configured, benchmarked, and shipped by people who
            actually open the case.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/category/component"
              className="border border-trace bg-trace px-6 py-3 text-sm font-semibold text-base transition-opacity hover:opacity-90"
            >
              Shop Components
            </Link>
            <Link
              href="/build"
              className="border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-trace hover:text-trace"
            >
              Configure a Custom PC
            </Link>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6 font-mono">
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">In Stock</dt>
              <dd className="mt-1 text-xl text-ink">14,000+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Avg. Dispatch</dt>
              <dd className="mt-1 text-xl text-ink">Same day</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-muted">Warranty Desk</dt>
              <dd className="mt-1 text-xl text-ink">In-house</dd>
            </div>
          </dl>
        </div>

        <div className="relative hidden md:block">
          <div className="chip-card p-8">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wide text-muted">
              <span>Featured Build</span>
              <span className="flex items-center gap-1.5 text-circuit">
                <span className="pin-dot" /> In stock
              </span>
            </div>
            <div className="mt-6 flex h-40 items-center justify-center border border-dashed border-line text-muted">
              Product render
            </div>
            <div className="mt-6 space-y-2 font-mono text-sm">
              <div className="flex justify-between text-ink/80">
                <span>GPU</span>
                <span className="text-ink">RTX 5080 16GB</span>
              </div>
              <div className="flex justify-between text-ink/80">
                <span>CPU</span>
                <span className="text-ink">Forge X9-14900</span>
              </div>
              <div className="flex justify-between text-ink/80">
                <span>RAM</span>
                <span className="text-ink">32GB DDR5</span>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <span className="font-display text-2xl font-bold text-ink">{formatPrice(1899)}</span>
              <Link href="/product/coreforge-r7-tower" className="text-sm font-semibold text-trace">
                View build →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
