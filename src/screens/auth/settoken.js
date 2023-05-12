import React, { useState, useEffect } from "react";
import { setClientToken } from "../../features/searchapi/spotify";

const SetToken = () => {
    const [token, setToken] = useState("");

    return useEffect(() => {
      const token = window.localStorage.getItem("token");
      const hash = window.location.hash;
      window.location.hash = "";
      if (!token && hash) {
        const _token = hash.split("&")[0].split("=")[1];
        window.localStorage.setItem("token", _token);
        setToken(_token);
        setClientToken(_token);
      } else {
        setToken(token);
        setClientToken(token);
      }
    }, []);
    
}
 
export default SetToken;