import "./searchBar.scss";
import { useState, useEffect, ChangeEventHandler } from "react";
import { Oval } from "react-loader-spinner";
import useFetch from "use-http";
import useDebounce from "@/hooks/useDebounce";

type Props = { placeholder: string };

const SearchBar: React.FC<Props> = (props) => {
  const { placeholder } = props;

  const [inputValue, setInputValue] = useState("");
  const [{ games }, setGames] = useState<{ games: string[] }>({ games: [] });

  const { get, response, error, loading } = useFetch();
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const onChangeFoundGames: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      return;
    }
    (async () => {
      const initGames = await get(`/api/search/${debouncedSearchTerm}`);
      if (response.ok) {
        setGames(initGames);
      }
    })();
  }, [debouncedSearchTerm]);

  return (
    <div className="search-wrapper">
      <input
        onChange={onChangeFoundGames}
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
