import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export async function POST(request, response) {
  const { userId: creator, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const result = await Prompt.create({ creator, prompt, tag })

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (error) {
    return new Response("Faild to create new Prompt", { status: 500 });
  }
}