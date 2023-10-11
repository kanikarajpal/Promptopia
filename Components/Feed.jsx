"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PropCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data &&
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
    </div>
  );
};
export default function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState();
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (search) => {
    const searchText = search.toLowerCase();

    setSearchText(searchText);

    if (!searchText) {
      setPosts(allPosts);
      return;
    }

    const filteredPosts = allPosts.filter((p) => {
      const { creator, tag, prompt } = p;
      const username = creator.username.toLowerCase();
      const email = creator.email.toLowerCase();

      return (
        username.includes(searchText) ||
        email.includes(searchText) ||
        tag.toLowerCase().includes(searchText) ||
        prompt.toLowerCase().includes(searchText)
      );
    });
    setPosts(filteredPosts);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    handleSearchChange(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch("/api/prompt");
      const data = await resp.json();
      setAllPosts(data);

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </form>
      <PropCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
}
