export type Product = {
  name: string;
  tagline: string;
  price: string;
  description: string;
  colors: string[];
};

export async function getProduct(): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    name: "Still One",
    tagline: "One speaker for a quieter room.",
    price: "₩349,000",
    description:
      "An aluminum body, woven grille, and room-filling 360° sound in one compact form.",
    colors: ["Stone", "Charcoal", "Moss"],
  };
}
