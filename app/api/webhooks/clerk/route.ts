import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import db from "@/lib/db";
import { UserJSON } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;
    const user = evt.data as UserJSON;

    const id = user.id;
    const username = user.username ?? user.email_addresses[0].email_address;
    const avatar = user.image_url;
    const email = user.email_addresses?.[0]?.email_address;

    if (eventType === "user.created") {
      await db.user.create({
        data: {
          externalId: id,
          username: username,
          avatar,
          email,
        },
      });
    } else if (eventType === "user.updated") {
      await db.user.update({
        where: { externalId: id },
        data: { username, avatar },
      });
    }

    if (eventType === "user.deleted") {
      await db.user.delete({
        where: { externalId: user.id },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
