"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Video } from "@/components/video";

type Product = {
  name: string;
  tagline: string;
  price: string;
  description: string;
  colors: string[];
};

type Review = {
  id: number;
  author: string;
  rating: number;
  body: string;
};

type Recommendation = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const RELATED_PRODUCT_IMAGE_SIZES =
  "(max-width: 800px) 86vw, calc((86vw - 40px) / 3)";

export function BaselineStorefront() {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [selectedColor, setSelectedColor] = useState("Stone");
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    async function loadStorefront() {
      const productResponse = await fetch("/api/product");
      setProduct(await productResponse.json());

      const reviewResponse = await fetch("/api/reviews");
      setReviews(await reviewResponse.json());

      const recommendationResponse = await fetch("/api/recommendations");
      setRecommendations(await recommendationResponse.json());
    }

    loadStorefront();
  }, []);

  function selectColor(color: string) {
    setSelectedColor(color);
  }

  function addToCart() {
    setCartMessage(`${selectedColor} added to your cart.`);
  }

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

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Wireless speaker · 2026</p>
          {product ? (
            <>
              <h1>{product.name}</h1>
              <p className="tagline">{product.tagline}</p>
              <p className="description">{product.description}</p>
              <p className="price">{product.price}</p>
              <div className="color-picker" aria-label="Choose a color">
                {product.colors.map((color) => (
                  <button
                    className={selectedColor === color ? "selected" : ""}
                    key={color}
                    onClick={() => selectColor(color)}
                    type="button"
                  >
                    {color}
                  </button>
                ))}
              </div>
              <button className="cart-button" onClick={addToCart} type="button">
                Add to cart
              </button>
              <p className="cart-message" aria-live="polite">{cartMessage}</p>
            </>
          ) : (
            <div className="product-placeholder">Loading product details…</div>
          )}
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

      <section className="story" id="story">
        <div>
          <p className="eyebrow">A room of sound</p>
          <h2>Sound that settles<br />naturally into the room</h2>
        </div>
        <Video
          src="/speaker-demo.mp4"
          poster="/speaker-demo-poster.jpg"
          width={1920}
          height={1080}
          loading="lazy"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </section>

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

      <section className="collection" id="collection">
        <p className="eyebrow">Complete the room</p>
        <h2>Made to complete the room</h2>
        {recommendations.length > 0 ? (
          <div className="recommendation-grid">
            {recommendations.map((item) => (
              <article key={item.id}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={1448}
                  height={1086}
                  sizes={RELATED_PRODUCT_IMAGE_SIZES}
                  loading="lazy"
                />
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="loading-copy">Finding products for your space…</p>
        )}
      </section>

      <footer>Still Objects, Seoul · Web Performance Lab</footer>
    </main>
  );
}
