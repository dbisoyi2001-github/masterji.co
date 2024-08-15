import { FaArrowLeft } from "react-icons/fa6";
import { MdRefresh } from "react-icons/md";
import Logo from "../../components/Logo";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const RandomUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registerDate, setRegisterDate] = useState(" ");
  const [dob, setDob] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const url = import.meta.env.VITE_USERS_URL
      setLoading(true);
      try {
        const response = await axios.get(
          url
        );
        const userData = response.data.data;
        setUser(userData);
        setDob(userData.dob.date);
        setRegisterDate(userData.registered.date);
        setLatitude(userData.location.coordinates.latitude);
        setLongitude(userData.location.coordinates.longitude);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [fetchTrigger]);

  const formatDate = (isoString) => {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Define options for formatting
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    // Format the date using toLocaleDateString
    return date.toLocaleDateString("en-GB", options);
  };

  const handleButtonClick = () => {
    setFetchTrigger((prev) => !prev);
  };

  // Display error state
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="relative flex items-center justify-center h-screen w-full bg-gray-800 font-serif">
      {loading ? (
        <div className="loader"> .</div>
      ) : (
        <div className="user-card flex flex-col bg-[#B6B3F3] min-h-80 min-w-80 p-4 border-8 border-white rounded-2xl">
          <div className="header flex items-center justify-between">
            <FaArrowLeft />
            <span className="font-semibold">Profile Overview</span>
            <MdRefresh
              size={22}
              className="cursor-pointer"
              onClick={handleButtonClick}
            />
          </div>
          <div className="content flex-grow">
            <div className="pfp flex flex-col items-center justify-center mt-8">
              <div className="img relative">
                <img
                  src={user.picture.large}
                  alt="profile"
                  className="rounded-full object-cover object-center h-28 w-28 shadow"
                />
                <span className="absolute top-0 left-[6.2rem] text-white bg-black rounded-3xl px-1 text-[12px]">
                  {user.name.title}
                </span>
              </div>
              <h1 className="mt-4 text-2xl">
                {user.name.first} {user.name.last}
              </h1>
              <h4 className="font-pop mb-4 mt-2 text-sm">
                {user.login.username}
              </h4>
            </div>
            <hr className="border-1 border-gray-400" />
            <div className="info-1 flex justify-center gap-8 py-4">
              <a
                className="flex items-center gap-1"
                href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              >
                <div className="rounded-full size-7 bg-black text-white flex items-center justify-center">
                  <IoLocationOutline size={14} />
                </div>
                <span className="font-pop text-xs">Location</span>
              </a>
              <a className="flex items-center gap-1" href={`tel:${user.phone}`}>
                <div className="rounded-full size-7 bg-black text-white flex items-center justify-center">
                  <IoCallOutline size={14} />
                </div>
                <span className="font-pop text-xs">Call me</span>
              </a>
            </div>
            <hr className="border-1 border-gray-400" />
            <div className="info-2 grid grid-cols-2 text-[10px] text-gray-600 font-pop mb-8 mt-4 gap-4">
              <div>
                City
                <p className="text-base text-black font-serif font-semibold">
                  {user.location.city}
                </p>
              </div>
              <div>
                Nationality
                <p className="text-base text-black font-serif font-semibold">
                  <img src="" alt="" />
                  {user.nat}
                </p>
              </div>
              <div>
                Date of birth
                <p className="text-base text-black font-serif font-semibold">
                  {formatDate(dob)}
                </p>
              </div>
              <div>
                Phone No.
                <p className="text-base text-black font-serif font-semibold">
                  {user.phone}
                </p>
              </div>
              <div>
                Time zone{" "}
                <p className="text-base text-black font-serif font-semibold">
                  {user.location.timezone.offset}
                  <span>
                    ( {user.location.timezone.description.split(",")[0].trim()}{" "}
                    )
                  </span>
                </p>
              </div>
              <div>
                Resitered Since{" "}
                <p className="text-base text-black font-serif font-semibold">
                  {formatDate(registerDate)}
                </p>
              </div>
            </div>
          </div>
          <div className="footer mt-auto flex items-baseline justify-between">
            <span></span>
            <span className="text-white text-[10px] font-pop opacity-50">
              @ chai aur code
            </span>
            <Logo width="50" height="50" />
          </div>
        </div>
      )}
    </main>
  );
};

export default RandomUser;
