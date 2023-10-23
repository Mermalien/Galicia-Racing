import "./Header.css";
import logo from "../../images/logo.jpg";
import { Auth } from "../Auth";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo-header">
        <Link to={"/"}>
          <img
            src={logo}
            alt="galicia-racing"
            style={{ width: "250px", height: "230px" }}
          />
        </Link>
      </div>
      <div className="userAuth">
        <Auth />
      </div>
    </header>
  );
};
export default Header;
