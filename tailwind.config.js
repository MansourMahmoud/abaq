/**
 * Tailwind is wired to the theme's CSS custom properties (src/styles/tokens.css),
 * so utilities like `bg-surface` or `text-accent` follow the merchant's palette
 * and flip automatically inside dark-scoped sections.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--c-bg)',
        surface: 'var(--c-surface)',
        raise: 'var(--c-raise)',
        line: 'var(--c-line)',
        accent: 'var(--c-accent)',
        'on-accent': 'var(--c-on-accent)',
        text: 'var(--c-text)',
        soft: 'var(--c-text-soft)',
        muted: 'var(--c-text-muted)',
        success: 'var(--c-success)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      transitionTimingFunction: {
        theme: 'var(--ease)',
      },
    },
  },
  // The project ships its own reset (src/styles/base.css).
  corePlugins: { preflight: false },
  plugins: [],
};
