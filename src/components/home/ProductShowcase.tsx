import { Link } from 'react-router-dom';
import type { Product } from '../../data/catalog';
import { ProductRail } from '../product/ProductRail';
import { Reveal } from '../ui/Reveal';

interface ProductShowcaseProps {
  eyebrow?: string;
  title: string;
  /** Short line beside the title. */
  lead?: string;
  products: Product[];
  /** grid shows them all in rows; carousel puts them in one row that scrolls. */
  layout: 'grid' | 'carousel';
  /** "View all" link shown beside the title. */
  link?: { label: string; to: string };
  /** Tinted background band, to separate the section from its neighbours. */
  tinted?: boolean;
}

/**
 * A plain product section: a headline with the products underneath, as a grid
 * or a carousel, with no side banner. The merchant can add as many of these
 * as they like, each with its own title and product selection.
 */
export function ProductShowcase({ eyebrow, title, lead, products, layout, link, tinted = false }: ProductShowcaseProps) {
  if (products.length === 0) return null;
  return (
    <section className={`section ${tinted ? 'section--paper' : 'section--flush-top'}`}>
      <Reveal className="container">
        <div className="section__head">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="section__title">{title}</h2>
            {lead && <p className="mt-1 max-w-[52ch] text-muted">{lead}</p>}
          </div>
          {link && (
            <Link className="link" to={link.to}>
              {link.label}
            </Link>
          )}
        </div>
        <div className={layout === 'grid' ? 'showcase-grid' : undefined}>
          <ProductRail products={products} layout={layout} label={title} />
        </div>
      </Reveal>
    </section>
  );
}
