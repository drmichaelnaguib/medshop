"useClient";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaClinicMedical } from "react-icons/fa";
import Slider from "../ui/Slider";
import { isLoggedIn } from "@/app/services/AuthenticationService";
import { usePathname } from "next/navigation";
import styles from "./NavBar.module.scss";
import Link from "next/link";

function NavBar() {
  const pathname = usePathname();

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container className="d-flex justify-content-between">
        <div className="d-flex align-items-center jutsify-content-center">
          <Link href={"/"} className={styles["home-link"]}>
            <FaClinicMedical color="white" size="17" />
            <Navbar.Brand href="#home">MedShop</Navbar.Brand>
          </Link>
        </div>
        <Slider className="ms-3" />

        <Nav>
          <Nav.Link href="/" className={pathname === "/" ? styles.active : ""}>
            Home
          </Nav.Link>
          {!isLoggedIn() && (
            <Nav.Link
              href="/log-in"
              className={pathname === "/log-in" ? styles.active : ""}
            >
              Log In
            </Nav.Link>
          )}
          <Nav.Link
            href="/cart"
            className={pathname === "/cart" ? styles.active : ""}
          >
            Cart
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default NavBar;
