import { ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "@/redux/slices/filter";

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

export default SortFilter;
