import "./searchBar.scss";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import useHttp from "@/hooks/useHttp";

type Props = { name: string; placeholder: string };

const SearchBar: React.FC<Props> = (props) => {
  const { name, placeholder } = props;

  const [inputValue, setInputValue] = useState("");
  const [{ games }, setGames] = useState<{ games: string[] }>({ games: [] });

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    if (inputValue === "") {
      setGames({ games: [] });
      return;
    }
    sendRequest({ url: `/api/search/${inputValue}` }, setGames);
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
        {isLoading && (
          <div className="loader__wrapper">
            <Oval secondaryColor="black" ariaLabel="Loading..." color="white" width={50} height={50} />
          </div>
        )}
        {!error && !isLoading && (
          <ul>
            {games.map((game) => (
              <button
                type="button"
                onClick={() => {
                  alert("got product");
                }}
                key={game}
              >
                {game}
              </button>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
