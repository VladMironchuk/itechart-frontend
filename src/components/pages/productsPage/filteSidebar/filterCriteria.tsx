import { ChangeEventHandler } from "react";

type FilterCriteriaProps = {
  filterCriteria: string;
  filterCriteriaItem: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  checkedCondition: string;
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

export default FilterCriteria;
