import Image from "next/image";

export type RelatedProduct = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const RELATED_PRODUCT_IMAGE_SIZES =
  "(max-width: 800px) 86vw, calc((86vw - 40px) / 3)";

export function RelatedProducts({ products }: { products: RelatedProduct[] }) {
  return (
    <section className="collection" id="collection">
      <p className="eyebrow">Complete the room</p>
      <h2>Made to complete the room</h2>
      {products.length > 0 ? (
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
      ) : (
        <p className="loading-copy">Finding products for your space…</p>
      )}
    </section>
  );
}
