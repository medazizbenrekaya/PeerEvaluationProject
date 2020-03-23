import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IndexHeader from "./Headers/IndexHeader";
import DemoFooter from "./Footers/DemoFooter";
import ExamplesNavbar from "./Navbars/ExamplesNavbar";
import {Button, Card, Col, Container, Form, Input, Row} from "reactstrap";

class Test extends Component {
    render() {
        return (
            <div>
                <>
                    <ExamplesNavbar />
                    <div
                        className="page-header"
                        style={{
                            backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
                        }}
                    >

                        <div className="footer register-footer text-center">
                        <DemoFooter/>
                        </div>
                    </div>
                </>

            </div>

        );
    }
}

Test.propTypes = {};

export default Test;
