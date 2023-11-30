import "./index.css";
import PropTypes from "prop-types";
import { Route, Routes, Navigate } from "react-router-dom";
import HeaderComponent from "./components/Header/HeaderComponent";
import { LoginPage } from "./pages/loginPage/loginPage";
import { PrincipalPage } from "./components/PrincipalPage/PrincipalPage";
import FooterComponent from "./components/Footer/FooterComponent";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { CreateEvent } from "./components/CreateEvent/CreateEvent";
import { UserPage } from "./pages/UserPage/UserPage";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { SingleEventPage } from "./pages/EventPage/SingleEventPage";
import { Searcher } from "./components/Searcher/Searcher";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/" />;

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  setTimeout(() => {
    document.getElementById("app").classList.add("show");
  }, 500);
  return (
    <>
      <div className="app" id="app">
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<PrincipalPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createEvent" element={<CreateEvent />} />
          <Route path="/events/:eventId" element={<SingleEventPage />} />
          <Route path="/events/filterByCity/:city" element={<Searcher />} />
          <Route path="/events/filterByTheme/:theme" element={<Searcher />} />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <FooterComponent />
      </div>
    </>
  );
};

export default App;
