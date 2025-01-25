import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constans";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connectionsData = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.userData));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connectionsData) return;
  if (connectionsData.length === 0)
    return (
      <div>
        <h1 className="flex justify-center mt-24 font-bold text-2xl">
          No Connections Found
        </h1>
      </div>
    );

  return (
    <div className=" mt-20">
      <h1 className="text-center text-2xl font-medium">Connections</h1>
      {connectionsData.map((data) => {
        const { _id, firstName, lastName, photo, about, age, gender } = data;

        return (
          <div key={_id} className="flex justify-center my-4">
            <div className="w-full lg:w-6/12   items-center  flex  bg-base-200">
              <img className="h-24 w-24 m-3 rounded-full" src={photo} />
              <div className=" p-6">
                <h1 className=" font-medium">{firstName + " " + lastName}</h1>
                {age && gender && (
                  <h3 className=" font-medium">{age + " " + gender}</h3>
                )}
                {about && (
                  <p className="whitespace-normal break-words">
                    <span className=" font-medium">About:</span>
                    {about}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
