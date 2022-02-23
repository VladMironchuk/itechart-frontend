import { useEffect, useState } from "react";
import useFetch from "use-http";
import { useSelector } from "react-redux";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard, { Props as GameCardContent } from "@/elements/gameCard/gameCard";
import { FilterState } from "@/redux/slices/filter";

type Props = {
  category: string;
};

const Games: React.FC<Props> = (props) => {
  const { category } = props;

  const selectedAgeFilter = useSelector((state: { filter: FilterState }) => state.filter.selectedAgeFilter);
  const selectedGenreFilter = useSelector((state: { filter: FilterState }) => state.filter.selectedGenreFilter);
  const selectedSortCriteria = useSelector((state: { filter: FilterState }) => state.filter.selectedSortCriteria);
  const selectedSortOrder = useSelector((state: { filter: FilterState }) => state.filter.selectedSortOrder);

  const { get, loading, error } = useFetch();

  const [games, setGames] = useState<GameCardContent["game"][]>([]);

  useEffect(() => {
    get(
      `/api/products?age=${selectedAgeFilter}&genre=${selectedGenreFilter}&criteria=${selectedSortCriteria}&order=${selectedSortOrder}&platform=${category}`
    ).then((data) => {
      setGames(data);
    });
  }, [selectedAgeFilter, selectedGenreFilter, selectedSortCriteria, selectedSortOrder, category]);

  return (
    <SectionContainer title="Products">
      <div className="cards_wrapper section__gamesCards">
        {error && <div>{error.message}</div>}
        {!loading && games.length === 0 && <div>No such products</div>}
        {!error && games.map((game) => <GameCard key={game.gameTitle} game={game} />)}
      </div>
    </SectionContainer>
  );
};

export default Games;
