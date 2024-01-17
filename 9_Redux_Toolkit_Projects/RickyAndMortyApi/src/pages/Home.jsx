import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import Masonry from "react-masonry-css";
import "../style/measonry.css";
import Loading from "../components/Loading";

function Home() {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters.items);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const error = useSelector((state) => state.characters.error);
  const nextPage = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const handleNextPage = (nextPage) => {
    dispatch(fetchCharacters(nextPage));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h1>Characters</h1>
      <Masonry
        breakpointCols={3}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters?.results?.map((item) => (
          <div key={item.id}>
            <Link to={`/character/${item.id}`}>
              <img src={`${item.image}`} alt={item.name} />
              <h3>{item.name}</h3>
            </Link>
          </div>
        ))}
      </Masonry>

      <div style={{ padding: "24px", textAlign: "center" }}>
        {isLoading && <Loading />}
        {hasNextPage && !isLoading && (
          <button onClick={() => handleNextPage(nextPage)}>
            Load More ({nextPage - 1})
          </button>
        )}
        {
          !hasNextPage && !isLoading && (
            <p>There are no more characters to load</p>)
        }
      </div>
    </div>
  );
}

export default Home;
