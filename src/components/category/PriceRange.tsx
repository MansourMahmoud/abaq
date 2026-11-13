import type { CSSProperties } from 'react';
import { useI18n } from '../../i18n/I18nProvider';

interface PriceRangeProps {
  /** Lowest and highest price in the unfiltered listing. */
  bounds: [number, number];
  /** Current selection; an undefined end means "no limit" on that side. */
  min?: number;
  max?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

const STEP = 10;

/**
 * Two-thumb price slider built from two native range inputs laid over one
 * track, which keeps keyboard and screen-reader support. A thumb resting on
 * its end of the track clears that side of the filter.
 */
export function PriceRange({ bounds, min, max, onChange }: PriceRangeProps) {
  const { t, money } = useI18n();
  const [floor, ceiling] = bounds;
  const low = Math.max(floor, min ?? floor);
  const high = Math.min(ceiling, max ?? ceiling);
  const percent = (value: number) => ((value - floor) / Math.max(1, ceiling - floor)) * 100;

  const commit = (nextLow: number, nextHigh: number) => onChange(nextLow <= floor ? undefined : nextLow, nextHigh >= ceiling ? undefined : nextHigh);

  return (
    <div className="price-range" style={{ '--from': `${percent(low)}%`, '--to': `${percent(high)}%` } as CSSProperties}>
      <div className="price-range__track">
        <input type="range" aria-label={t('filters.priceFrom')} min={floor} max={ceiling} step={STEP} value={low} onChange={(event) => commit(Math.min(Number(event.target.value), high - STEP), high)} />
        <input type="range" aria-label={t('filters.priceTo')} min={floor} max={ceiling} step={STEP} value={high} onChange={(event) => commit(low, Math.max(Number(event.target.value), low + STEP))} />
      </div>
      <p className="flex items-center justify-between text-sm tabular-nums">
        <span>{money(low)}</span>
        <span className="text-muted">—</span>
        <span>{money(high)}</span>
      </p>
    </div>
  );
}
