import { Link } from "react-router-dom"
import Button from "../../../shared/ui/Button";

function Header() {
  return (
    <header className="Header">
      <div className="container">
        <div>
          <Link to={"/"}><h1>Mini Blog</h1></Link>
        </div>
        <div>
          <ul className="menu-buttons">
            <li><Link to={"/profile"}>Profile</Link></li>
            <li><Link to={"/login"}><Button variant="outlineBtn" text={"Logout"} style={{marginLeft: "21px"}}/></Link></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header