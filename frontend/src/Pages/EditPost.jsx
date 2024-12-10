import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Components/Editor";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  const { userInfo } = useContext(UserContext);
  console.log(userInfo);

  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      });
    });
  }, []);

  const notify = () => toast("Wow so easy!");

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    const response = await fetch("http://localhost:5000/edit-post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    notify();
    return <Navigate to={`/post/${id}`} />;
  }
  // return (
  //   <div>
  //     <h1>Create A Post</h1>
  //     <form onSubmit={updatePost}>
  //       <label>Title</label>
  //       <input
  //         type="text"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //       />
  //       <label>summary</label>
  //       <input
  //         type="text"
  //         value={summary}
  //         onChange={(e) => setSummary(e.target.value)}
  //       />
  //       <label>content</label>
  //       <input
  //         type="text"
  //         value={content}
  //         onChange={(e) => setContent(e.target.value)}
  //       />
  //       <label>image</label>
  //       <input type="file" onChange={(e) => setFiles(e.target.files)} />
  //       &nbsp;
  //       <button>Post</button>
  //     </form>
  //   </div>
  // );

  return (
    <div>
      {!userInfo.username ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <div className="flex flex-col justify-center bg-gradient-to-r from-purple-500 to-pink-500 h-auto">
            <h1 className="mx-auto font-semibold text-white text-4xl mt-10 tracking-wider">
              Edit Post
            </h1>
            <div className="flex flex-col mx-auto md:w-1/2 w-full bg-white/30 backdrop-blur-lg h-auto md:p-5 mt-5 rounded-lg mb-10">
              <form
                onSubmit={updatePost}
                className="flex flex-col w-full px-10 py-2 gap-6 text-black "
              >
                <label className="text-black">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className=" rounded-lg h-10 text-black px-3"
                  type="text"
                />
                <label className="text-black">Summary</label>
                <input
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  type="text"
                  className=" rounded-lg h-10 text-black px-3"
                />
                <label className="text-black">Cover Image</label>
                <input
                  onChange={(e) => setFiles(e.target.files)}
                  type="file"
                  className="text-black"
                />
                <label className="text-black">Content</label>
                <Editor value={content} onChange={setContent} />
                &nbsp;
                <button className="md:text-lg p-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white w-1/2 mx-auto rounded-lg flex flex-row justify-center items-center gap-2 hover:from-sky-400 hover:to-indigo-400 hover:font-semibold">
                  Edit Post <ion-icon name="create-outline" />
                </button>
              </form>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default EditPost;
