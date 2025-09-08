"use client";

import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    async function getprofile() {
      try {
        const res = await fetch("http://localhost:3020/api/auth/profile", {
          method: "Get",
          credentials: "include",
        });
        const data = await res.json();
        setUserdata(data);
      } catch (error) {
        console.log(error);
      }
    }
    getprofile();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <h1>{userdata?.message}</h1>
    </div>
  );
};

export default Profile;
