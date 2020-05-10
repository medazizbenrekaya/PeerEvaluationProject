/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,{Component} from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";
import jwt_decode from "jwt-decode";

// reactstrap components
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container, Button,
    Modal
} from "reactstrap";

function NavbarProfile() {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [navbarCollapse, setNavbarCollapse] = React.useState(false);
    const [loginModal, setLoginModal] = React.useState(false);

    const toggleNavbarCollapse = () => {
        setNavbarCollapse(!navbarCollapse);
        document.documentElement.classList.toggle("nav-open");
    };
    const logout=()=>{
        localStorage.clear()
        console.log(localStorage)

    }
    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 0 ||
                document.body.scrollTop > 0
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 0||
                document.body.scrollTop < 0
            ) {
                setNavbarColor("navbar-transparent");
            }
        };

        window.addEventListener("scroll", updateNavbarColor);

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    return (
        <Navbar
            className={classnames("fixed-top", navbarColor)}
            color-on-scroll="300"
            expand="lg"
        >
            <Container>
                <div className="navbar-translate">
                    <NavbarBrand
                        data-placement="bottom"
                        to="/index"
                        target="_blank"
                        title="Coded by Creative Tim"
                        tag={Link}
                        onClick={logout}
                    >

                            Peer Evaluation

                    </NavbarBrand>
                    <button
                        aria-expanded={navbarCollapse}
                        className={classnames("navbar-toggler navbar-toggler", {
                            toggled: navbarCollapse
                        })}
                    >
                        <span className="navbar-toggler-bar bar1" />
                        <span className="navbar-toggler-bar bar2" />
                        <span className="navbar-toggler-bar bar3" />
                    </button>
                </div>
                <Collapse
                    className="justify-content-end"
                    navbar
                    isOpen={navbarCollapse}
                >
                    <Nav navbar>
                        <NavItem >
                            <NavLink
                                     onClick={() => setLoginModal(true)}>
                                <div className="btn btn-danger btn-lg btn-sm">
                                <i className="nc-icon nc-layout-11" /> Logout <br/>
                              {jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom}</div>
                            </NavLink>
                            <Modal
                                isOpen={loginModal}
                                toggle={() => setLoginModal(false)}
                                modalClassName="modal-register"
                            >
                                <div className="modal-header no-border-header text-center">
                                    <button
                                        aria-label="Close"
                                        className="close"
                                        data-dismiss="modal"
                                        type="button"
                                        onClick={() => setLoginModal(false)}
                                    >
                                        <span aria-hidden={true}>×</span>
                                    </button>
                                    <p>{jwt_decode(localStorage.token).user.nom} {jwt_decode(localStorage.token).user.prenom} Are you sure to logout ?</p>
                                </div>
                                <div className="modal-body">
                                    <Button block className="btn-outline-danger" color="default" onClick={logout} to="/index" tag={Link}>
                                        Logout
                                    </Button>
                                </div>
                            </Modal>
                        </NavItem>





                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarProfile;
