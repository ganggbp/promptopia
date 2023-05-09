import { connectToDB } from "../../../utils/database";
import Prompt from "../../../models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();

    const query = req.nextUrl.searchParams.get("query");

    const searchQuery = {
      $or: [
        { tag: { $regex: query, $options: "i" } },
        { prompt: { $regex: query, $options: "i" } },
      ],
    };

    const prompts = await Prompt.find(searchQuery).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
