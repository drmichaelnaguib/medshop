"use client";
import ProductCard from "@/app/components/ui/cards/ProductCard";
import {
  collection,
  getDocs,
  where,
  orderBy,
  limit,
  query,
} from "firebase/firestore";
import db from "@/app/firebase/database";
import { useEffect, useState } from "react";

export default function ProductsList() {
  // states
  const [products, setProducts] = useState([]);
  console.log(products);

  async function getProducts() {
    // const querySnapshot = await getDocs(collection(db, "supplies"));
    // const extractedProducts = querySnapshot.docs.map((doc) => {
    //   return { ...doc.data(), id: doc.id };
    // });
    // setProducts(extractedProducts);
    const suppliesRef = collection(db, "supplies");
    const q = query(
      suppliesRef,
      where("featured", "==", true),
      orderBy("title", "asc"),
      limit(3)
    );
    const querySnapshot = await getDocs(q);
    const extractedProducts = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setProducts(extractedProducts);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="list-container">
      {products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            mainImg={product.image}
            cardTitle={product.title}
          />
        );
      })}
    </div>
  );
}
