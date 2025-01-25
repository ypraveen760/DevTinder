import React, { useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { BASE_URL } from "../utils/constans";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [photo, setPhoto] = useState(user.photo);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [notifacation, setNotifacation] = useState(false);
  const handleSubmit = async () => {
    try {
      setError("");
      const res = await axios.put(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          gender,
          age,
          photo,
          about,
          skills: skills,
        },

        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setNotifacation(true);
      setTimeout(() => {
        setNotifacation(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <div className=" flex flex-col-reverse md:flex-row-reverse justify-center gap-10  ">
      {notifacation && (
        <div className="toast toast-top toast-center  z-50">
          <div className="alert alert-success">
            <span>Profile Save Successfully</span>
          </div>
        </div>
      )}{" "}
      <div className="flex justify-center">
        <div className="card bg-base-200 w-96  flex shadow-xl">
          <div className="card-body">
            <h2 className="card-title ">Edit Profile</h2>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-xs ">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <select
                className="select select-bordered"
                value={gender || "Gender"}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Photo Url</span>
              </div>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Your About</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Your Skills</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              ></textarea>
              <div className="label">
                <span className="label-text-alt">Max Skills-10</span>
                <span className="label-text-alt">
                  Seprate Skills with (Comma)
                </span>
              </div>
            </label>
            <p>{error}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-success" onClick={handleSubmit}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="card-title flex justify-center mb-4">
          Live Edit Profile Preview
        </h3>
        <FeedCard
          user={{ firstName, lastName, gender, age, photo, skills, about }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
