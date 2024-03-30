import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export async function GET(request, { params }) {

    try {
        await connectToDB();
        const result = await Prompt.findById(params.id).populate('creator');
        if (!result) {
            return new Response("Prompt isn't found", { status: 404 });
        }
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new Response("Faild to find prompt", { status: 500 });
    }
}

export async function PATCH(request, { params }) {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();
        const exsistingPrompt = await Prompt.findById(params.id).populate('creator');
        if (!exsistingPrompt) {
            return new Response("Prompt isn't found-1", { status: 404 });
        }
        exsistingPrompt.prompt = prompt;
        exsistingPrompt.tag = tag;

        await exsistingPrompt.save();

        return new Response(JSON.stringify(exsistingPrompt), { status: 200 });

    }
    catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

export async function DELETE(request, {params}){
    try{
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", {status: 200});
    }catch(error){
        return new Response("Faild delete prompt", {status: 400});
    }
}