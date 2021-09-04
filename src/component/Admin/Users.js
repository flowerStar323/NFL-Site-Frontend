import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Table, Modal, notification, Input } from "antd";
import axios from 'axios';
import { ServerURL } from "../../config/port";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
class Users extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            visible: false,
            editID: "",
            email: "",
            name: ""
        };
        this.columns = [
            {
                title: "Email",
                dataIndex: "email",
                width: "15%",
                align: "center"
            }, {
                title: "Name",
                width: "15%",
                dataIndex: "name",
                align: "center"
            }, {
                title: "Entries Count",
                width: "20%",
                dataIndex: "count",
                align: "center"
            }, {
                width: "20%",
                title: "Payment",
                dataIndex: "payment",
                align: "center"
            }, {
                title: "Status",
                dataIndex: "Status",
                width: "20%",
                align: "center",
                render: (text, record) => {
                    return <Button.Group>
                        <Button type="primary" onClick={() => this.editModal(record)} style={{ borderRadius: "10px 0 0 10px" }}><i className="fa fa-edit" /></Button>
                        <Button type="dashed" onClick={() => this.showDelModal(record.id, "sus")}><i className="fa fa-lock" style={{ color: "black" }} /></Button>
                        <Button type="danger" onClick={() => this.showDelModal(record.id, "del")} style={{ borderRadius: "0 10px 10px 0" }}><i className="fa fa-trash" /></Button>
                    </Button.Group>
                }
            }
        ];
    }
    editModal = (record) => {
        this.setState({ visible: true, editID: record.id, name: record.name, email: record.email });
    }
    handleCancel = () => {
        this.setState({ visible: false })
    }
    handleOk = () => {
        const { email, name, editID } = this.state;
        axios.post(`${ServerURL}/editUsers`, { id: editID, email, name }).then(e => {
            if (e) {
                notification.success({
                    message: "Success",
                    description: "Edit Successful"
                }); this.componentWillMount();
            }
        })
        this.setState({ visible: false })
    }
    onEditChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    showDelModal = (id, flag) => {
        const { Del } = this;
        confirm({
            title: flag === "del" ? 'Are you sure delete this item?' : 'Are you sure suspend this item?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                Del(id, flag);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    Del = (id, flag) => {
        axios.post(`${ServerURL}/delUsers`, { id, flag })
            .then(e => {
                if (e) {
                    notification.success({
                        message: "Success",
                        description: flag === "del" ? "Delete Successful" : "Suspend Successful"
                    });
                    this.componentWillMount();
                }
            }).catch(err => console.log(err));
    }
    componentWillMount() {
        axios.get(`${ServerURL}/getUsers`)
            .then(e => {
                var showdata = e.data.filter((v) => v.status === 0)
                var data = showdata.map((v, k) => {
                    var pay = "", count = 0;
                    if (v.countANDpay.length === 0) {
                        pay = "$0";
                        count = 1;
                    }
                    else {
                        v.countANDpay.map((v1, k1) => {
                            pay += v1.pay;
                            count += v1.count;
                        });
                    }
                    return {
                        id: v._id,
                        email: v.email,
                        name: v.name,
                        payment: pay,
                        count
                    }
                });
                this.setState({ data });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card style={{ width: "95%", height: "95%", borderRadius: "20px", boxShadow: "5px 5px 5px grey" }}
                >
                    <h2 style={{
                        textAlign: "center",
                        textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em darkblue",
                        color: "white", fontSize: "30px"
                    }}>Users</h2>
                    <Table bordered pagination={false} dataSource={this.state.data} columns={this.columns} />
                </Card>
                <Modal title="User Edit" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <div>
                        <div style={{ fontWeight: "bold" }}>Email:</div>
                        <div><Input style={{ borderRadius: "10px", marginTop: "5px" }} name="email" onChange={(e) => this.onEditChange(e)} value={this.state.email} /></div>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <div style={{ fontWeight: "bold" }}>Name:</div>
                        <div><Input style={{ borderRadius: "10px", marginTop: "5px" }} name="name" onChange={(e) => this.onEditChange(e)} value={this.state.name} /></div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Users;