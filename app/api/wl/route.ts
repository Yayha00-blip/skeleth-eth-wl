import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { twitter, wallet, proof } = body;

    if (!twitter || !wallet || !proof) {
      return NextResponse.json({
        ok: false,
        error: "Missing fields",
      });
    }

    const db = await connectDB();

    const exist = await db.collection("wl").findOne({ wallet });

    if (exist) {
      return NextResponse.json({
        ok: false,
        error: "Wallet already registered",
      });
    }

    await db.collection("wl").insertOne({
      twitter,
      wallet,
      proof,
      createdAt: new Date(),
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return NextResponse.json({
      ok: false,
      error: "Server error.",
    });
  }
}