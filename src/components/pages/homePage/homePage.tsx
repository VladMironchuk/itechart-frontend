import "./homePage.scss";
import { useEffect, useState } from "react";
import CategoryCard from "@/elements/categoryCard/categoryCard";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard, { GameCardContent } from "@/elements/gameCard/gameCard";
import SearchBar from "@/elements/searchBar/searchBar";
import useHttp from "@/hooks/useHttp";
import windowsLogo from "../../../assets/images/icone-windows-gris.png";
import psLogo from "../../../assets/images/ps.png";
import xboxLogo from "../../../assets/images/xbox.png";

const HomePage: React.FC = () => {
  const [{ games }, setGames] = useState<{ games: GameCardContent[] }>({ games: [] });

  const { sendRequest, error } = useHttp();

  useEffect(() => {
    sendRequest({ url: "/api/getTopProducts" }, setGames);
  }, [sendRequest]);

  return (
    <>
      <SearchBar name="games" placeholder="Search" />
      <SectionContainer title="Categories">
        <div className="cards_wrapper section__categoriesCards">
          <CategoryCard cardLogo={windowsLogo} cardTitle="PC" />
          <CategoryCard cardLogo={psLogo} cardTitle="Playstation" />
          <CategoryCard cardLogo={xboxLogo} cardTitle="XBox One" />
        </div>
      </SectionContainer>
      <SectionContainer title="New games">
        <div className="cards_wrapper section__gamesCards">
          {!error &&
            games.map(({ rating, gameLogo, gameTitle, gamePrice, gamePlatforms, ageLimit, gameDescription }) => (
              <GameCard
                key={gameTitle}
                rating={rating}
                gameLogo={gameLogo}
                gameTitle={gameTitle}
                gamePrice={gamePrice}
                gamePlatforms={gamePlatforms}
                ageLimit={ageLimit}
                gameDescription={gameDescription}
              />
            ))}
        </div>
      </SectionContainer>
    </>
  );
};
export default HomePage;
