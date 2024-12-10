import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogContainer from "../Components/BlogContainer";

const HomePage = () => {
  const [post, setPost] = useState([]);
  const [records, setRecords] = useState([]);
  // console.log(records);
  console.log(process.env.REACT_APP_URL);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/post`).then((response) => {
      response.json().then((posts) => {
        {
          setPost(posts);
          setRecords(posts);
        }
      });
    });
  }, []);

  const Filter = (event) => {
    setRecords(
      post.filter((f) =>
        f.title.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

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
        <input
          type="text"
          placeholder="search by blog name"
          onChange={Filter}
          className="border-[2px] border-gray-400 md:px-2 px-16 py-1 rounded-lg mt-5 mb-5 md:w-[300px]"
        />
        <div className="grid md:grid-cols-3 md:gap-12 grid-cols-1 items-center w-[90%] gap-20 mt-5 mb-10">
          {records.length > 0 &&
            records.map((posts) => <BlogContainer {...posts} />)}
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
