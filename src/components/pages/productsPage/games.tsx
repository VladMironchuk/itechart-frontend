import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard from "@/elements/gameCard/gameCard";
import { FilterState } from "@/redux/slices/filter";
import { GamesState } from "@/redux/slices/games";

const filterGames = (
  age: string,
  genre: string,
  criteria: string,
  order: string,
  platform: string,
  allGames: GamesState["games"]
) => {
  const games = [...allGames]
    .filter((game) => game.gamePlatforms.includes(platform))
    .filter((game) => game.ageLimit <= +(age as string))
    .filter((game) => (genre !== "all" ? game.genre === genre : game));
  switch (criteria) {
    case "rating":
      games.sort((firstGame, secondGame) => firstGame.rating - secondGame.rating);
      break;
    case "gamePrice":
      games.sort((firstGame, secondGame) => firstGame.gamePrice - secondGame.gamePrice);
      break;
    default:
      games.sort((firstGame, secondGame) => {
        if (firstGame.gameTitle < secondGame.gameTitle) {
          return -1;
        }
        if (firstGame.gameTitle > secondGame.gameTitle) {
          return 1;
        }
        return 0;
      });
  }
  if (order === "desc") {
    games.reverse();
  }
  return games;
};

type Props = {
  category: string;
};

const Games: React.FC<Props> = (props) => {
  const { category } = props;

  const allGames = useSelector((state: { products: GamesState }) => state.products.games);

  const selectedAgeFilter = useSelector((state: { filter: FilterState }) => state.filter.selectedAgeFilter);
  const selectedGenreFilter = useSelector((state: { filter: FilterState }) => state.filter.selectedGenreFilter);
  const selectedSortCriteria = useSelector((state: { filter: FilterState }) => state.filter.selectedSortCriteria);
  const selectedSortOrder = useSelector((state: { filter: FilterState }) => state.filter.selectedSortOrder);

  const [games, setGames] = useState<GamesState["games"]>([]);

  useEffect(() => {
    setGames(
      filterGames(selectedAgeFilter, selectedGenreFilter, selectedSortCriteria, selectedSortOrder, category, allGames)
    );
  }, [selectedAgeFilter, selectedGenreFilter, selectedSortCriteria, selectedSortOrder, category, allGames]);

  return (
    <SectionContainer title="Products">
      <div className="cards_wrapper section__gamesCards">
        {games.length === 0 && <div>No such products</div>}
        {games.map((game) => (
          <GameCard key={game.gameTitle} game={game} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default Games;
