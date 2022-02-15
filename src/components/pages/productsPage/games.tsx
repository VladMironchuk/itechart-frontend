import { useEffect, useState } from "react";
import useFetch from "use-http";
import SectionContainer from "@/elements/sectionContainer/sectionContainer";
import GameCard, { Props as GameCardContent } from "@/elements/gameCard/gameCard";

type Props = {
  selectedAgeFilter: string;
  selectedGenreFilter: string;
  selectedSortCriteria: string;
  selectedSortOrder: string;
  category: string;
};

const Games: React.FC<Props> = (props) => {
  const { selectedAgeFilter, selectedGenreFilter, selectedSortCriteria, selectedSortOrder, category } = props;

  const { get, loading, error } = useFetch();
  const [games, setGames] = useState<GameCardContent[]>([]);

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
  );
};

export default Games;
