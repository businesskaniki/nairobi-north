import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./components/Nav/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";
import NotFound from "./components/NotFound";
import Admin from "./components/Dashboard/Admin";
import PrivateRoute from "./components/Auth/PrivateRoutes";
import Home from "./components/Home/Home";

function App() {
  document.title = "naiobi north east";

  const accessToken = Cookies.get("ac-tok-en");
  const isAuthenticated = accessToken;
  const isAdmin = localStorage.getItem("role");
  return (
    <Router>
      <div className="App">
        <Nav />
        <div className="Content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
            <Route path="/reset_password" Component={ResetPassword} />
            <Route
              path="/reset_password/confirm"
              Component={ResetPasswordForm}
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  isAdmin={isAdmin}
                  child={<Admin />}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
