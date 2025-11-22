import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { Order } from "@/types/order";

// 🔥 Sanity Server Client — مخصوص API Route
const serverClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: "2023-03-09",
  token: process.env.SANITY_PROJECT_API_TOKEN, // لازم برای PATCH
  useCdn: false,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, ordersToUpdate } = body;

  if (!userId || !ordersToUpdate) {
    return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
  }

  try {
    const updatePromises = ordersToUpdate.map(async (order: Order) => {
      const { _id } = order;

      await serverClient.patch(_id).set({ userId }).commit();
    });

    await Promise.all(updatePromises);

    return NextResponse.json(
        { message: "Orders updated successfully!" },
        { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
    );
  }
}
