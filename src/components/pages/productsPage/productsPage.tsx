import "./productsPage.scss";
import "react-dropdown/style.css";
import { useParams } from "react-router";
import { lazy, Suspense, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useSelector } from "react-redux";
import SearchBar from "@/elements/searchBar/searchBar";
import FilterSidebar from "./filteSidebar/filterSidebar";
import { userState } from "@/redux/slices/user";
import CreateGameModal from "@/elements/modal/createGameModal";
import Button from "@/elements/button/button";

const Games = lazy(() => new Promise((resolve) => setTimeout(resolve, 500)).then(() => import("./games")));

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  const userIsLogged = useSelector((state: { user: userState }) => state.user.userIsAdmin);

  const [isCreateGameModalVisible, setIsCreateGameModalVisible] = useState(false);

  return (
    <>
      {isCreateGameModalVisible && (
        <CreateGameModal
          onClose={() => {
            setIsCreateGameModalVisible(false);
          }}
        />
      )}
      <div className="products-wrapper">
        <FilterSidebar category={category} />
        <div>
          <div style={{ display: "flex" }}>
            <SearchBar placeholder="Search" />
            {userIsLogged && (
              <Button
                onClick={() => {
                  setIsCreateGameModalVisible(true);
                }}
                title="Create game"
              />
            )}
          </div>
          <Suspense
            fallback={<Oval secondaryColor="black" ariaLabel="Loading..." color="white" width={50} height={50} />}
          >
            <Games category={category} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
