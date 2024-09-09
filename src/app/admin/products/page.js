"use client";
import OverviewTable from "@/app/components/ui/tables/OverviewTable";
import { Badge, Container } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import { useState, useEffect, Fragment } from "react";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import db from "@/app/firebase/database";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import Pagination from "react-bootstrap/Pagination";

// const Person = [
//   {
//     firstName: "tanner",
//     lastName: "linsley",
//     age: 24,
//     visits: 100,
//     status: "In Relationship",
//     progress: 50,
//   },
//   {
//     firstName: "tandy",
//     lastName: "miller",
//     age: 40,
//     visits: 40,
//     status: "Single",
//     progress: 80,
//   },
//   {
//     firstName: "joe",
//     lastName: "dirte",
//     age: 45,
//     visits: 20,
//     status: "Complicated",
//     progress: 10,
//   },
// ];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("title", {
    cell: ({ getValue }) => <div>{getValue()}</div>,
    header: () => <Fragment>Product Name</Fragment>,
  }),
  columnHelper.accessor("image", {
    cell: ({ getValue }) => (
      <Image width={200} height={200} src={getValue()} thumbnail />
    ),
    header: () => <div>Image</div>,
  }),
  columnHelper.accessor("featured", {
    cell: ({ getValue }) => (
      <Badge bg={`${getValue() ? "success" : "danger"}`}>{`${
        getValue() ? "Featured" : "Not featured"
      }`}</Badge>
    ),
    header: () => <Fragment>Featured</Fragment>,
  }),
];

// const columns = [
//   columnHelper.accessor("firstName", {
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor((row) => row.lastName, {
//     id: "lastName",
//     cell: (info) => <i>{info.getValue()}</i>,
//     header: () => <span>Last Name</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("age", {
//     header: () => "Age",
//     cell: (info) => info.renderValue(),
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("visits", {
//     header: () => <span>Visits</span>,
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("status", {
//     header: "Status",
//     footer: (info) => info.column.id,
//   }),
//   columnHelper.accessor("progress", {
//     header: "Profile Progress",
//     footer: (info) => info.column.id,
//   }),
// ];

export default function ManageProductsPage() {
  const [data, setData] = useState([]);
  console.log(data);
  // const [nextProducts, setNextProducts] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);

  // const paginate = (number) => {
  //   setCurrentPage(number);
  // };
  const router = useRouter();

  async function getProducts() {
    const firstPage = collection(db, "supplies");
    const firstQ = query(firstPage, orderBy("title", "asc"));

    const querySnapshot = await getDocs(firstQ);
    const extractedProducts = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    // console.log(extractedProducts);
    setData(extractedProducts);
    // const lastDocument = firstPage?.docs?.[firstPage?.docs?.length - 1];

    // if (lastDocument) {
    //   const nextPage = collection(db, "supplies");
    //   const secondQ = query(
    //     nextPage,
    //     orderBy("title", "asc"),
    //     startAfter(lastDocument),
    //     limit(2)
    //   );
    //   const nextQuerySnapshot = await getDocs(secondQ);

    //   const nextExtractedProducts = nextQuerySnapshot.docs.map((doc) => {
    //     return { ...doc.data(), id: doc.id };
    //   });
    //   setNextProducts(nextExtractedProducts);
    // }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // let items = [];
  // for (let number = 1; number <= 5; number++) {
  //   items.push(
  //     <Pagination.Item
  //       onClick={paginate.bind(this, number)}
  //       key={number}
  //       active={number === currentPage}
  //     >
  //       {number}
  //     </Pagination.Item>
  //   );
  // }

  return (
    <OverviewTable
      data={data}
      columns={columns}
      onAddNewResource={() => {
        router.push("/admin/products/create");
      }}
    />
  );
}
