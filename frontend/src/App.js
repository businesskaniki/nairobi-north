import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Cookies from "js-cookie";
import Nav from "./components/Nav/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";
import NotFound from "./components/NotFound";
import Admin from "./components/Dashboard/Admin";
import PrivateRoute from "./Helpers/PrivateRoutes";
import Home from "./components/Home/Home";
import ProfileSettings from "./components/profile/ProfileSettings";
import Churches from "./components/churches/Churches";
import Ministries from "./components/ministries/Ministries";
import Events from "./components/events/Events";
import Gallery from "./components/sermons/Sermons";
import AdminChurchDetail from "./components/Dashboard/churches/AdminChurchDetail";
import FAQ from "./components/FAQ/Faq";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Content />
        </div>
      </div>
    </Router>
  );
}

function Content() {
  document.title = "Naiobi North East";
  const accessToken = Cookies.get("ac-tok-en");
  const isAuthenticated = accessToken;
  const isAdmin = localStorage.getItem("user");
  const location = useLocation();
  const isDashboardRoute = location.pathname === "/dashboard";

  return (
    <>
      {!isDashboardRoute && <Nav />}
      <div className="Content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" Component={Register} />
          <Route path="/FAQ" Component={FAQ} />
          <Route path="/churches" Component={Churches} />
          <Route path="/login" Component={Login} />
          <Route path="/reset_password" Component={ResetPassword} />
          <Route path="/ministries" Component={Ministries} />
          <Route path="/events" Component={Events} />
          <Route path="/sermons" Component={Gallery} />
          <Route path="/church:detail" Component={<AdminChurchDetail />} />
          <Route path="/reset_password/confirm" Component={ResetPasswordForm} />
          <Route path="/settings/:uuid" element={<ProfileSettings />} />
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
    </>
  );
}

export default App;
