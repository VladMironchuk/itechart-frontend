import React, { ChangeEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions, FilterState } from "@/redux/slices/filter";

type Props = {
  category: string;
};

type FilterCriteriaProps = {
  filterCriteria: string;
  filterCriteriaItem: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checkedCondition: string;
};

const SortFilter: React.FC = () => {
  const dispatch = useDispatch();

  const onChangeSortCriteria: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(filterActions.changeSortCriteria({ sortCriteria: event.target.value }));
  };

  const onChangeSortOrder: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(filterActions.changeSortOrder({ sortOrder: event.target.value }));
  };

  return (
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
  );
};

const FilterCriteria: React.FC<FilterCriteriaProps> = (props) => {
  const { filterCriteria, filterCriteriaItem, onChange, checkedCondition, children } = props;
  return (
    <label htmlFor={filterCriteriaItem}>
      <input
        style={{ marginRight: "5px" }}
        type="radio"
        checked={checkedCondition === filterCriteriaItem}
        value={filterCriteriaItem}
        id={filterCriteriaItem}
        onChange={onChange}
        name={filterCriteria}
      />
      {children}
    </label>
  );
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
