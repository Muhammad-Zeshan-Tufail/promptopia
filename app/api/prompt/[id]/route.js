import Post from "@/models/prompt";
import { connectToDB } from "@/utils/database";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if (!post) {
      return new Response("Post Not Found", { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch Post", { status: 500 });
  }
};

//Patch  (Update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Post.findById(params.id).populate("creator");
    if (!existingPrompt) {
      return new Response("Post Not Found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("failed to update", { status: 500 });
  }
};

//Delete

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Post.findByIdAndRemove(params.id);
    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete post", { status: 500 });
  }
};
