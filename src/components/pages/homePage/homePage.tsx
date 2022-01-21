import "./homePage.scss";
import { useEffect, useState } from "react";
import CategoryCard from "@/elements/categoryCard/categoryCard";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard from "@/elements/gameCard/gameCard";
import SearchBar from "@/elements/searchBar/searchBar";
import useHttp from "@/helpers/useHttp";
import windowsLogo from "../../../assets/images/icone-windows-gris.png";
import psLogo from "../../../assets/images/ps.png";
import xboxLogo from "../../../assets/images/xbox.png";
import owerwatchLogo from "../../../assets/images/overwatch.jpg";
import minecraftLogo from "../../../assets/images/mine.jpg";
import terrariaLogo from "../../../assets/images/terraria.jpg";

const HomePage: React.FC = () => {
  const [{ games }, setGames] = useState<{ games: unknown[] }>({ games: [] });

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
          <GameCard
            ageLimit={12}
            rating={5}
            gameLogo={owerwatchLogo}
            gameTitle="Owerwatch"
            gamePrice={23.99}
            gamePlatforms={[windowsLogo]}
            gameDescription="Overwatch is a 2016 team-based multiplayer first-person shooter game developed and published by Blizzard Entertainment. Described as a 'hero shooter', Overwatch assigns players into two teams of six, with each player selecting from a large roster of characters, known as 'heroes', with unique abilities."
          />
          <GameCard
            rating={5}
            gameLogo={minecraftLogo}
            gameTitle="Minecraft"
            gamePrice={25.99}
            gamePlatforms={[windowsLogo, psLogo, xboxLogo]}
            ageLimit={6}
            gameDescription="Minecraft is a video game in which players create and break apart various kinds of blocks in three-dimensional worlds. The game`s two main modes are Survival and Creative. In Survival, players must find their own building supplies and food. In Creative, players are given supplies and do not have to eat to survive."
          />
          <GameCard
            rating={5}
            gameLogo={terrariaLogo}
            gameTitle="Terraria"
            gamePrice={4.99}
            gamePlatforms={[windowsLogo, psLogo, xboxLogo]}
            ageLimit={3}
            gameDescription="Terraria is a 2D sandbox game with gameplay that revolves around exploration, building, crafting, combat, survival, and mining, playable in both single-player and multiplayer modes. The game is noted for its classic exploration-adventure style of gameplay, similar to games such as the Metroid series and Minecraft."
          />
          {/* {!error && games.map(({ rating, gameLogo, gameTitle, gamePrice, gamePlatforms, ageLimit, gameDescription }) => (
            <GameCard
              rating={rating}
              gameLogo={gameLogo}
              gameTitle={gameTitle}
              gamePrice={gamePrice}
              gamePlatforms={gamePlatforms}
              ageLimit={ageLimit}
              gameDescription={gameDescription}
            />
          ))} */}
        </div>
      </SectionContainer>
    </>
  );
};

export default HomePage;
