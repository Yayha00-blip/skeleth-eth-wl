import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema(
  {
    twitter: {
      type: String,
      required: true,
      trim: true,
    },
    wallet: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    proof: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Entry =
  mongoose.models.Entry || mongoose.model("Entry", EntrySchema);

function isValidEthWallet(value: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

function isValidTwitterProof(value: string) {
  const v = value.toLowerCase();
  return (
    (v.includes("x.com/") || v.includes("twitter.com/")) &&
    v.includes("/status/")
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const twitter = String(body.twitter || "").trim();
    const wallet = String(body.wallet || "").trim().toLowerCase();
    const proof = String(body.proof || "").trim();

    if (!twitter || !wallet || !proof) {
      return NextResponse.json(
        { error: "Twitter, wallet and proof are required." },
        { status: 400 }
      );
    }

    if (!twitter.startsWith("@")) {
      return NextResponse.json(
        { error: "Twitter username must start with @." },
        { status: 400 }
      );
    }

    if (!isValidEthWallet(wallet)) {
      return NextResponse.json(
        { error: "Invalid ETH wallet address." },
        { status: 400 }
      );
    }

    if (!isValidTwitterProof(proof)) {
      return NextResponse.json(
        { error: "Invalid proof link." },
        { status: 400 }
      );
    }

    await connectDB();

    const exists = await Entry.findOne({ wallet });
    if (exists) {
      return NextResponse.json(
        { error: "This wallet is already registered." },
        { status: 409 }
      );
    }

    await Entry.create({
      twitter,
      wallet,
      proof,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("WL submit error:", error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { error: "This wallet is already registered." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}