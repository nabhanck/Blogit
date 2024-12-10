import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const BlogContainer = ({ _id, author, createdAt, title, image, summary }) => {
  return (
    <Link to={`/post/${_id}`}>
      <div className="md:relative md:shadow-2xl md:bg-transparent bg-transparent backdrop-blur-3xl md:border-none border-black border-2 shadow-md shadow-black rounded-xl md:p-0 p-3">
        <img
          src={`${process.env.REACT_APP_URL}/${image}`}
          alt="img"
          className="md:min-h-96 rounded-xl md:brightness-75 md:hover:brightness-95 object-cover"
        />
        <div className="w-full md:absolute left-2 md:top-[290px] ">
          <div className="flex gap-5 md:text-white text-black ">
            <div className="flex gap-2 md:m-0 mt-2">
              {author.image && (
                <img
                  className="w-6 h-6 rounded-full object-cover"
                  src={`${process.env.REACT_APP_URL}/${author.image}`}
                />
              )}
              {!author.image && (
                <ion-icon name="person-circle-outline" class="text-2xl" />
              )}
              <p>{author.username}</p>
            </div>
            <time className="md:m-0 mt-2">
              {format(new Date(createdAt), "MMM dd, yyy")}
            </time>
          </div>
          <div className="overflow-clip max-w-[400px] truncate ">
            <h2 className="text-3xl pb-1 font-bold md:text-white text-black text-start truncate">
              {title}
            </h2>
            <span className="text-black md:text-white max-w-full ">
              {summary}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogContainer;

// return (
//     <div className="flex items-center w-full justify-center mt-6">
//       <div className="grid md:grid-cols-3 md:gap-4 grid-cols-1 items-center w-[90%] gap-10 ">
//         <div className="relative">
//           <img src="./camera.jpg" alt="img" className="min-h-96 rounded-xl" />
//           <div className="w-full absolute left-2 top-[290px]  ">
//             <div className="flex gap-5">
//               <p className="text-start">Mar 16, 2020</p>
//               <p>Author</p>
//             </div>
//             <h2 className="text-4xl font-bold text-red-500 text-start">
//               Title
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
