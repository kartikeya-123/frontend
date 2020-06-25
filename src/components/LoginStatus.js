// import React from "react";
import axios from "axios";
export const loginStatus = () => {
  axios
    .get("http://localhost:7000/api/v1/users/loginStatus", {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};
