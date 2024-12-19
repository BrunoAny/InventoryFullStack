import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Landing from "./LandingPage/Landing";
import ProductsPage from "./products/ProductsPage";

function TabSwitcher() {
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          LOG IN
        </button>
        |
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/products")}
        >
          HOME
        </button>
      </nav>
      <Routes>
        <Route path="/login/" element={<Landing />} />
        <Route path="/products/" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default TabSwitcher;
