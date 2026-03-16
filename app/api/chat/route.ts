import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic();

const SYSTEM_PROMPT = `Ești un DJ cu memorie emoțională perfectă. 
Când cineva îți descrie un feeling, o perioadă, o stare sau o amintire, 
tu alegi 15 melodii care capturează acel moment emoțional.

Reguli stricte:
- Nu te ghida după gen muzical
- Ghidează-te după energia emoțională, epoca temporală și textura sonoră
- Înțelege contextul cultural (vara 2016 e diferită față de vara 2020)
- Returnează DOAR JSON valid, fără niciun alt text înainte sau după

Formatul JSON trebuie să fie exact așa:
{
  "playlist": [
    {
      "title": "numele melodiei",
      "artist": "numele artistului",
      "year": "anul",
      "reason": "o propoziție scurtă de ce se potrivește"
    }
  ]
}`;

export async function POST(request: Request) {
  const body = await request.json();
  const feeling = body.feeling;
  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: feeling,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const cleanText = text.replace(/```json|```/g, "").trim();
  const playlist = JSON.parse(cleanText);

  return NextResponse.json(playlist);
}