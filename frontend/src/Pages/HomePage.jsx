import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogContainer from "../Components/BlogContainer";

const HomePage = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/post").then((response) => {
      response.json().then((posts) => {
        setPost(posts);
      });
    });
  }, []);

  // console.log(post);

  return (
    <div>
      <div className="flex flex-col items-center w-full justify-center mt-6">
        <h1 className=" md:text-[50px] font-semibold text-gray-500 tracking-wider">
          From the blogs
        </h1>
        <p className="text-gray-400">
          Explore, create fun & interesting blogs ...
        </p>
        <div className="grid md:grid-cols-3 md:gap-12 grid-cols-1 items-center w-[90%] gap-20 mt-5 mb-10">
          {post.length > 0 && post.map((posts) => <BlogContainer {...posts} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

{
  /* {post.map((posts) => {
          return (
            <Link to={`/post/${posts._id}`}>
              <div>
                <h1 style={{ color: "red" }}>{posts.author.username}</h1>
                <time>{posts.createdAt}</time>
                <h1>{posts.title}</h1>
                <h3>{posts.summary}</h3>
                <img src={"http://localhost:5000/" + posts.image} alt="" />
              </div>
            </Link>
          );
        })} */
}
