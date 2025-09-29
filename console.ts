import repl from "repl";
import db from "./lib/db";

async function main() {
  (global as any).db = db;

  console.log("✅ Prisma console ready!");
  console.log("Use `await db.user.findMany()` to query your database.");
  console.log("Example autocomplete: db.user.");

  const r = repl.start({
    prompt: "keisk> ",
    useGlobal: true,
  });

  (r as any).context.db = db;
}

main().catch(console.error);
