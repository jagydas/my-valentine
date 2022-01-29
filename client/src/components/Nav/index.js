import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  UPDATE_CURRENT_CATEGORY
} from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
function Nav() {

  const [state, dispatch] = useStoreContext();
  function resetCategory(){
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: null,
    });
  }
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/" onClick={resetCategory} >
          <span role="img" aria-label="gift bag">💖</span>
          My-Valentine
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
