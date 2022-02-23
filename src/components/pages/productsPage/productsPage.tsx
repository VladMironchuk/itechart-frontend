import "./productsPage.scss";
import "react-dropdown/style.css";
import { useParams } from "react-router";
import { ChangeEventHandler, Suspense, useEffect, useState } from "react";
import useFetch from "use-http";
import GameCard, { Props as GameCardContent } from "@/elements/gameCard/gameCard";
import SearchBar from "@/elements/searchBar/searchBar";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const [selectedAgeFilter, setSelectedAgeFilter] = useState("18");
  const [selectedGenreFilter, setSelectedGenreFilter] = useState("all");

  const [selectedSortCriteria, setSelectedSortCriteria] = useState("gameTitle");
  const [selectedSortOrder, setSelectedSortOrder] = useState("asc");

  const [games, setGames] = useState<GameCardContent[]>([]);

  const { get, loading, error } = useFetch();

  const onAgeValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedAgeFilter(event.target.value);
  };

  const onGenreValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSelectedGenreFilter(event.target.value);
  };

  const onSortCriteriaChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedSortCriteria(event.target.value);
  };

  const onSortOrderChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSelectedSortOrder(event.target.value);
  };

  useEffect(() => {
    get(
      `/api/products?age=${selectedAgeFilter}&genre=${selectedGenreFilter}&criteria=${selectedSortCriteria}&order=${selectedSortOrder}&platform=${category}`
    ).then((data) => {
      setGames(data);
    });
  }, [selectedAgeFilter, selectedGenreFilter, selectedSortCriteria, selectedSortOrder, category]);

  return (
    <div className="products-wrapper">
      <aside className="aside">
        <h3>{category}</h3>
        <div className="aside__sort">
          <h4>Sort</h4>
          <div className="aside__sort__criteria">
            <p>Criteria</p>
            <select onChange={onSortCriteriaChange}>
              <option value="gameTitle">Name</option>
              <option value="rating">Rating</option>
              <option value="gamePrice">Price</option>
            </select>
          </div>
          <div className="aside__sort__criteria">
            <p>Type</p>
            <select onChange={onSortOrderChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="aside__filter">
          <h4>Genres</h4>
          <form>
            <div className="aside__filter__option">
              <label htmlFor="all-genres">
                <input
                  checked={selectedGenreFilter === "all"}
                  value="all"
                  onChange={onGenreValueChange}
                  type="radio"
                  id="all-genres"
                  name="genre"
                />
                All Genres
              </label>
            </div>
            <div className="aside__filter__option">
              <label htmlFor="shooter">
                <input
                  checked={selectedGenreFilter === "shooter"}
                  value="shooter"
                  onChange={onGenreValueChange}
                  type="radio"
                  name="genre"
                  id="shooter"
                />
                Shooter
              </label>
            </div>
            <div className="aside__filter__option">
              <label htmlFor="arcade">
                <input
                  checked={selectedGenreFilter === "arcade"}
                  value="arcade"
                  onChange={onGenreValueChange}
                  type="radio"
                  name="genre"
                  id="arcade"
                />
                Arcade
              </label>
            </div>
            <div className="aside__filter__option">
              <label htmlFor="survive">
                <input
                  checked={selectedGenreFilter === "survive"}
                  value="survive"
                  onChange={onGenreValueChange}
                  type="radio"
                  name="genre"
                  id="survive"
                />
                Survive
              </label>
            </div>
          </form>
        </div>
        <div className="aside__filter">
          <h4>Ages</h4>
          <form>
            <div>
              <label htmlFor="all-ages">
                <input
                  checked={selectedAgeFilter === "100"}
                  onChange={onAgeValueChange}
                  value="100"
                  type="radio"
                  name="age"
                  id="all-ages"
                />
                All Ages
              </label>
            </div>
            <div>
              <label htmlFor="3">
                <input
                  checked={selectedAgeFilter === "3"}
                  onChange={onAgeValueChange}
                  value="3"
                  type="radio"
                  name="age"
                  id="3"
                />
                3+
              </label>
            </div>
            <div>
              <label htmlFor="6">
                <input
                  checked={selectedAgeFilter === "6"}
                  onChange={onAgeValueChange}
                  value="6"
                  type="radio"
                  name="age"
                  id="6"
                />
                6+
              </label>
            </div>
            <div>
              <label htmlFor="12">
                <input
                  checked={selectedAgeFilter === "12"}
                  onChange={onAgeValueChange}
                  value="12"
                  type="radio"
                  name="age"
                  id="12"
                />
                12+
              </label>
            </div>
            <div>
              <label htmlFor="18">
                <input
                  checked={selectedAgeFilter === "18"}
                  onChange={onAgeValueChange}
                  value="18"
                  type="radio"
                  name="age"
                  id="18"
                />
                18+
              </label>
            </div>
          </form>
        </div>
      </aside>
      <div>
        <SearchBar placeholder="Search" />
        <SectionContainer title="Products">
          <div className="cards_wrapper section__gamesCards">
            <Suspense fallback={<div>Loading...</div>}>
              {error && <div>{error.message}</div>}
              {!loading && games.length === 0 && <div>No such products</div>}
              {!error &&
                games.map(
                  ({
                    rating,
                    gameLogo,
                    gameTitle,
                    gamePrice,
                    gamePlatforms,
                    ageLimit,
                    gameDescription,
                    gamePlatformsImg,
                  }) => (
                    <GameCard
                      key={gameTitle}
                      rating={rating}
                      gameLogo={gameLogo}
                      gameTitle={gameTitle}
                      gamePrice={gamePrice}
                      gamePlatforms={gamePlatforms}
                      ageLimit={ageLimit}
                      gameDescription={gameDescription}
                      gamePlatformsImg={gamePlatformsImg}
                    />
                  )
                )}
            </Suspense>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
};

export default ProductsPage;
