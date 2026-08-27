export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return Response.json([
    { id: 1, author: "Jane Doe", rating: 5, body: "Every instrument stays clear, even at low volume." },
    { id: 2, author: "John Doe", rating: 5, body: "It feels at home with the furniture and stays simple to use." },
    { id: 3, author: "Alex Doe", rating: 4, body: "The sound remains comfortable after a full day of listening." },
  ]);
}
