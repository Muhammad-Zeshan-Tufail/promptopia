import Post from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  const { prompt, tag, userId } = await req.json();
  try {
    await connectToDB();
    const newPost = new Post({
      creator: userId,
      prompt,
      tag,
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new response", { status: 500 });
  }
};
