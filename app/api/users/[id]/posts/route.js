import { connectToDB } from "@utils/database";
import Prompt from "@models/prompts";

export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all the prompts!", { status: 500 });
  }
};
