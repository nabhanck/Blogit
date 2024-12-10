import React from "react";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";

const PostCreate = () => {
  return (
    <div className="flex justify-center bg-gray-500/30 h-[1500px]">
      <div className="flex flex-col md:w-1/2 w-full bg-white/30 backdrop-blur-lg h-[1200px] md:p-5">
        <h1 className="mx-auto font-semibold text-xl">Create a Post</h1>
        <form className="flex flex-col w-full px-10 py-2 gap-6 text-black ">
          <label className="text-black">Title</label>
          <input className=" rounded-lg h-10 text-black px-3" type="text" />
          <label className="text-black">Summary</label>
          <input type="text" className=" rounded-lg h-10 text-black px-3" />
          <label className="text-black">Cover Image</label>
          <input type="file" className="text-black" />
          <label className="text-black">Content</label>
          <Editor />
          &nbsp;
          <button className="md:text-lg p-2 bg-black text-white w-1/2 mx-auto rounded-lg">
            Post
          </button>
        </form>
      </div>
      <style></style>
    </div>
  );
};

export default PostCreate;
