import React, {Component} from 'react';
import DemoFooter from "./Footers/DemoFooter";
import ExamplesNavbar from "./Navbars/ExamplesNavbar";

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
