import "./productsPage.scss";
import { useParams } from "react-router";

const ProductsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <aside className="aside">
      <h3>{category}</h3>
      <div className="aside__sort">
        <h4>Sort</h4>
        <div className="aside__sort__criteria">
          <p>Criteria</p>
          <select>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </div>
        <div className="aside__sort__criteria">
          <p>Type</p>
          <select>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="aside__filter">
        <h4>Genres</h4>
        <form>
          <div className="aside__filter__option">
            <input type="radio" id="all-genres" name="all-genres" checked />
            <label htmlFor="all-genres">All Genres</label>
          </div>
          <div className="aside__filter__option">
            <input type="radio" name="shooter" id="shooter" />
            <label htmlFor="shooter">Shooter</label>
          </div>
          <div className="aside__filter__option">
            <input type="radio" name="arcade" id="arcade" />
            <label htmlFor="arcade">Arcade</label>
          </div>
          <div className="aside__filter__option">
            <input type="radio" name="survive" id="survive" />
            <label htmlFor="survive">Survive</label>
          </div>
        </form>
      </div>
      <div className="aside__filter">
        <h4>Ages</h4>
        <form>
          <div>
            <input type="radio" name="all-ages" id="all-ages" />
            <label htmlFor="all-ages">All Ages</label>
          </div>
          <div>
            <input type="radio" name="3" id="3" />
            <label htmlFor="3">3+</label>
          </div>
          <div>
            <input type="radio" name="6" id="6" />
            <label htmlFor="6">6+</label>
          </div>
          <div>
            <input type="radio" name="12" id="12" />
            <label htmlFor="12">12+</label>
          </div>
          <div>
            <input type="radio" name="18" id="18" />
            <label htmlFor="18">18+</label>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default ProductsPage;
