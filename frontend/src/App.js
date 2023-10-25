import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  document.title = "naiobi north east";
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="Content">
          <Routes>
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
          </Routes>
          {/* we want to protect these routes */}
        </div>
      </div>
    </Router>
  );
}

export default App;
