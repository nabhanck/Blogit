import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import moment from "moment";

const Comments = ({ username }) => {
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  // const [dp, SetDp] = useState();
  const { id } = useParams();

  const { userInfo } = useContext(UserContext);
  console.log(userInfo.id);

  // const { userInfo } = useContext(UserContext);

  async function postComment() {
    const raw = JSON.stringify({ content: content, postId: id });
    const response = await fetch(`${process.env.REACT_APP_URL}/comment`, {
      method: "POST",
      body: raw,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      window.location.reload();
      alert("Comment Successfull");
    }
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/comment/${id}`).then((response) => {
      response.json().then((commentInfo) => {
        setComment(commentInfo);
      });
    });
    // fetch(`http://localhost:5000/dp/${userInfo.id}`).then((response) => {
    //   response.json().then((data) => {
    //     SetDp(data);
    //   });
    // });
  }, []);
  // console.log(dp);

  return (
    <div>
      <div className=" md:pl-0">
        <div className="font-bold text-2xl mt-20">Post a Comment</div>
        <div className="mt-4 flex items-center gap-2">
          <h3>commenting as: {username}</h3>
        </div>
        <div className="flex md:flex-row flex-col gap-5 mt-2 items-center">
          <input
            className="md:w-1/2 w-full h-[70px] border-gray-500 border-[1px] rounded-md p-2"
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
          {username ? (
            <button
              className="h-[35px] px-4 rounded-lg bg-black text-white"
              onClick={postComment}
            >
              comment
            </button>
          ) : (
            <Link
              className="h-[35px] px-4 py-1 rounded-lg bg-black text-white"
              to={"/login"}
            >
              Login to make a comment
            </Link>
          )}
        </div>
      </div>
      <div className="md:pl-0">
        <div className="font-semibold text-xl mt-10 mb-2">Comments</div>
        <div className="flex flex-col gap-5">
          {comment.map((com) => {
            const timeago = moment(com.created_at).fromNow();
            return (
              <div className="md:w-1/2 w-full bg-gray-200 p-3 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={`${process.env.REACT_APP_URL}/${com.author.image}`}
                    />
                    <Link to={`/author/${com.author._id}`}>
                      <h5 className="text-gray-600 hover:text-gray-600 hover:font-semibold">
                        {com.author.username}
                      </h5>
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <time>
                      <div className="text-gray-400 text-sm">{timeago}</div>
                    </time>
                    {userInfo.id === com.author._id ? (
                      <Link
                        className="bg-red-400 hover:bg-red-500 text-white flex justify-center rounded-lg"
                        to={`/comment-delete/${com._id}`}
                      >
                        Delete
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <p className="ml-10 w-auto h-auto">{com.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
