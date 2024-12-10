import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { format } from "date-fns";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState("");
  const [dp, setDp] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { userInfo } = useContext(UserContext);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/mypost/${id}`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
    fetch(`http://localhost:5000/dp/${id}`).then((response) => {
      response.json().then((dp) => {
        setDp(dp);
      });
    });
  }, []);

  // console.log(dp);
  async function uploadImage() {
    const data = new FormData();
    data.set("file", file[0]);
    const response = await fetch(`http://localhost:5000/dp/${id}`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    response.json();
    if (response.ok) {
      alert("Profile pic set successfully");
      window.location.reload();
    }
  }

  // return (
  //   <div>
  //     <div>
  //       {dp.image ? <img src={`http://localhost:5000/${dp.image}`} /> : ""}
  //       <input type="file" onChange={(e) => setFile(e.target.files)} />
  //       <button onClick={uploadImage}>photo</button>
  //     </div>
  //     <h1>{userInfo.username}</h1>
  //     <h1>My Posts</h1>
  //     {posts.map((post) => {
  //       return (
  //         <div>
  //           <h1>{post.title}</h1>
  //           <img src={"http://localhost:5000/" + post.image} />
  //           <h2>{post.summary}</h2>
  //           <Link to={`/edit-post/${post._id}`}>Edit</Link>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div className="md:w-[80%] w-full h-auto flex flex-col mx-auto md:p-10 p-3">
      <h1 className="text-center font-bold text-4xl mb-10 md:mt-0 mt-5">My Profile</h1>
      {!userInfo.username ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <div className="bg-gradient-to-r from-purple-500/60 to-pink-500/50 shadow-pink-200 rounded-lg shadow-xl mx-auto md:w-1/2 w-full flex md:flex-row flex-col items-center md:gap-10 gap-8 md:p-10 p-5">
            <div>
              {dp.image ? (
                <img
                  className="md:w-[150px] md:h-[150px] w-[150px] h-[150px] rounded-full shadow-lg object-cover"
                  src={`http://localhost:5000/${dp.image}`}
                />
              ) : (
                <ion-icon
                  name="person-circle-outline"
                  class="text-3xl text-white md:w-[150px] md:h-[150px]"
                />
              )}
            </div>
            <div className="flex flex-col justify-center gap-2">
              <div className="flex flex-row gap-2">
                <h1 className="text-lg">Username:</h1>
                <h1 className="text-lg font-bold">{dp.username}</h1>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className="text-lg">Location:</h1>
                <h1 className="text-lg font-bold">{dp.location}</h1>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className="text-lg">Organization:</h1>
                <h1 className="text-lg font-bold">{dp.organization}</h1>
              </div>
              <div className="flex flex-row gap-2">
                <h1 className="text-lg">Contact:</h1>
                <h1 className="text-lg font-bold">{dp.contact}</h1>
              </div>
              <Link to={`/edit-profile/${id}`}>
                <button className="w-fit md:m-0 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-sky-400 hover:to-indigo-400 text-white flex flex-row items-center gap-2 rounded-xl">
                  Edit profile <ion-icon name="pencil-outline" />
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-[100px] mb-10 font-bold text-4xl text-center">
            My Blogs
          </div>
          <div className="w-full h-auto rounded-md bg-gradient-to-r from-purple-500/60 to-pink-500/50 shadow-lg p-5 gap-5 grid md:grid-cols-2 md:grid-rows-2">
            {posts.length ? (
              posts.map((item) => {
                async function deletePost() {
                  const response = await fetch(
                    `http://localhost:5000/post-delete/${item._id}`,
                    {
                      method: "DELETE",
                    }
                  ).then(setRedirect(true));
                }
                if (redirect === true) {
                  window.alert("Delete Successfull");
                  window.location.reload();
                }
                return (
                  <Link to={`/post/${item._id}`}>
                    <div className="w-full h-auto flex flex-row rounded-lg">
                      <img
                        src={`http://localhost:5000/${item.image}`}
                        className="md:w-[250px] md:h-[200px] w-[150px] h-[140px] rounded-tl-lg rounded-bl-lg"
                      />
                      <div className="flex flex-col md:w-full w-1/2 bg-white justify-between rounded-tr-lg rounded-br-lg md:max-w-[290px] max-w-[210px]">
                        <div className="flex flex-col gap-2 mt-4 ml-2 text-black">
                          <h1 className="font-bold md:text-xl text-sm truncate">
                            {item.title}
                          </h1>
                          <h1 className="font-semibold md:text-nowrap text-xs truncate">
                            {item.summary}
                          </h1>
                          <div className="flex flex-row gap-2">
                            <h1 className="md:text-nowrap text-xs">
                              Published on:
                            </h1>
                            <h1 className="md:text-nowrap text-xs">
                              {format(
                                new Date(item.createdAt),
                                "MMM, dd - yyy"
                              )}
                            </h1>
                          </div>
                        </div>
                        <div className="flex flex-row justify-center gap-3 w-full rounded-br-lg mb-1">
                          <Link
                            to={`/edit-post/${item._id}`}
                            className="flex md:text-sm text-xs justify-center md:px-2 px-1 items-center flex-row gap-2 bg-blue-400 text-white font-semibold hover:bg-blue-500 hover:font-bold rounded-lg"
                          >
                            Edit
                            <ion-icon name="create-outline" />
                          </Link>
                          <button
                            onClick={deletePost}
                            className="flex md:text-sm text-xs justify-center md:px-2 px-1 items-center flex-row gap-2 bg-red-400 text-white font-semibold hover:bg-red-500 hover:font-bold rounded-lg"
                          >
                            Delete
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="flex flex-row gap-2 mt-2">
                <h1 className="text-xl font-semibold">No Posts yet</h1>
                <Link
                  className="bg-gradient-to-tr from-blue-400 to-pink-400 px-2 py-1 rounded-xl text-white hover:from-blue-500 hover:to-pink-500"
                  to={"/create-post"}
                >
                  Create Post
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
