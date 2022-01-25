import { useParams } from "react-router";

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return <h2>Category: {category}</h2>;
};

export default ProductsPage;
