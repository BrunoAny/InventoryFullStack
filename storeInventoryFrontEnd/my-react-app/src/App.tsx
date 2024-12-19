import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import Header from "./components/Header";
import Footer from "./components/Footer";
import TabSwitcher from "./components/TabSwitcher";

import "./App.css";

function App() {
  return (
    <Router>
      <div data-bs-theme="dark">
        <div className="App">
          <Header />
          <TabSwitcher />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
