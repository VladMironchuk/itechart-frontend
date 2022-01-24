import "./searchBar.scss";
import { useState, useEffect } from "react";
import { useHttp } from "@/helpers/useFetch";

export const SearchBar: React.FC<{ name: string; placeholder: string }> = ({ name, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  const [{ games }, setGames] = useState<{ games: string[] }>({ games: [] });

  const { isLoading, error, sendRequest } = useHttp();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  useEffect(() => {
    if (inputValue === "") {
      setGames({ games: [] });
      return;
    }
    console.log(inputValue);
    sendRequest({ url: `/api/search/${inputValue}` }, setGames);
    console.log(games);
  }, [inputValue, sendRequest]);

  return (
    <div className="search-wrapper">
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue}
        className="search-bar"
        type="text"
        name={name}
        placeholder={placeholder}
      />
      <div className="search-list">
        <ul>
          {games.map((game) => (
            <li
              onClick={() => {
                alert("got product");
              }}
              key={game}
            >
              {game}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
