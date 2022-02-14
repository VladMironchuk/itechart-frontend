import "./categoryCard.scss";

type Props = { cardLogo: string; cardTitle: string };

const CategoryCard: React.FC<Props> = (props) => {
  const { cardLogo, cardTitle } = props;

  return (
    <div className="categoryCard">
      <img src={cardLogo} alt="logo" />
      <h6>{cardTitle}</h6>
    </div>
  );
};

export default CategoryCard;
