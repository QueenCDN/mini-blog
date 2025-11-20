import { Link } from "react-router-dom"

function Header() {
  return (
    <div style={{display: "flex", justifyContent: "space-around"}} >
        <h1>Mini Blog</h1>
        <div>
            <ul style={{display: "flex",}}>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/login"}>Login</Link></li>
                <li><Link to={"/profile"}>Profile</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Header