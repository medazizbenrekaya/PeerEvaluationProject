import React, {Component} from 'react';
import {Button, Form, Input} from "reactstrap";

class Reset extends Component {
    render() {
        return (
            <Form className="register-form">
                <label>Email</label>
                <Input placeholder="password" type="text" id="login" />
                <label>Password</label>
                <Input placeholder="Password" type="password" id="password" />
                <Button block className="btn-round" color="danger" onClick={this.login.bind(this)}>
                    Login
                </Button>
                <div className="forgot">
                    <Button
                        className="btn-round" color="danger" onClick={this.forgot.bind(this)}>
                        Forgot password?
                    </Button>
                </div>
            </Form>
        );
    }
}

export default Reset;
