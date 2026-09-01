export type Review = {
  id: number;
  author: string;
  rating: number;
  body: string;
};

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className="reviews" id="reviews">
      <p className="eyebrow">Field notes</p>
      <h2>Notes from everyday listening</h2>
      {reviews.length > 0 ? (
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.id}>
              <p className="stars">{"★".repeat(review.rating)}</p>
              <p>{review.body}</p>
              <span>{review.author}</span>
            </article>
          ))}
        </div>
      ) : (
        <p className="loading-copy">Loading reviews…</p>
      )}
    </section>
  );
}
