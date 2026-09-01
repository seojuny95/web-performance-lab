import Image from "next/image";

import type { Product } from "@/lib/product";

import { ProductPurchase } from "./product-purchase";

export function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Wireless speaker · 2026</p>
        <h1>{product.name}</h1>
        <p className="tagline">{product.tagline}</p>
        <p className="description">{product.description}</p>
        <p className="price">{product.price}</p>
        <ProductPurchase colors={product.colors} />
      </div>
      <div className="hero-media">
        <Image
          src="/speaker-hero.png"
          alt="Still One wireless speaker"
          width={2400}
          height={1800}
          sizes="(max-width: 800px) 100vw, 61vw"
          loading="eager"
        />
        <span>Designed for quiet moments</span>
      </div>
    </section>
  );
}
