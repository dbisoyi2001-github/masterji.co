import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CiBookmark } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaArrowLeft, FaRetweet } from "react-icons/fa6";
import { IoIosHeartEmpty, IoIosMore } from "react-icons/io";
import { LuDot, LuUpload } from "react-icons/lu";
import { MdVerified } from "react-icons/md";
import Logo from "../../components/Logo";

const RandomJokes = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [views, setViews] = useState("20.5M");
  const [comments, setComments] = useState("4.9k");
  const [retweets, setRetweets] = useState("4.9k");
  const [likes, setLikes] = useState("4.9k");
  const [bookmarks, setBookmarks] = useState("4.9k");
  const [dateTime, setDateTime] = useState("20 JULY, 2022");

  const fetchJoke = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random"
      );
      setJoke(response.data.data.content);
      setViews(generateRandomViews());
      setComments(generateRandomNumber());
      setRetweets(generateRandomNumber());
      setLikes(generateRandomNumber());
      setBookmarks(generateRandomNumber());
      setDateTime(generateRandomDate());
      setLoading(false);
    } catch (err) {
      setError("Error fetching joke", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  // Function to generate random views
  const generateRandomViews = () => {
    const views = ["1M", "5M", "10M", "20M", "50M"];
    return `${views[Math.floor(Math.random() * views.length)]}`;
  };

  // Function to generate random number with 'k' suffix
  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 10000) + 1000;
    return `${(number / 1000).toFixed(1)}k`;
  };

  // Function to generate random date
  const generateRandomDate = () => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const randomDay = Math.floor(Math.random() * 31) + 1;
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomYear = Math.floor(Math.random() * (2024 - 2020 + 1)) + 2020;
    return `${randomDay} ${randomMonth}, ${randomYear}`;
  };

  return (
    <div className="h-[100vh] relative w-full flex items-center justify-center bg-no-repeat bg-cover bg-jokes font-pop font-light">
      {loading && (
        <div className="absolute top-[50%] left-[50%] flex justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      {error && (
        <div className="size-80 flex justify-center items-center text-2xl text-red-600">
          Error
        </div>
      )}
      <div className="absolute bottom-10 right-10">
        <Logo width="60" height="60" />
      </div>
      <div className="jokes-card text-white bg-black rounded-xl p-4 min-w-96 max-w-[40%] px-6 shadow-right-bottom">
        <header className="flex items-center space-x-6 mt-4">
          <FaArrowLeft size={18} />{" "}
          <span className="text-xl font-semibold ">Post</span>
        </header>
        <div className="profile flex justify-between mt-4">
          <div className="pfp flex gap-2 justify-between">
            <img
              src="/elon.png"
              alt=""
              className="w-16 h-16 object-cover object-center rounded-full"
            />
            <div>
              <h1 className="font-semibold flex items-center gap-1 text-lg">
                Elon Musk <MdVerified color="#1C9BEF" />
              </h1>
              <span className="text-sm opacity-60">@elonmusk</span>
            </div>
          </div>
          <div>
            <IoIosMore color="lightgray" size={18} />
          </div>
        </div>
        <div className="joke mt-4">{joke}</div>
        <div className="analytics-1 text-[0.8rem] flex mt-5 items-center">
          <span className="opacity-60">{dateTime}</span>
          <LuDot className="opacity-60" />
          <span className="opacity-60">{dateTime}</span>
          <LuDot className="opacity-60" />
          <span className="">{views}</span>
          <span className="opacity-60">&nbsp; Views</span>
        </div>
        <hr className="opacity-60 mt-4" />
        <div className="analytics-2 flex gap-2 py-3 justify-between px-8">
          <div className="flex items-center gap-1 text-xs opacity-60">
            <FaRegCommentAlt />
            <span>{comments}</span>
          </div>
          <span className="flex items-center gap-1 text-xs opacity-60">
            <FaRetweet size={16} />
            {retweets}
          </span>
          <span className="flex items-center gap-1 text-xs opacity-60">
            <IoIosHeartEmpty size={14} />
            {likes}
          </span>
          <span className="flex items-center gap-1 text-xs opacity-60">
            <CiBookmark size={14} />
            {bookmarks}
          </span>
          <span className="flex items-center gap-1 text-xs opacity-60">
            <LuUpload />
          </span>
        </div>
        <hr className="opacity-60" />
        <footer className="flex justify-center text-xs opacity-60 mt-6 mb-4">
          @chai aur code
        </footer>
      </div>
    </div>
  );
};

export default RandomJokes;
