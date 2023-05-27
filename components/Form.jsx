import Link from "next/link";
import React from "react";

const Form = ({ type, post, setPost, isSubmitting, submitPrompt }) => {
  return (
    <section className="max-w-md">
      <h1 className="mt-5 text-[40px] font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
        {type} Post
      </h1>
      <p className="text-gray-600 text-lg  w-full">
        {type} and share amazing prompts with the world and let your imagination
        run wild with any AI-powered platform
      </p>
      <form className="bg-pink-100 p-3 mt-4 rounded-lg" onSubmit={submitPrompt}>
        <label>
          <h2 className="text-gray-600 text-lg font-medium">Your AI Prompt</h2>
          <textarea
            name="prompt"
            className="w-full p-2 rounded-lg outline-slate-100"
            value={post.prompt}
            onChange={(e) => {
              setPost({ ...post, prompt: e.target.value });
            }}
            placeholder="Write your prompt here..."
            rows="5"
          />
        </label>
        <label>
          <h2 className="text-gray-600 text-lg font-medium">
            Tag <span>(#product #developer #idea)</span>
          </h2>
          <input
            name="prompt"
            className="w-full p-2 rounded-lg outline-slate-100"
            value={post.tag}
            onChange={(e) => {
              setPost({ ...post, tag: e.target.value });
            }}
            placeholder="#tag"
          />
        </label>
        <div className="flex justify-end w-full gap-3 mt-4">
          <Link href={"/"} className="text-gray-500 text-sm p-1.5">
            Cancel
          </Link>
          <button
            className="bg-orange-400 px-4 py-1.5 rounded-full text-white text-sm"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
