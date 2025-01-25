import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constans";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const FeedCard = ({ user }) => {
  const dispatch = useDispatch();
  const {
    _id,
    firstName,
    lastName,
    age,
    gender,
    skills,
    photo: photoUrl,
    about,
  } = user;
  const handleFeed = async (status, user_id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/sent/" + status + "/" + user_id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center   -z-20 ">
      <div className="card bg-base-200 w-96 shadow-xl ">
        <figure>
          <img src={photoUrl} alt="Profile_Picture" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && (
            <h3>
              <span className="font-semibold">Age:</span> {age}
            </h3>
          )}
          {gender && (
            <h3>
              <span className="font-semibold">Gender: </span>
              {gender}
            </h3>
          )}
          {about && (
            <h3 className="whitespace-normal break-words">
              <span className="font-semibold">About: </span>
              {about}
            </h3>
          )}
          {skills.length > 0 ? (
            <h3 className="whitespace-normal break-words">
              <span className="font-semibold">Skills: </span> {skills}{" "}
            </h3>
          ) : (
            <h3 className="font-semibold">No Skills Listed</h3>
          )}
          <div className="card-actions justify-evenly mt-4">
            <button
              className="btn btn-error"
              onClick={() => handleFeed("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleFeed("intrested", _id)}
            >
              Intrested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
