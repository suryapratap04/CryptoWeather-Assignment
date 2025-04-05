// app/api/news/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';





export async function GET() {
  try {
    const response = await axios.get(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTOPANIC_API_KEY}&public=true`
    );
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
