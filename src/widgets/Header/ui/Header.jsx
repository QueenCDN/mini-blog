import { Link } from "react-router-dom"

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
            <li><button className="login-button"><Link to={"/login"}>Logout</Link></button></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header