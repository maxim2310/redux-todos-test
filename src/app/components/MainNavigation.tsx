import classNames from "classnames";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const MainNavigation = () => {
  const [id, setId] = useState(1)

  return (
    <div className="tabs">
      <ul>
        <li onClick={() => setId(1)} className={classNames("navbar__item", {'is-active': id === 1})}>
          <NavLink  to="/">
            Home
          </NavLink>
        </li>
        <li onClick={() => setId(2)} className={classNames("navbar__item", {'is-active': id === 2})}>
        <NavLink  to="/todos">
          Todo List
        </NavLink>
        </li>
        <li onClick={() => setId(3)} className={classNames("navbar__item", {'is-active': id === 3})}>
        <NavLink  to="/photos">
          Photos
        </NavLink>
        </li>
      </ul>
    </div>
  )
}