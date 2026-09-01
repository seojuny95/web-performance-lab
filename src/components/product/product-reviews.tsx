import type { Review } from "@/lib/product-content";

export async function ProductReviews({
  reviewsPromise,
}: {
  reviewsPromise: Promise<Review[]>;
}) {
  const reviews = await reviewsPromise;

  return (
    <section className="reviews" id="reviews">
      <p className="eyebrow">Field notes</p>
      <h2>Notes from everyday listening</h2>
      <div className="review-grid">
        {reviews.map((review) => (
          <article key={review.id}>
            <p className="stars">{"★".repeat(review.rating)}</p>
            <p>{review.body}</p>
            <span>{review.author}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProductReviewsFallback() {
  return (
    <section className="reviews" id="reviews">
      <p className="eyebrow">Field notes</p>
      <h2>Notes from everyday listening</h2>
      <div className="review-grid streaming-placeholder" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
