import React from "react";

const PostsContainer = () => {
  return (
    <div className="max-w-4xl h-auto bg-red-500 mx-auto flex flex-col mt-10">
      <div className="font-bold text-6xl mb-5">Title</div>
      <div className="flex flex-row justify-between gap-3 bg-yellow-300 pb-1 items-center">
        <div className="flex gap-3 items-center">
          <img className="w-12 h-12 rounded-full" src="./nabhan.jpg" />
          <p className="text-end">Author</p>
        </div>
        <p>Time</p>
      </div>
      <img className="h-[500px]" src="camera.jpg" />
      <div>Content</div>
    </div>
  );
};

export default PostsContainer;
