import "./categoryCard.scss";

const CategoryCard: React.FC<{ cardLogo: string; cardTitle: string }> = ({ cardLogo, cardTitle }) => (
  <div className="categoryCard">
    <img src={cardLogo} alt="" />
    <h6>{cardTitle}</h6>
  </div>
);

export default CategoryCard;
