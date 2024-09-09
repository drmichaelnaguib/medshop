"use client";

import { Container } from "react-bootstrap";
import Header from "../components/public-layout/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <Container className="py-4">{children}</Container>
    </>
  );
}
