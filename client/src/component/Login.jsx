import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constans";
import { useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [emailId, setEmailId] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");
  const [isSignin, setIsSignin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      setIsSignin(true);
      await handleLoginClick();
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Somthing Went Wrong!");
      console.log(err);
    }
  };
  const handleLoginClick = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Somthing Went Wrong!");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-36">
      <div className="card bg-base-200 w-96  shadow-xl">
        <div className="card-body">
          <h1 className="card-title  ">Login to TradeCircle</h1>
          {isSignin && (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                placeholder=""
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          )}
          {isSignin && (
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                placeholder=""
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          )}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              placeholder=""
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center mt-3">
            {!isSignin && (
              <button onClick={handleLoginClick} className="btn btn-primary">
                Login
              </button>
            )}
            {isSignin && (
              <button onClick={handleSignin} className="btn btn-primary">
                Signin
              </button>
            )}
          </div>
          {!isSignin && (
            <p
              className="hover:cursor-pointer text-center "
              onClick={() => setIsSignin(true)}
            >
              New User. Signin?
            </p>
          )}
          {isSignin && (
            <p
              className="hover:cursor-pointer text-center "
              onClick={() => setIsSignin(false)}
            >
              Already User. Login?
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
