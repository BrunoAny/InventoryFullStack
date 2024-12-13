import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TabSwitcher from "./components/TabSwitcher";

import "./App.css";

function App() {
  return (
    <div data-bs-theme="dark">
      <div className="App">
        <Header />
        <TabSwitcher />
        <Footer />
      </div>
    </div>
  );
}

export default App;
