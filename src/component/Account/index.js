import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
const jwt = require("jsonwebtoken");

class index extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            countANDpay: []
        }
    }
    componentDidMount() {
        var tokeninfor = jwt.decode(localStorage.getItem("token"));
        console.log(tokeninfor);
        this.setState({
            name: tokeninfor.name,
            email: tokeninfor.email,
            password: tokeninfor.pass,
            countANDpay: tokeninfor.countANDpay
        });
    }

    render() {
        const { name, email, password, countANDpay } = this.state;
        return (
            <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card style={{ minWidth: "95%", minHeight: "95%", maxWidth: "95%", maxHeight: "95%", borderRadius: "20px", boxShadow: "5px 5px 5px grey" }}
                    title={<div style={{ fontWeight: "bold" }}>My Account</div>}
                >
                    <table>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>name : {name}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>email : {email}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>password : {password}</td>
                        </tr>
                    </table>
                    <br /><br />
                    <hr />
                    <hr />
                    <h5>Donation History</h5>
                    <table>
                        {
                            countANDpay.map((v, k) => <tr>
                                <td style={{ fontWeight: "bold" }}>${v.pay} - {v.count} Entries</td>
                            </tr>
                            )
                        }
                    </table>
                </Card>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {

    };
};
export default connect(
    mapStateToProps,
)(index);