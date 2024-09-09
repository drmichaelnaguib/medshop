"use client";

import Link from "next/link";
import styles from "./SideBar.module.scss";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
  return (
    <div
      className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${styles.sideBar}`}
    >
      <Link
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4">MedShop</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link
            href="/admin"
            className={`nav-link ${
              pathName === "/admin" ? "active" : ""
            } text-white`}
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            href="/admin/products"
            className={`nav-link ${
              pathName === "/admin/products" ? "active" : ""
            } text-white`}
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#grid" />
            </svg>
            Products
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
