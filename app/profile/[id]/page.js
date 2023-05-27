"use client";
import Profile from "@/components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = ({ params }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };
    if (params.id) {
      fetchPosts();
    }
  }, []);

  return (
    <div>
      <Profile
        name={name}
        desc={`Welcome to ${name}'s personalized profile page.Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
        data={myPosts}
      />
    </div>
  );
};

export default ProfilePage;
