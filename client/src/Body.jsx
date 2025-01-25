import React, { useEffect } from "react";
import NavBar from "./component/NavBar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Footer from "./component/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constans";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import Login from "./component/Login";

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      if (!userData) {
        const res = await axios.get(BASE_URL + "/profile/get", {
          withCredentials: true,
        });

        dispatch(addUser(res.data));
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      //make error page and redirect to error page
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
