import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Menu, Button } from "antd";
import Users from './Users';
import Match from './Match';
import Entries from './Entries';
class index extends Component {
    constructor() {
        super();
        this.state = {
            leftMenucheck: 0
        }
    }
    menuClick = (e) => {
        console.log(e);
        if (e.key == "0") this.setState({ leftMenucheck: 0 });
        else if (e.key == "1") this.setState({ leftMenucheck: 1 });
        else if (e.key == "2") this.setState({ leftMenucheck: 2 });
    }
    render() {
        const { leftMenucheck } = this.state;
        let right;
        if (leftMenucheck == 0) {
            right = <Match />;
        } else if (leftMenucheck == 1) {
            right = <Users />;
        }
        return (
            <div>
                <Row>
                    <Col span={5}>
                        <Menu style={{ height: "89vh" }} onClick={this.menuClick}>
                            <Menu.Item key="0">Match</Menu.Item>
                            <Menu.Item key="1">Users</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={19}>
                        {right}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default index;