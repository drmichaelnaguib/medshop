import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoIosSearch } from "react-icons/io";
import db from "@/app/firebase/database";
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export default function SearchInput({ setProducts }) {
  // states
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    async function getProducts() {
      const suppliesRef = collection(db, "supplies");
      const q = query(
        suppliesRef,
        where("title", "==", searchKeyword),
        orderBy("title", "asc"),
        limit(3)
      );
      const querySnapshot = await getDocs(q);
      const extractedProducts = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setProducts(extractedProducts);
    }
    getProducts();
  }, [searchKeyword]);

  return (
    <InputGroup size="sm" className="mb-3">
      <InputGroup.Text>
        <IoIosSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        onChange={(event) => {
          setSearchKeyword(event.target.value);
        }}
      />
    </InputGroup>
  );
}
