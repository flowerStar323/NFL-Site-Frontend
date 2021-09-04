import React, { Component } from 'react';
import { Row, Col, Input, Button, notification } from "antd";
import { Logsuccess, Logout } from "../../actions";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';
class login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    send = () => {
        const { email, password } = this.state;
        this.props.Logsuccess(email, password, this.props.history);
    }
    render() {
        return (
            <Row>
                <Col span={8}>
                    email:<Input name="email" required value={this.state.email} onChange={(e) => this.onChange(e)} />
                    password:<Input type="password" required name="password" value={this.state.password} onChange={(e) => this.onChange(e)} />
                    <Button type="primary" onClick={() => this.send()}>login</Button>
                    <Link to="/register"><Button type="primary">go to register</Button></Link>
                </Col>
                <Col span={16}>
                    <div style={{ background: "lightgreen", height: "90vh" }}>
                        slide
                    </div>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
export default connect(mapStateToProps, { Logout, Logsuccess })(login);
