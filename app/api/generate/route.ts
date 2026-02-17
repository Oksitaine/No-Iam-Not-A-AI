import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "Prompt is required" },
      { status: 400 }
    );
  }

  // Mock delay (2-3 seconds)
  await new Promise((resolve) =>
    setTimeout(resolve, 2000 + Math.random() * 1000)
  );

  // Return placeholder images from picsum.photos
  const seed = Date.now();
  const images = Array.from({ length: 4 }, (_, i) => {
    return `https://picsum.photos/seed/${seed + i}/512/512`;
  });

  return NextResponse.json({ images, prompt });
}
