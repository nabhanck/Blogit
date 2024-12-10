import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

const AuthorPage = () => {
  const [res, setRes] = useState([]);
  const [author, setAuthor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/author/${id}`).then((response) => {
      response.json().then((data) => {
        setRes(data);
      });
    });
    fetch(`http://localhost:5000/dp/${id}`).then((response) => {
      response.json().then((dp) => {
        setAuthor(dp);
      });
    });
  }, []);

  console.log(author);

  // return (
  //   <div>
  //     <div>
  //       <h1>Author: {author.username}</h1>
  //       <img src={`http://localhost:5000/${author.image}`} />
  //     </div>
  //     {res.map((item) => {
  //       return (
  //         <ul>
  //           <li>
  //             <h1>{item.title}</h1>
  //             <img src={`http://localhost:5000/${item.image}`} />
  //             <h2>{item.summary}</h2>
  //           </li>
  //         </ul>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <div className="md:w-[80%] w-full flex flex-col items-center mx-auto bg-gradient-to-r from-purple-500/60 to-pink-500/50 shadow-2xl h-auto md:p-10 md:pl-20 p-5 md:mt-10 md:rounded-xl">
      <h1 className="text-4xl font-bold mb-4 text-white md:tracking-[6px]">
        Author Details
      </h1>
      <div className="bg-gray-500/40 shadow-lg shadow-black md:w-fit w-full flex flex-row md:gap-10 gap-5 items-center md:p-5 p-2 rounded-2xl md:justify-normal justify-center">
        {!author.image ? (
          <ion-icon
            name="person-circle-outline"
            class="text-2xl md:w-[180px] md:h-[195px] w-[120px] h-[120px] text-white"
          />
        ) : (
          <img
            src={`http://localhost:5000/${author.image}`}
            className="md:w-[180px] md:h-[195px] w-[120px] h-[120px] object-cover rounded-full shadow-xl"
          />
        )}

        <div className="flex flex-row md:gap-4 gap-4 p-2 ">
          <div className="flex flex-col gap-4 text-gray-200 md:items-end">
            <div className=" md:text-lg md:p-2">Author :</div>
            <div className=" md:text-lg md:p-2">Location :</div>
            <div className=" md:text-lg md:p-2">Organization:</div>
            <div className=" md:text-lg md:p-2">Contact :</div>
          </div>
          <div className="flex flex-col gap-4">
            <input
              value={author.username}
              disabled="true"
              className="bg-transparent text-white rounded-md md:p-2 md:text-lg font-semibold"
            />
            <input
              value={author.location}
              disabled="true"
              className="bg-transparent text-white rounded-md md:p-2 md:text-lg font-semibold"
            />
            <input
              value={author.organization}
              disabled="true"
              className="bg-transparent text-white rounded-md md:p-2 md:text-lg font-semibold"
            />
            <input
              value={author.contact}
              disabled="true"
              className="bg-transparent text-white rounded-md md:p-2 md:text-lg font-semibold"
            />
          </div>
        </div>
      </div>
      <h1 className="font-bold mb-4 text-4xl mt-[100px] text-white md:tracking-[6px]">
        From Author
      </h1>

      {/* Blogs Container */}
      <div className="w-full h-auto bg-gray-500/40 shadow-lg p-5 gap-5 grid md:grid-cols-2 md:grid-rows-2">
        {res.map((item) => {
          return (
            <Link to={`/post/${item._id}`}>
              <div className="w-1/2 h-auto flex flex-row bg-blue-400 rounded-lg">
                <img
                  src={`http://localhost:5000/${item.image}`}
                  className="md:w-[250px] md:h-[200px] w-[150px] h-[140px] rounded-tl-lg rounded-bl-lg"
                />
                <div className="flex flex-col w-full bg-white justify-between rounded-tr-lg rounded-br-lg hover:bg-black hover:text-white">
                  <div className="flex flex-col gap-2 mt-4 ml-2  md:max-w-[300px] max-w-[200px] ">
                    <h1 className="font-bold text-xl truncate">{item.title}</h1>
                    <h1 className="font-semibold max-w-[250px] truncate">
                      {item.summary}
                    </h1>
                    <div className="flex flex-row gap-2">
                      <h1 className="md:text-nowrap text-sm">Published on:</h1>
                      <h1 className="md:text-nowrap text-sm">
                        {format(new Date(item.createdAt), "MMM, dd - yyy")}
                      </h1>
                    </div>
                    <div className=" font-semibold md:text-xl text-sm flex items-center gap-3  md:mt-5">
                      Read More
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            // <ul>
            //   <li>
            //     <h1>{item.title}</h1>
            //     <img src={`http://localhost:5000/${item.image}`} />
            //     <h2>{item.summary}</h2>
            //   </li>
            // </ul>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorPage;
