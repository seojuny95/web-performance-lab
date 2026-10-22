import { Suspense } from "react";
import { connection } from "next/server";

import { ProductDetails } from "@/components/product/product-details";
import {
  ProductReviews,
  ProductReviewsFallback,
} from "@/components/product/product-reviews";
import { ProductStory } from "@/components/product/product-story";
import {
  RelatedProducts,
  RelatedProductsFallback,
} from "@/components/product/related-products";
import { getProduct } from "@/lib/product";
import { getRelatedProducts, getReviews } from "@/lib/product-content";

export default async function Home() {
  await connection();

  const productPromise = getProduct();
  const reviewsPromise = getReviews();
  const relatedProductsPromise = getRelatedProducts();

  const product = await productPromise;

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
      <Suspense fallback={<ProductReviewsFallback />}>
        <ProductReviews reviewsPromise={reviewsPromise} />
      </Suspense>
      <Suspense fallback={<RelatedProductsFallback />}>
        <RelatedProducts productsPromise={relatedProductsPromise} />
      </Suspense>
      <footer>Still Objects, Seoul · Web Performance Lab</footer>
    </main>
  );
}
