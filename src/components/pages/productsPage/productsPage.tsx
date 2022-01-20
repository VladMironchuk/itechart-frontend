import "./productsPage.scss";
import "react-dropdown/style.css";
import "./productsPage.scss";
import { useParams } from "react-router";

export const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return <h2>Category: {category}</h2>;
};
