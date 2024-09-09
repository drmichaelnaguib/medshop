"use client";
import { useEffect, useState } from "react";
import db from "@/app/firebase/database";
import ProductCard from "@/app/components/ui/cards/ProductCard";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
// import { Pagination, Button } from "@nextui-org/pagination";
import Pagination from "react-bootstrap/Pagination";
import SearchInput from "../../components/ui/SearchInput";

export default function Products() {
  // states
  const [products, setProducts] = useState([]);
  console.log(products);

  const [nextProducts, setNextProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  async function getProducts() {
    const firstPage = collection(db, "supplies");
    const firstQ = query(firstPage, orderBy("title", "asc"), limit(2));

    const querySnapshot = await getDocs(firstQ);
    const extractedProducts = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    // console.log(extractedProducts);
    setProducts(extractedProducts);
    const lastDocument = firstPage?.docs?.[firstPage?.docs?.length - 1];

    if (lastDocument) {
      const nextPage = collection(db, "supplies");
      const secondQ = query(
        nextPage,
        orderBy("title", "asc"),
        startAfter(lastDocument),
        limit(2)
      );
      const nextQuerySnapshot = await getDocs(secondQ);

      const nextExtractedProducts = nextQuerySnapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setNextProducts(nextExtractedProducts);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        onClick={paginate.bind(this, number)}
        key={number}
        active={number === currentPage}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <SearchInput setProducts={setProducts} />
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
        {nextProducts.map((nextProduct) => {
          return (
            <ProductCard
              key={nextProduct.id}
              mainImg={nextProduct.image}
              cardTitle={nextProduct.title}
            />
          );
        })}
      </div>
      {/* <div className="my-4 d-flex align-items-center">
        <Pagination
          page={currentPage}
          onChange={setCurrentPage}
          total={10}
          initialPage={1}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() =>
              setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
            }
          >
            Next
          </Button>
        </div>{" "}
        <Pagination
          page={currentPage}
          onChange={setCurrentPage}
          total={10}
          initialPage={1}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="flat"
            color="secondary"
            onPress={() =>
              setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
            }
          >
            Next
          </Button>
        </div>
      </div> */}
      <div className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </div>
    </div>
  );
}
