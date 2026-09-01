"use client";

import { useEffect, useState } from "react";

import { ProductReviews, type Review } from "./product-reviews";
import { RelatedProducts, type RelatedProduct } from "./related-products";

export function ProductContent() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

  useEffect(() => {
    async function loadProductContent() {
      const reviewResponse = await fetch("/api/reviews");
      setReviews(await reviewResponse.json());

      const relatedProductResponse = await fetch("/api/recommendations");
      setRelatedProducts(await relatedProductResponse.json());
    }

    loadProductContent();
  }, []);

  return (
    <>
      <ProductReviews reviews={reviews} />
      <RelatedProducts products={relatedProducts} />
    </>
  );
}
