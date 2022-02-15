import "./homePage.scss";
import useFetch from "use-http";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CategoryCard from "@/elements/categoryCard/categoryCard";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard, { Props as GameCardContent } from "@/elements/gameCard/gameCard";
import SearchBar from "@/elements/searchBar/searchBar";
import windowsLogo from "../../../assets/images/icone-windows-gris.png";
import psLogo from "../../../assets/images/ps.png";
import xboxLogo from "../../../assets/images/xbox.png";

const HomePage: React.FC = () => {
  const [{ games }, setGames] = useState<{ games: GameCardContent[] }>({ games: [] });

  const { get, response, loading, error } = useFetch("/api/getTopProducts");

  useEffect(() => {
    (async () => {
      const initGames = await get("/");
      if (response.ok) {
        setGames(initGames);
      }
    })();
  }, []);

  return (
    <>
      <SearchBar placeholder="Search" />
      <SectionContainer title="Categories">
        <div className="cards_wrapper section__categoriesCards">
          <NavLink to="/products/pc">
            <CategoryCard cardLogo={windowsLogo} cardTitle="PC" />
          </NavLink>
          <NavLink to="/products/ps">
            <CategoryCard cardLogo={psLogo} cardTitle="Playstation" />
          </NavLink>
          <NavLink to="/products/xbox">
            <CategoryCard cardLogo={xboxLogo} cardTitle="XBox One" />
          </NavLink>
        </div>
      </SectionContainer>
      <SectionContainer title="New games">
        <div className="cards_wrapper section__gamesCards">
          {loading && <div>Loading</div>}
          {error && <div>{error.message}</div>}
          {!error &&
            games.map(
              ({
                rating,
                gameLogo,
                gameTitle,
                gamePrice,
                gamePlatformsImg,
                ageLimit,
                gameDescription,
                gamePlatforms,
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
        </div>
      </SectionContainer>
    </>
  );
};
export default HomePage;
