import { useState } from "react";
import Landing from "./LandingPage/Landing";
import ProductsPage from "./products/ProductsPage";

function TabSwitcher() {
  const [activeTab, setActiveTab] = useState("Landing");

  return (
    <div>
      {activeTab !== "Landing" && <nav>
        <button className="btn btn-secondary" onClick={() => setActiveTab("Landing")}>LOG IN</button>
        | 
        <button className="btn btn-secondary" onClick={() => setActiveTab("Products")}>HOME</button>
      </nav>}
      {activeTab === "Landing" && <Landing/>}
      {activeTab === "Products" && <ProductsPage />}
    </div>
  );
}

export default TabSwitcher;
