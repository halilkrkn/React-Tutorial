import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(fetchCharacters);
  }, []);

  console.log(characters);
  return (
    <div>
      <Link to="/home">Home</Link>
    </div>
  );
}

export default Home;
