export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  return Response.json([
    { id: 1, name: "Still Stand", price: "₩129,000", image: "/still-stand.png" },
    { id: 2, name: "Still Remote", price: "₩79,000", image: "/still-remote.png" },
    { id: 3, name: "Still Cable", price: "₩39,000", image: "/still-cable.png" },
  ]);
}
