"use client";
import Link from "next/link";
import styles from "./page.module.scss";
import ProductsList from "../components/products/ProductsList";
import { isLoggedIn } from "../services/AuthenticationService";

export default function Home() {
  return (
    <main className={styles["homePage"]}>
      <h1 className={styles["homePage-title"]}>MedShop</h1>
      <ProductsList />

      <div className={styles["see-more-container"]}>
        <Link href={`${isLoggedIn() ? "/products" : "/log-in"}`}>
          <p className={styles["see-more-container-text"]}>See More...</p>
        </Link>
      </div>
    </main>
  );
}
