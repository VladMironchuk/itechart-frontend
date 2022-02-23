import React, { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, FilterState } from "@/redux/slices/filter";
import SortFilter from "./sortFilter";
import FilterCriteria from "./filterCriteria";

type Props = {
  category: string;
};

const FilterSidebar: React.FC<Props> = (props) => {
  const { category } = props;

  const selectedGenreFilter = useSelector((state: { filter: FilterState }) => state.filter.selectedGenreFilter);
  const selectedAgeFilter = useSelector((state: { filter: FilterState }) => state.filter.selectedAgeFilter);

  const dispatch = useDispatch();

  const onChangeGenreValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(filterActions.changeGenreValue({ genre: event.target.value }));
  };

  const onChangeAgeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch(filterActions.changeAgeValue({ age: event.target.value }));
  };

  return (
    <aside className="aside">
      <h3>{category}</h3>
      <SortFilter />
      <div className="aside__filter">
        <h4>Genres</h4>
        <form>
          {["all", "shooter", "arcade", "survive"].map((genre) => (
            <div key={genre} className="aside__filter__option">
              <FilterCriteria
                filterCriteria="genre"
                filterCriteriaItem={genre}
                onChange={onChangeGenreValue}
                checkedCondition={selectedGenreFilter}
              >
                {genre === "all" ? "all genres" : genre}
              </FilterCriteria>
            </div>
          ))}
        </form>
      </div>
      <div className="aside__filter">
        <h4>Ages</h4>
        <form>
          {["100", "3", "6", "12", "18"].map((age) => (
            <div key={age}>
              <FilterCriteria
                filterCriteria="age"
                filterCriteriaItem={age}
                onChange={onChangeAgeValue}
                checkedCondition={selectedAgeFilter}
              >
                {age === "100" ? "All ages" : `${age}+`}
              </FilterCriteria>
            </div>
          ))}
        </form>
      </div>
    </aside>
  );
};

export default FilterSidebar;
