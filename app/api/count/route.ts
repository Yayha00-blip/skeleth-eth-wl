import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const Entry =
  mongoose.models.Entry || mongoose.model("Entry", new mongoose.Schema({}));

export async function GET() {
  await connectDB();
  const count = await Entry.countDocuments();
  return NextResponse.json({ count });
}