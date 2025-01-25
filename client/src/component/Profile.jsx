import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) {
    return <div>Loading..</div>;
  }

  return (
    <div className="mt-24">
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
