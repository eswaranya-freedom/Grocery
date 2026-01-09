
import { neon } from "@netlify/neon";

export default async (request) => {
  try {
    const data = await request.json();
    const sql = neon(); // Auto-uses NETLIFY_DATABASE_URL

    await sql`
      INSERT INTO responses (item, quantity, priority, bring_from_india, missing_items)
      VALUES (${data.item}, ${data.quantity}, ${data.priority}, ${data.bringFromIndia}, ${data.missing})
    `;

    return new Response(JSON.stringify({ status: "saved" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
