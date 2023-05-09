"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import useDebounce from "../helpers/useDebounce";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const [posts, setPosts] = useState([]);

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value;
    setSearchText(newSearchText);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  useEffect(() => {
    const fetchPosts = async (query = "") => {
      const response = await fetch(`/api/prompt?query=${query}`);

      const data = await response.json();
      setPosts(data);
    };

    fetchPosts(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <>
      <section className="feed">
        <form action="" className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Search for a tag or a prompt"
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      </section>
    </>
  );
};

export default Feed;
