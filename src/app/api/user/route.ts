import { NextResponse } from "next/server";

// POST and GET name matters

export async function GET(req: Request) {
  try {
    const body = await req.json();
    // console.log(body)

    return NextResponse.json(body);
  } catch (error) {}
}
