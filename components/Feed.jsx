'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleClickTag }) => {

  return (
    <div className="mt-16 prompt_layout">
      {data.map(post => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleClickTag={handleClickTag}
          />
        )
      })}
    </div>
  )
}
export default function Feed() {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await fetch('/api/prompt')
      const data = await posts.json();
      setPosts(data);
    }
    fetchPosts();
  }, [])

  const filterSerachText = (text) => {
    const regex = new RegExp(text, "i"); // 'i' flag for case-insensitive search
    const filtered = posts.filter(post => {
      return regex.test(post.tag) || regex.test(post.prompt) || regex.test(post.creator.username)
    });
    setSearchedResults(filtered);
  }

  const handleChange = (event) => {
    setSearchText(event.target.value)
    filterSerachText(event.target.value)
  };

  const clickOnTag = (tag) => {
    setSearchText(tag);
    filterSerachText(tag)
  }

  return (
    <section className="feed">
      <form className="relative w-full flext-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchedResults}
        handleClickTag={clickOnTag}
      >
      </PromptCardList>
    </section>
  );
}