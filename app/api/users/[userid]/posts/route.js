import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export async function GET(request, {params}) {
  try {
    await connectToDB();
    const result = await Prompt.find({creator: params.userid}).populate('creator');
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Faild to fatch  prompts for user", { status: 500 });
  }
}