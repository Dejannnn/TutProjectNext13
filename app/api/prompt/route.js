import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
export async function GET(request, response) {
  
  try {
    await connectToDB();
    const result = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Faild to fatch all prompt", { status: 500 });
  }
}