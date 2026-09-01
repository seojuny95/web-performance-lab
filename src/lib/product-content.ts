export type Review = {
  id: number;
  author: string;
  rating: number;
  body: string;
};

export type RelatedProduct = {
  id: number;
  name: string;
  price: string;
  image: string;
};

export async function getReviews(): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return [
    {
      id: 1,
      author: "Jane Doe",
      rating: 5,
      body: "Every instrument stays clear, even at low volume.",
    },
    {
      id: 2,
      author: "John Doe",
      rating: 5,
      body: "It feels at home with the furniture and stays simple to use.",
    },
    {
      id: 3,
      author: "Alex Doe",
      rating: 4,
      body: "The sound remains comfortable after a full day of listening.",
    },
  ];
}

export async function getRelatedProducts(): Promise<RelatedProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 1_100));

  return [
    { id: 1, name: "Still Stand", price: "₩129,000", image: "/still-stand.png" },
    { id: 2, name: "Still Remote", price: "₩79,000", image: "/still-remote.png" },
    { id: 3, name: "Still Cable", price: "₩39,000", image: "/still-cable.png" },
  ];
}
