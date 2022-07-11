import React from "react";
import { Link } from "react-router-dom";
import { BRANCHES, COMMITS, NEW_PR, PULL_REQUESTS } from "../../routes";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/branches">Git</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={BRANCHES}>Branches</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={COMMITS}>Commits</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={PULL_REQUESTS}>Pull Requests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={NEW_PR}>New PR</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default NavBar;