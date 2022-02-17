import React, { ChangeEventHandler } from "react";

type Props = {
  category: string;
  onChangeSortCriteria: ChangeEventHandler<HTMLSelectElement>;
  onChangeSortOrder: ChangeEventHandler<HTMLSelectElement>;
  onChangeGenreValue: ChangeEventHandler<HTMLInputElement>;
  onChangeAgeValue: ChangeEventHandler<HTMLInputElement>;
  selectedGenreFilter: string;
  selectedAgeFilter: string;
};

const FilterSidebar: React.FC<Props> = (props) => {
  const {
    category,
    onChangeAgeValue,
    onChangeGenreValue,
    onChangeSortCriteria,
    onChangeSortOrder,
    selectedAgeFilter,
    selectedGenreFilter,
  } = props;

  return (
    <aside className="aside">
      <h3>{category}</h3>
      <div className="aside__sort">
        <h4>Sort</h4>
        <div className="aside__sort__criteria">
          <p>Criteria</p>
          <select onChange={onChangeSortCriteria}>
            <option value="gameTitle">Name</option>
            <option value="rating">Rating</option>
            <option value="gamePrice">Price</option>
          </select>
        </div>
        <div className="aside__sort__criteria">
          <p>Type</p>
          <select onChange={onChangeSortOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="aside__filter">
        <h4>Genres</h4>
        <form>
          {["all", "shooter", "arcade", "survive"].map((genre) => (
            <div key={genre} className="aside__filter__option">
              <input
                type="radio"
                checked={selectedGenreFilter === genre}
                value={genre}
                id={genre}
                onChange={onChangeGenreValue}
                name="genre"
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </form>
      </div>
      <div className="aside__filter">
        <h4>Ages</h4>
        <form>
          {["100", "3", "6", "12", "18"].map((age) => (
            <div key={age}>
              <input
                type="radio"
                onChange={onChangeAgeValue}
                value={age}
                name="age"
                id={age}
                checked={selectedAgeFilter === age}
              />
              <label htmlFor={age}>{age === "100" ? "All" : `${age}+`}</label>
            </div>
          ))}
        </form>
      </div>
    </aside>
  );
};

export default FilterSidebar;
