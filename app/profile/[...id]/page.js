"use client";
import MyProfile from "@Components/MyProfile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Profile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const profileName = searchParams.get("name");
  const {
    id: [profileId],
  } = params;

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch(`/api/users/${profileId}/posts`);
      const data = await resp.json();

      setPosts(data);
    };
    if (profileId) fetchPosts();
  }, [profileId]);

  return (
    <MyProfile
      name={profileName}
      desc="Welcome to your personalised page"
      data={posts}
    />
  );
};

export default Profile;
