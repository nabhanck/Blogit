import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { format } from "date-fns";
import Comment from "../Components/Comments";

const PostDetails = () => {
  const [details, setDetails] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  console.log(id);

  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setDetails(postInfo);
      });
    });
  }, []);

  if (!details) return "";

  async function deletePost() {
    const response = await fetch(`${process.env.REACT_APP_URL}/post-delete/${id}`, {
      method: "DELETE",
    }).then(setRedirect(true));
  }
  if (redirect === true) {
    alert("Delete Successfull");
    return <Navigate to={"/"} />;
  }
  console.log(details);

  return (
    <div className="md:max-w-6xl h-auto mx-auto flex flex-col mt-5 md:pl-[170px] md:pr-[170px] bg-white shadow-2xl rounded-2xl w-full p-2 pb-10">
      <div className="font-bold md:text-6xl text-4xl mb-5">{details.title}</div>
      <hr class="h-px my-2 border-0 dark:bg-gray-700" />

      <div className="flex flex-row justify-between gap-3 pb-1 items-center">
        <Link to={`/author/${details.author._id}`}>
          <div className="flex gap-3 items-center">
            {!details.author.image ? (
              <ion-icon name="person-circle-outline" class="text-3xl" />
            ) : (
              <img
                className="w-9 h-9 rounded-full border-black border-[0.1px] object-cover"
                src={`${process.env.REACT_APP_URL}/${details.author.image}`}
              />
            )}

            <p className="text-gray-500 hover:text-black text-end">
              {details.author.username}
            </p>
          </div>
        </Link>
        <div className="text-gray-500 flex flex-col text-sm">
          <time>{format(new Date(details.createdAt), "hh:mm aaa")}</time>
          <time>{format(new Date(details.createdAt), "MMM dd, yyy")}</time>
        </div>
      </div>
      <img
        className="md:h-[500px] h-[400px] object-cover rounded-lg shadow-xl mt-3"
        src={`${process.env.REACT_APP_URL}/${details.image}`}
      />
      <div className="p-2 flex flex-row justify-end mt-2">
        {userInfo.id === details.author._id ? (
          <div>
            <Link
              className="bg-green-500 opacity-70 px-4 py-1 text-sm rounded-xl text-white hover:opacity-100"
              to={`/edit-post/${details._id}`}
            >
              Edit this Post
            </Link>
            &nbsp; &nbsp;
            <button
              className="bg-red-400  px-4 py-1 text-sm rounded-xl text-white hover:bg-red-500"
              onClick={deletePost}
            >
              Delete this Post
            </button>
          </div>
        ) : null}
      </div>

      <div
        className="mt-5 text-lg p-5"
        dangerouslySetInnerHTML={{ __html: details.content }}
      />
      <Comment {...userInfo} />
    </div>
    // <div>
    //   <h1>{details.title}</h1>
    //   <p>
    //     <Link to={`/author/${details.author._id}`}>
    //       {details.author.username}
    //     </Link>
    //   </p>
    //   {userInfo.id === details.author._id ? (
    //     <div>
    //       <Link to={`/edit-post/${details._id}`}>Edit</Link>
    //       &nbsp; &nbsp;
    //       <button onClick={deletePost}>Delete</button>
    //     </div>
    //   ) : null}
    //   <img src={`http://localhost:5000/${details.image}`} alt="" />
    //   <h2>{details.content}</h2>
    //   <Comment {...userInfo} />
    // </div>
  );
};

export default PostDetails;
