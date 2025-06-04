// // pages/api/coin.ts
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;

//   try {
//     const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`);
//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch coin data" });
//   }
// }


// app/api/coin/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
