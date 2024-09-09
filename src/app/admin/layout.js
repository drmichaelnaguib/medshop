"use client";
import styles from "./layout.module.scss";
import SideBar from "../components/admin-layout/SideBar";
// import { Container } from "react-bootstrap";

export default function RootLayout({ children }) {
  return (
    <>
      <SideBar />
      <div className={styles["page-content"]}>{children}</div>
    </>
  );
}
