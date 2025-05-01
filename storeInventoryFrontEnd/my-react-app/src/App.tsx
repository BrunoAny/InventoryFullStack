import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import TabSwitcher from "./components/TabSwitcher";
import { ProductProvider } from "./context/ProductContext";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <ProductProvider>
        <div data-bs-theme="dark">
          <div className="App">
            <Header />
            {/* <TabSwitcher /> */}
            <ProductsPage />
            <Footer />
          </div>
        </div>
      </ProductProvider>
    </Router>
  );
}

export default App;
