export default {
  async fetch(req, env) {
    if (req.method !== "POST") {
      return new Response("NG", { status: 405 });
    }

    const { uid } = await req.json();
    const key = `pt:${uid}`;

    let pt = Number(await env.POINTS.get(key)) || 0;
    pt += 1;

    await env.POINTS.put(key, pt.toString());

    return new Response(
      JSON.stringify({ point: pt }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
};
