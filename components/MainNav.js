import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { searchHistoryAtom } from "../store";
import { useAtom } from "jotai";

export default function NavScrollExample() {
  const [searchField, setSearchField] = useState("");
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  function searchHandler(e) {
    // prevent the browser from submitting the form automatically
    e.preventDefault();
    setIsExpanded(false);
    // clear the search field after submitting
    setSearchField("");
    // add the search query to the search history
    setSearchHistory((current) => [...current, `title=true&q=${searchField}`]);
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  function changeExpandValue() {
    setIsExpanded(!isExpanded);
  }

  function handleNavLink() {
    setIsExpanded(false);
  }

  return (
    <>
      <Navbar
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-dark bg-dark"
      >
        <Container fluid>
          <Navbar.Brand>Christian Daryl Curay</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={changeExpandValue}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link href="/" legacyBehavior passHref>
                <Nav.Link
                  onClick={handleNavLink}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              <Link href="/search" legacyBehavior passHref>
                <Nav.Link
                  onClick={handleNavLink}
                  active={router.pathname === "/search"}
                >
                  Advanced Search
                </Nav.Link>
              </Link>
            </Nav>
            &nbsp;
            <Form className="d-flex" onSubmit={searchHandler}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                name="q"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
            &nbsp;
            <Nav>
              {" "}
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <Link href="/favourites" legacyBehavior passHref>
                  <NavDropdown.Item
                    onClick={handleNavLink}
                    active={router.pathname === "/favourites"}
                  >
                    Favorites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" legacyBehavior passHref>
                  <NavDropdown.Item
                    onClick={handleNavLink}
                    active={router.pathname === "/history"}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>
      <br></br>
    </>
  );
}
