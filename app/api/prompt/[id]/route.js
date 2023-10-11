import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";
//GET
export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return new Response("No prompt found! ", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch the prompt!", { status: 500 });
  }
};

//PATCH

export const PATCH = async (req, { params: { id } }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt)
      return new Response("No prompt found! ", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update the prompt!", { status: 500 });
  }
};

//DELETE

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
