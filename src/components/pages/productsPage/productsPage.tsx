import "./productsPage.scss";
import "react-dropdown/style.css";
import { useParams } from "react-router";
import { lazy, Suspense } from "react";
import { Oval } from "react-loader-spinner";
import SearchBar from "@/elements/searchBar/searchBar";
import FilterSidebar from "./filteSidebar/filterSidebar";

const Games = lazy(() => new Promise((resolve) => setTimeout(resolve, 5000)).then(() => import("./games")));

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <div className="products-wrapper">
      <FilterSidebar category={category} />
      <div>
        <SearchBar placeholder="Search" />
        <Suspense
          fallback={<Oval secondaryColor="black" ariaLabel="Loading..." color="white" width={50} height={50} />}
        >
          <Games category={category} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
