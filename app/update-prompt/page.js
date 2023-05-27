"use client";

import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const updatePrompt = async (e) => {
    e.preventDefault();
    if (!postId) {
      return alert("Post id not found");
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session.user.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getSinglePost = async () => {
      const response = await fetch(`/api/prompt/${postId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (postId) {
      getSinglePost();
    }
  }, [postId]);

  return (
    <div>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        isSubmitting={isSubmitting}
        submitPrompt={updatePrompt}
      />
    </div>
  );
};

export default UpdatePrompt;
