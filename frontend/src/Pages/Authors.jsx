import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Authors = () => {
  const [authors, setauthors] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/authors`).then((response) => {
      response.json().then((data) => {
        setauthors(data);
        setSearch(data);
      });
    });
  }, []);
  console.log(authors);

  const filter = (e) => {
    setSearch(
      authors.filter((item) =>
        item.username.toLowerCase().includes(e.target.value)
      )
    );
  };

  return (
    <div className="w-full h-screen flex flex-col items-start ">
      <input
        onChange={filter}
        placeholder="Seacrh Authors"
        className="mt-10 mb-10 border-[2px] border-gray-400 rounded-xl px-3 py-1 md:ml-40"
      />
      <div className="w-[80%] grid grid-cols-2 h-auto gap-10 mx-auto ">
        {search.map((author) => (
          <Link
            to={`/author/${author._id}`}
            className="md:w-[50%] md:h-[120%] "
          >
            <div className="bg-black/30 hover:bg-black/40 w-full h-full flex items-center gap-3 md:pl-2 rounded-xl">
              {!author.image ? (
                <ion-icon
                  name="person-circle-outline"
                  class="text-3xl text-white md:w-[100px] md:h-[100px]"
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_URL}/${author.image}`}
                  className="md:w-[100px] md:h-[100px] rounded-full object-cover"
                />
              )}
              <h1 className="text-3xl text-white">{author.username}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Authors;
