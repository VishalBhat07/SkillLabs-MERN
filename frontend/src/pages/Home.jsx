import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);
  return <div>This is my home</div>;
};

export default Home;
