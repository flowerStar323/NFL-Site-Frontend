import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Menu, Button, Select, notification } from "antd";
import axios from 'axios';
import { ServerURL } from "../../config/port";
const { Option } = Select;
class Match extends Component {
    constructor() {
        super();
        this.state = {
            alldata: [],
            teamarray: [],
            setinfor: [],
            weekNum: 1,
            lockflag: false,
            isOverflow: false
        }
    }

    componentWillMount() {
        let setinfor = [];
        this.setTeamname();
        for (let i = 0; i < 16; i++) {
            setinfor.push({ first: 0, sec: 0, flag: 0 });
        }

        this.setState({ setinfor });
        axios.get(`${ServerURL}/get_matchinfor`)
            .then(e => {
                let weekdata = e.data.filter((v, k) => v.weekNum === this.state.weekNum);
                this.setState({ alldata: e.data, setinfor: weekdata[0].matches, lockflag: weekdata[0].isLocked, isOverflow: weekdata[0].isOverflow });
            })
            .catch(err => console.log(err));

    }
    setTeamname = () => {
        axios.get(`${ServerURL}/get_teamnames`)
            .then(e => this.setState({ teamarray: e.data }))
            .catch(err => console.log(err));

    }
    setTeamMatch = (e, i) => {
        var { setinfor } = this.state;
        if (i.key.split("/")[2] == 1)
            setinfor[i.key.split("/")[1]].first = i.value;
        else setinfor[i.key.split("/")[1]].sec = i.value;
        this.setState({ setinfor });
    }
    LockClick = (index, element) => {
        let { setinfor, isOverflow } = this.state;
        setinfor[index].flag = element;
        isOverflow === false && this.setState({ setinfor });
    }
    save = () => {
        const { weekNum, setinfor, lockflag } = this.state;
        if (setinfor.filter((v, k) => v.flag === 0).length > 0) {
            axios.post(`${ServerURL}/save_matchinfor`, { weekNum, matches: setinfor, isLocked: lockflag, isOverflow: false })
                .then(e => {
                    if (e.data === "add") {
                        notification.success({
                            message: "Success",
                            description: "Add Successful"
                        }); this.componentWillMount();
                    }
                    else if (e.data === "update") {
                        notification.success({
                            message: "Success",
                            description: "Update Successful"
                        }); this.componentWillMount();
                    }
                })
                .catch(err => console.log(err));
        } else {
            axios.post(`${ServerURL}/save_matchinfor`, { weekNum, matches: setinfor, isLocked: lockflag, isOverflow: true })
                .then(e => {
                    if (e.data === "add") {
                        notification.success({
                            message: "Success",
                            description: "Add Successful"
                        }); this.componentWillMount();
                    }
                    else if (e.data === "update") {
                        notification.success({
                            message: "Success",
                            description: "Update Successful"
                        }); this.componentWillMount();
                    }
                })
                .catch(err => console.log(err));
        }

    }
    Clear = () => {
        let { setinfor } = this.state;
        let newinfor = [];
        setinfor = setinfor.map((v, k) => {
            newinfor.push({ first: v.first, sec: v.sec, flag: 0, _id: v._id });
        });
        this.setState({ setinfor: newinfor });
    }
    setWeek = e => {
        let { alldata } = this.state;
        let setinfor = alldata.filter((v, k) => v.weekNum === e);
        if (setinfor.length === 0) {
            for (let i = 0; i < 16; i++) {
                setinfor.push({ first: 0, sec: 0, flag: 0 });
            }

            this.setState({ setinfor, weekNum: e, lockflag: false, isOverflow: false });
        } else {
            this.setState({ weekNum: e, setinfor: setinfor[0].matches, lockflag: setinfor[0].isLocked, isOverflow: setinfor[0].isOverflow });
        }
    }
    render() {
        var unlockData = (
            <Row>
                <Col span={12}>
                    {
                        [...Array(8)].map((vv, kk) =>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Select
                                        style={{ width: "150px", marginRight: "15px" }}
                                        onChange={this.setTeamMatch}
                                        size="large"
                                        value={this.state.setinfor[kk].first === 0 ? undefined : this.state.setinfor[kk].first}
                                    >
                                        {
                                            this.state.teamarray
                                                .map((v, k) =>
                                                    <Option key={v._id + "/" + kk + "/1"} value={v.No}>
                                                        <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                        {v.Teamname}
                                                    </Option>)
                                        }
                                    </Select>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg id="nfl-at" style={{ width: "30px", height: "30px" }}>
                                            <path d="M10.188,21h0C5.814,21,3.476,18.808,4.1,15.686L5.572,8.314C6.2,5.192,9.4,3,13.8,3s6.72,2.192,6.1,5.314l-1.547,7.722a1.686,1.686,0,0,1-1.8,1.461H15.139c-1.265,0-1.812-.326-2.035-.918A4.77,4.77,0,0,1,9.96,17.661c-3.048,0-3.477-2.261-3.137-3.922l.7-3.486a4.67,4.67,0,0,1,4.706-3.938A3.372,3.372,0,0,1,15,7.439l.62-.96h2.257l-1.879,9.358c-.058.315.051.461.368.461h.072A.536.536,0,0,0,17,15.844l1.486-7.43C18.971,6,17.246,4.237,13.566,4.237c-3.55,0-6.108,1.657-6.613,4.177L5.516,15.585C5.029,18,6.77,19.763,10.444,19.763a7.152,7.152,0,0,0,4.682-1.516l.7.918A8.656,8.656,0,0,1,10.188,21ZM11.2,15.406a2.9,2.9,0,0,0,1.925-.738L14.2,9.324a1.853,1.853,0,0,0-1.624-.754,1.821,1.821,0,0,0-1.832,1.717l-.682,3.4c-.231,1.192.22,1.718,1.143,1.718Z"></path>
                                        </svg>
                                    </div>
                                    <Select
                                        style={{ width: "150px", marginLeft: "15px" }}
                                        onChange={this.setTeamMatch}
                                        size="large"
                                        value={this.state.setinfor[kk].sec === 0 ? undefined : this.state.setinfor[kk].sec}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) =>
                                                <Option key={v._id + "/" + kk + "/2"} value={v.No}>
                                                    <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                    {v.Teamname}
                                                </Option>)
                                        }
                                    </Select>
                                </div>
                            </div>
                        )
                    }
                </Col>
                <Col span={12}>
                    {
                        [...Array(8)].map((vv, kk) =>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Select
                                        style={{ width: "150px", marginRight: "15px" }}
                                        onChange={this.setTeamMatch}
                                        size="large"
                                        value={this.state.setinfor[(kk + 8)].first === 0 ? undefined : this.state.setinfor[(kk + 8)].first}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) =>
                                                <Option key={v._id + "/" + (kk + 8) + "/1"} value={v.No}>
                                                    <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                    {v.Teamname}
                                                </Option>)
                                        }
                                    </Select>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg id="nfl-at" style={{ width: "30px", height: "30px" }}>
                                            <path d="M10.188,21h0C5.814,21,3.476,18.808,4.1,15.686L5.572,8.314C6.2,5.192,9.4,3,13.8,3s6.72,2.192,6.1,5.314l-1.547,7.722a1.686,1.686,0,0,1-1.8,1.461H15.139c-1.265,0-1.812-.326-2.035-.918A4.77,4.77,0,0,1,9.96,17.661c-3.048,0-3.477-2.261-3.137-3.922l.7-3.486a4.67,4.67,0,0,1,4.706-3.938A3.372,3.372,0,0,1,15,7.439l.62-.96h2.257l-1.879,9.358c-.058.315.051.461.368.461h.072A.536.536,0,0,0,17,15.844l1.486-7.43C18.971,6,17.246,4.237,13.566,4.237c-3.55,0-6.108,1.657-6.613,4.177L5.516,15.585C5.029,18,6.77,19.763,10.444,19.763a7.152,7.152,0,0,0,4.682-1.516l.7.918A8.656,8.656,0,0,1,10.188,21ZM11.2,15.406a2.9,2.9,0,0,0,1.925-.738L14.2,9.324a1.853,1.853,0,0,0-1.624-.754,1.821,1.821,0,0,0-1.832,1.717l-.682,3.4c-.231,1.192.22,1.718,1.143,1.718Z"></path>
                                        </svg>
                                    </div>
                                    <Select
                                        style={{ width: "150px", marginLeft: "15px" }}
                                        onChange={this.setTeamMatch}
                                        size="large"
                                        value={this.state.setinfor[(kk + 8)].sec === 0 ? undefined : this.state.setinfor[(kk + 8)].sec}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) =>
                                                <Option key={v._id + "/" + (kk + 8) + "/2"} value={v.No}>
                                                    <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                    {v.Teamname}
                                                </Option>)
                                        }
                                    </Select>
                                </div>
                            </div>
                        )
                    }
                </Col>
            </Row>);
        var lockData = (
            <Row>
                <Col span={12}>
                    {
                        [...Array(8)].map((vv, kk) =>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div
                                        style={{ cursor: "pointer", width: "150px", marginRight: "15px", background: this.state.setinfor[kk].flag === 1 ? "lightgreen" : "white" }}
                                        onClick={() => this.LockClick(kk, 1)}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) => {
                                                if (this.state.setinfor[kk].first === v.No) {
                                                    return <div>
                                                        <div>
                                                            <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                        </div>
                                                        <div>
                                                            {v.Teamname}
                                                        </div>


                                                    </div>
                                                }
                                            }
                                            )}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg id="nfl-at" style={{ width: "30px", height: "30px" }}>
                                            <path d="M10.188,21h0C5.814,21,3.476,18.808,4.1,15.686L5.572,8.314C6.2,5.192,9.4,3,13.8,3s6.72,2.192,6.1,5.314l-1.547,7.722a1.686,1.686,0,0,1-1.8,1.461H15.139c-1.265,0-1.812-.326-2.035-.918A4.77,4.77,0,0,1,9.96,17.661c-3.048,0-3.477-2.261-3.137-3.922l.7-3.486a4.67,4.67,0,0,1,4.706-3.938A3.372,3.372,0,0,1,15,7.439l.62-.96h2.257l-1.879,9.358c-.058.315.051.461.368.461h.072A.536.536,0,0,0,17,15.844l1.486-7.43C18.971,6,17.246,4.237,13.566,4.237c-3.55,0-6.108,1.657-6.613,4.177L5.516,15.585C5.029,18,6.77,19.763,10.444,19.763a7.152,7.152,0,0,0,4.682-1.516l.7.918A8.656,8.656,0,0,1,10.188,21ZM11.2,15.406a2.9,2.9,0,0,0,1.925-.738L14.2,9.324a1.853,1.853,0,0,0-1.624-.754,1.821,1.821,0,0,0-1.832,1.717l-.682,3.4c-.231,1.192.22,1.718,1.143,1.718Z"></path>
                                        </svg>
                                    </div>
                                    <div
                                        style={{ cursor: "pointer", width: "150px", marginRight: "15px", background: this.state.setinfor[kk].flag === 2 ? "lightgreen" : "white" }}
                                        onClick={() => this.LockClick(kk, 2)}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) => {
                                                if (this.state.setinfor[kk].sec === v.No) {
                                                    return <div >
                                                        <div>
                                                            <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                        </div>
                                                        <div>
                                                            {v.Teamname}
                                                        </div>
                                                    </div>
                                                }
                                            }
                                            )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Col>
                <Col span={12}>
                    {
                        [...Array(8)].map((vv, kk) =>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <div
                                        style={{ cursor: "pointer", width: "150px", marginRight: "15px", background: this.state.setinfor[(kk + 8)].flag === 1 ? "lightgreen" : "white" }}
                                        onClick={() => this.LockClick((kk + 8), 1)}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) => {
                                                if (this.state.setinfor[(kk + 8)].first === v.No) {
                                                    return <div >
                                                        <div>
                                                            <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                        </div>
                                                        <div>
                                                            {v.Teamname}
                                                        </div>
                                                    </div>
                                                }
                                            }
                                            )}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <svg id="nfl-at" style={{ width: "30px", height: "30px" }}>
                                            <path d="M10.188,21h0C5.814,21,3.476,18.808,4.1,15.686L5.572,8.314C6.2,5.192,9.4,3,13.8,3s6.72,2.192,6.1,5.314l-1.547,7.722a1.686,1.686,0,0,1-1.8,1.461H15.139c-1.265,0-1.812-.326-2.035-.918A4.77,4.77,0,0,1,9.96,17.661c-3.048,0-3.477-2.261-3.137-3.922l.7-3.486a4.67,4.67,0,0,1,4.706-3.938A3.372,3.372,0,0,1,15,7.439l.62-.96h2.257l-1.879,9.358c-.058.315.051.461.368.461h.072A.536.536,0,0,0,17,15.844l1.486-7.43C18.971,6,17.246,4.237,13.566,4.237c-3.55,0-6.108,1.657-6.613,4.177L5.516,15.585C5.029,18,6.77,19.763,10.444,19.763a7.152,7.152,0,0,0,4.682-1.516l.7.918A8.656,8.656,0,0,1,10.188,21ZM11.2,15.406a2.9,2.9,0,0,0,1.925-.738L14.2,9.324a1.853,1.853,0,0,0-1.624-.754,1.821,1.821,0,0,0-1.832,1.717l-.682,3.4c-.231,1.192.22,1.718,1.143,1.718Z"></path>
                                        </svg>
                                    </div>
                                    <div
                                        style={{ cursor: "pointer", width: "150px", marginRight: "15px", background: this.state.setinfor[(kk + 8)].flag === 2 ? "lightgreen" : "white" }}
                                        onClick={() => this.LockClick((kk + 8), 2)}
                                    >
                                        {this.state.teamarray
                                            .map((v, k) => {
                                                if (this.state.setinfor[(kk + 8)].sec === v.No) {
                                                    return <div >
                                                        <div>
                                                            <img src={v.imageURL} width="30px" height="30px" style={{ marginRight: "5px" }} />
                                                        </div>
                                                        <div>
                                                            {v.Teamname}
                                                        </div>
                                                    </div>
                                                }
                                            }
                                            )}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Col>
            </Row>
        );
        return (
            <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card style={{ minWidth: "95%", minHeight: "95%", maxWidth: "95%", maxHeight: "95%", borderRadius: "20px", boxShadow: "5px 5px 5px grey" }}
                    title={
                        <div>
                            Choose Weeks:
                            <Select style={{ width: "100px", marginLeft: "10px" }} value={this.state.weekNum} onChange={(e) => this.setWeek(e)}>
                                {
                                    [...Array(18)].map((v, k) => <Option key={k + 1} value={k + 1}>{k + 1}  week</Option>)
                                }

                            </Select>
                        </div>
                    }
                    extra={<div>
                        {this.state.lockflag === true && <Button type="primary" disabled={this.state.isOverflow === true && true} style={{ marginLeft: "5px" }} onClick={() => this.Clear()}>Clear</Button>}
                        <Button type="primary" onClick={() => this.setState({ lockflag: !this.state.lockflag })} style={{ marginLeft: "5px" }} disabled={this.state.isOverflow === true && true}>
                            {this.state.lockflag === true ? "Unlock" : "Lock"}
                        </Button>
                        <Button type="primary" disabled={this.state.isOverflow === true && true} style={{ marginLeft: "5px" }} onClick={() => this.save()}>Save</Button>
                    </div>}>
                    <div style={{ textAlign: "center", overflowY: "scroll", minHeight: "68vh", maxHeight: "68vh" }}>
                        <h2 style={{
                            textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em darkblue",
                            color: "white", fontSize: "30px"
                        }}>Select the Teams on Match</h2>
                        {this.state.lockflag == true ? lockData : unlockData}
                    </div>

                </Card>
            </div>
        );
    }
}

export default Match;