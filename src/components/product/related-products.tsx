import Image from "next/image";
import type { RelatedProduct } from "@/lib/product-content";

const RELATED_PRODUCT_IMAGE_SIZES =
  "(max-width: 800px) 86vw, calc((86vw - 40px) / 3)";

export async function RelatedProducts({
  productsPromise,
}: {
  productsPromise: Promise<RelatedProduct[]>;
}) {
  const products = await productsPromise;

  return (
    <section className="collection" id="collection">
      <p className="eyebrow">Complete the room</p>
      <h2>Made to complete the room</h2>
      <div className="recommendation-grid">
        {products.map((product) => (
          <article key={product.id}>
            <Image
              src={product.image}
              alt={product.name}
              width={1448}
              height={1086}
              sizes={RELATED_PRODUCT_IMAGE_SIZES}
              loading="lazy"
            />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function RelatedProductsFallback() {
  return (
    <section className="collection" id="collection">
      <p className="eyebrow">Complete the room</p>
      <h2>Made to complete the room</h2>
      <div className="recommendation-grid streaming-placeholder" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
