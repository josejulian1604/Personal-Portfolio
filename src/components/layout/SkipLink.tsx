/** First focusable element on the page; jumps past the header to <main id="main">. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className={
        "sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 " +
        "focus-visible:z-100 focus-visible:inline-flex focus-visible:min-h-11 focus-visible:items-center " +
        "focus-visible:rounded-full focus-visible:bg-accent focus-visible:px-5 focus-visible:text-small " +
        "focus-visible:font-medium focus-visible:text-accent-fg"
      }
    >
      Skip to content
    </a>
  );
}
