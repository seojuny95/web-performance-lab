import { connection } from "next/server";

import { ProductContent } from "@/components/product/product-content";
import { ProductDetails } from "@/components/product/product-details";
import { ProductStory } from "@/components/product/product-story";
import { getProduct } from "@/lib/product";

export default async function Home() {
  await connection();
  const product = await getProduct();

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">Still.</a>
        <nav aria-label="Main navigation">
          <a href="#story">Story</a>
          <a href="#reviews">Reviews</a>
          <a href="#collection">Collection</a>
        </nav>
      </header>
      <ProductDetails product={product} />
      <ProductStory />
      <ProductContent />
      <footer>Still Objects, Seoul · Web Performance Lab</footer>
    </main>
  );
}
