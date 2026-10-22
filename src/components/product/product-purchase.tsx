"use client";

import { useState } from "react";

export function ProductPurchase({ colors }: { colors: string[] }) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [cartMessage, setCartMessage] = useState("");

  function selectColor(color: string) {
    setSelectedColor(color);
  }

  function addToCart() {
    setCartMessage(`${selectedColor} added to your cart.`);
  }

  return (
    <>
      <div className="color-picker" aria-label="Choose a color">
        {colors.map((color) => (
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
  );
}
