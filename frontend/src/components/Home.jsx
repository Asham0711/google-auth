// import React from 'react';
import Cookies from "js-cookie"; // Import js-cookie
import { useEffect, useState } from "react";

function Home({ userData }) {
  return (
    <h1 className="h-screen flex w-full justify-center items-center text-3xl">
      {userData ? `Welcome ${userData?.username}` : "please login in"}
    </h1>
  );
}

export default Home;
