import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

const DeleteComment = () => {
  const [comment, setComment] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:5000/comment-delete/${id}`).then((data) => {
      data.json().then((commentInfo) => {
        setComment(commentInfo);
      });
    });
  }, []);

  async function deleteComment() {
    await fetch(`http://localhost:5000/delete-comment/${id}`, {
      method: "DELETE",
    }).then(setRedirect(true));
  }

  if (redirect) {
    return <Navigate to={`/post/${comment.postId}`} />;
  }

  console.log("Comments", comment);
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="w-fit rounded-md h-fit bg-gray-300 mt-48 p-10">
        <div className="flex flex-col">
          <div className="font-semibold text-lg">{comment.content}</div>
          <button
            className="w-fit px-5 py-2 rounded-xl bg-red-400 text-white hover:bg-red-500 mt-5"
            onClick={deleteComment}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
