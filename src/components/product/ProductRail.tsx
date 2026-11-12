import type { Product } from '../../data/catalog';
import { Carousel } from '../ui/Carousel';
import { ProductCard } from './ProductCard';

interface ProductRailProps {
  products: Product[];
  /** grid wraps onto rows; carousel scrolls sideways with arrows and a page indicator */
  layout: 'grid' | 'carousel';
  /** Maximum number of products to show. */
  limit?: number;
  label: string;
}

/** A set of product cards in either layout. */
export function ProductRail({ products, layout, limit, label }: ProductRailProps) {
  const items = limit ? products.slice(0, limit) : products;

  if (layout === 'carousel') {
    return (
      <Carousel label={label} variant="products">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} sizes="(min-width: 1200px) 24vw, (min-width: 900px) 31vw, (min-width: 560px) 46vw, 78vw" />
        ))}
      </Carousel>
    );
  }

  return (
    <ul className="product-grid" aria-label={label}>
      {items.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
