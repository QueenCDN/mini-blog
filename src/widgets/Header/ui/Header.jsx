import { Link } from "react-router-dom"
import Button from "../../../shared/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth } from "../../../features/auth/model/selectors";
import { logout } from "../../../features/auth/model/slice";

function Header() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="Header">
      <div className="container">
        <div>
          <Link to={"/"}><h1>Mini Blog</h1></Link>
        </div>
        <div>
          <ul className="menu-buttons">
            {isAuth ? (
              <>
                <li><Link to={"/profile"}>Profile</Link></li>
                <li>
                  <Button
                    variant="outlineBtn"
                    text={"Logout"}
                    style={{ marginLeft: "21px" }}
                    onClick={handleLogout}
                  />
                </li>
              </>
            ) : (
              <li>
                <Link to={"/login"}>
                  <Button
                    variant="fillBtn"
                    text={"Login"}
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header