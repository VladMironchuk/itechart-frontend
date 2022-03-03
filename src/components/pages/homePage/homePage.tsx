import "./homePage.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryCard from "@/elements/categoryCard/categoryCard";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard from "@/elements/gameCard/gameCard";
import SearchBar from "@/elements/searchBar/searchBar";
import windowsLogo from "../../../assets/images/icone-windows-gris.png";
import psLogo from "../../../assets/images/ps.png";
import xboxLogo from "../../../assets/images/xbox.png";
import { GamesState } from "@/redux/slices/games";

const getThreeNewGames = (games: GamesState["games"]) =>
  [...games].sort((firstGame, secondGame) => secondGame.date - firstGame.date).slice(0, 3);

const HomePage: React.FC = () => {
  const games = useSelector((state: { products: GamesState }) => state.products.games);
  const threeNewGames = getThreeNewGames(games);

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
          {threeNewGames.map((game) => (
            <GameCard key={game.gameTitle} game={game} />
          ))}
        </div>
      </SectionContainer>
    </>
  );
};
export default HomePage;
