import "./searchBar.scss";
import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import useFetch from "use-http";

type Props = { name: string; placeholder: string };

const SearchBar: React.FC<Props> = (props) => {
  const { name, placeholder } = props;

  const [inputValue, setInputValue] = useState("");
  const [{ games }, setGames] = useState<{ games: string[] }>({ games: [] });

  const { get, response, error, loading } = useFetch();

  useEffect(() => {
    if (inputValue === "") {
      return;
    }
    (async () => {
      const initGames = await get(`/api/search/${inputValue}`);
      if (response.ok) {
        setGames(initGames);
      }
    })();
  }, [inputValue]);

  return (
    <div className="search-wrapper">
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue}
        className="search-bar"
        type="text"
        placeholder={placeholder}
      />
      <div className="search-list">
        {loading && (
          <div className="loader__wrapper">
            <Oval secondaryColor="black" ariaLabel="Loading..." color="white" width={50} height={50} />
          </div>
        )}
        {error && <div>Error</div>}
        {inputValue && (
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
