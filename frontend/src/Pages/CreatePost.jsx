import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Components/Editor";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../UserContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { userInfo } = useContext(UserContext);

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    console.log(files);
    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  // return (
  //   <div>
  //     <h1>Create A Post</h1>
  //     <form onSubmit={createNewPost}>
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
        <div className="flex flex-col justify-center h-auto">
          <h1 className="mx-auto font-semibold text-gray-600 text-4xl mt-10 tracking-wider drop-shadow-lg">
            Create Post
          </h1>
          <div className="flex flex-col mx-auto md:w-1/2 w-full bg-gradient-to-tr from-blue-400 to-pink-400 backdrop-blur-lg h-auto md:p-5 mt-5 mb-10 rounded-lg shadow-lg shadow-black">
            <form
              onSubmit={createNewPost}
              className="flex flex-col w-full md:px-10 md:py-2 px-2 py-5 gap-6 text-black "
            >
              <label className="text-white">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" rounded-lg h-10 text-black px-3"
                type="text"
              />
              <label className="text-white">Summary</label>
              <input
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                type="text"
                className=" rounded-lg h-10 px-3"
                maxLength={80}
              />
              <label className="text-white">Cover Image</label>
              <input
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                className="text-white"
              />
              <label className="text-white">Content</label>
              <Editor
                value={content}
                onChange={setContent}
                class="text-white"
              />
              &nbsp;
              <button className="flex flex-row justify-center gap-2 md:text-lg p-2 bg-white text-black hover:bg-black hover:text-white w-1/2 mx-auto rounded-lg items-center">
                Post <ion-icon name="cloud-upload-outline" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
