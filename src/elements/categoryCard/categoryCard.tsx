import "./categoryCard.scss";

type CategoryCardProps = { cardLogo: string; cardTitle: string };

const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { cardLogo, cardTitle } = props;

  return (
    <div className="categoryCard">
      <img src={cardLogo} alt="" />
      <h6>{cardTitle}</h6>
    </div>
  );
};

export default CategoryCard;
