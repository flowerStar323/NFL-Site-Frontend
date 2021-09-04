import React, { Component } from 'react';
import { Row, Col, Input, Button, notification } from "antd";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ServerURL } from 'src/config/port';
class register extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            name: "",
            password: "",
            repassword: ""
        }
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    register = () => {
        console.log("eee");
        const { email, name, password, repassword } = this.state;
        if (password !== repassword) {
            notification.warning({
                message: "Warning!",
                description: "repassword is incorrect."
            });
            return;
        }
        axios.post(`${ServerURL}/register`, { email, name, password }).then(e => {
            if (e) {
                notification.success({
                    message: "Success",
                    description: "Register Successful"
                }); this.props.history.push("/login");
            }
        }).catch(err => notification.warning({ message: "Warning!", description: err.response.data }))
    }
    render() {
        return (
            <Row>
                <Col span={8}>
                    name:<Input name="name" required value={this.state.name} onChange={(e) => this.onChange(e)} />
                    email:<Input name="email" required type="email" value={this.state.email} onChange={(e) => this.onChange(e)} />
                    password:<Input type="password" required name="password" value={this.state.password} onChange={(e) => this.onChange(e)} />
                    confirm password:<Input type="password" required name="repassword" value={this.state.repassword} onChange={(e) => this.onChange(e)} />

                    <Button type="primary" onClick={() => this.register()}>register</Button>
                    <Link to="/login"><Button type="primary">go to login</Button></Link>
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

export default register;