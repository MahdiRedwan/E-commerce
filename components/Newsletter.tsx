export default function Newsletter() {
  return (
    <section className="border-t border-line bg-base">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <div className="trace-node mx-auto justify-center font-mono text-xs uppercase tracking-[0.2em] text-trace">
          Stay current
        </div>
        <h2 className="mx-auto mt-3 max-w-lg font-display text-2xl font-bold text-ink sm:text-3xl">
          Restock alerts, price drops, and new arrivals — no spam.
        </h2>
        <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@email.com"
            className="flex-1 border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-trace"
          />
          <button
            type="submit"
            className="whitespace-nowrap border border-trace bg-trace px-6 py-3 text-sm font-semibold text-base hover:opacity-90"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-muted">
          Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
}
