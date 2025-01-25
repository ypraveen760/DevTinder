import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constans";

const ConnectionRequests = () => {
  const requestData = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const handleRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recived", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!requestData) return;
  if (requestData.length === 0)
    return (
      <div>
        <h1 className="flex justify-center mt-24 font-bold text-2xl">
          No Connections Request Found
        </h1>
      </div>
    );

  return (
    <div className=" mt-20">
      <h1 className="text-center text-2xl font-medium">Connection Request </h1>
      {requestData.map((data) => {
        const { _id, firstName, lastName, photo, about, age, gender } =
          data.fromUserId;
        return (
          <div key={_id} className="flex justify-center my-4">
            <div className="w-full lg:w-6/12    items-center  flex   bg-base-200">
              <img className="h-24 w-24 m-3 rounded-full" src={photo} />
              <div className=" p-6">
                <h1 className=" font-medium">{firstName + " " + lastName}</h1>
                {age && gender && (
                  <h3 className="text-xl font-medium">{age + " " + gender}</h3>
                )}
                {about && (
                  <p className="whitespace-normal break-words">
                    <span className="text-xl font-medium">About:</span>

                    {about}
                  </p>
                )}
              </div>
              <div className="mx-5">
                <button
                  className="btn mx-4 my-1 btn-success"
                  onClick={() => handleRequest("accepted", data._id)}
                >
                  Accept
                </button>
                <button
                  className="btn mx-3 my-1 btn-error"
                  onClick={() => handleRequest("rejected", data._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionRequests;
