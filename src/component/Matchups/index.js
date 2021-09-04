import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Row, Col, Card, Select, notification } from "antd";
import { ServerURL } from "../../config/port";
import { getTeamNames, setTeamID, getuseraction, eachentrydata, eachentrydataclear } from "../../actions"

const jwt = require("jsonwebtoken");
const { Option } = Select;

class index extends Component {
    constructor() {
        super();
        this.state = {
            eachentrydata: [],
            token: {},
            entrydata: [],
            teamarray: [],
            userID: "",
            setinfor: [],
            entryname: "",
            selectTeamNo: 0
        }
    }

    componentWillMount() {

        var tokeninfor = jwt.decode(localStorage.getItem("token"));

        let setinfor = [];
        for (let i = 0; i < 16; i++) {
            setinfor.push({ first: 0, sec: 0, flag: 0 });
        }
        this.setState({ setinfor });
        this.props.getTeamNames();

        if (this.state.entryname === "") this.props.eachentrydataclear();
        axios.get(`${ServerURL}/get_matchinfor`)
            .then(e => {
                var newarr = e.data.filter((v, k) => v.isOverflow).sort((a, b) => a - b);
                if (newarr.length === 0) {
                    this.setState({ weekNum: 1 }, this.getnowmatch(1, tokeninfor.id));
                } else {
                    var index = newarr.length - 1;
                    this.setState({ weekNum: newarr[index].weekNum + 1 }, this.getnowmatch((newarr[index].weekNum + 1), tokeninfor.id));
                }

            })
            .catch(err => console.log(err));

        this.setState({ userID: tokeninfor.id, token: tokeninfor });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.teamname) {
            this.setState({ teamarray: nextProps.teamname })
        }
        if (nextProps.entrydata) {
            this.setState({ entrydata: nextProps.entrydata });
        }
        if (nextProps.eachentry) {
            this.setState({ eachentrydata: nextProps.eachentry });
        }
    }

    getnowmatch = (weeknum, userid) => {
        axios.post(`${ServerURL}/getnowmatch`, { weeknum })
            .then(v => this.setState({ setinfor: v.data.matches }))
            .catch(err => console.log(err));
        this.props.getuseraction(userid);
    }
    setSelectTeamID = (id) => {
        const { userID, entryname, weekNum, token } = this.state;
        axios.post(`${ServerURL}/confirmaction`, { weekNum, entryname, userID }).then(e => {
            if (e.data === "true") {
                if (token.countANDpay.length == 0)
                    notification.warning({
                        message: "Warning!",
                        description: "please Buy EntryName"
                    });
                else {
                    if (entryname == "") {
                        notification.warning({
                            message: "Warning!",
                            description: "Choose EntryName"
                        });
                    } else {
                        this.props.setTeamID(weekNum, userID, entryname, id);
                    }
                }
            } else notification.warning({ message: "Warning!", description: "You can't choose" });

        }).catch(err => console.log(err))

    }
    Onselect = e => {
        const { userID } = this.state;
        this.props.eachentrydata(userID, e);
        this.setState({ entryname: e });
    }
    render() {
        const { token } = this.state;
        let entries;
        if (token.countANDpay.length != 0) {
            var count = 0;
            token.countANDpay.map((v, k) => {
                count += v.count;
            });
            entries = [...Array(count)].map((v1, k1) =>
                <Option key={k1} value={token.name + (k1 + 1)}>{token.name + (k1 + 1)}</Option>
            );
        }
        return (
            <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Card style={{ minWidth: "95%", minHeight: "95%", maxWidth: "95%", maxHeight: "95%", borderRadius: "20px", boxShadow: "5px 5px 5px grey" }}
                    title={
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div>Entry:</div>
                            <Select style={{ marginLeft: "10px", width: "200px" }} onChange={(e) => this.Onselect(e)}>
                                {entries}
                            </Select>
                        </div>
                    }
                >
                    <div style={{ textAlign: "center", overflowY: "scroll", minHeight: "68vh", maxHeight: "68vh" }}>
                        <h2 style={{
                            textShadow: "1px 1px 2px black, 0 0 1em blue, 0 0 0.2em darkblue",
                            color: "white", fontSize: "30px"
                        }}>{this.state.weekNum} week Matchups</h2>
                        {
                            this.state.setinfor.filter(v => v.first === 0).length === 16 ? <div style={{ height: "50vh", paddingTop: "25vh", fontWeight: "bold" }}><h1>No match</h1></div> : <Row>
                                <Col span={12}>
                                    {
                                        [...Array(8)].map((vv, kk) =>
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "2vh" }}>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div
                                                        style={{ cursor: "pointer", width: "200px", marginRight: "15px" }}

                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[kk].first === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                return <div style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                return <div style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                return <div style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
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
                                                        style={{ cursor: "pointer", width: "220px", marginRight: "15px" }}
                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[kk].sec === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                console.log("0000");
                                                                                return <div style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                console.log("1111");
                                                                                return <div style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                console.log("2222");
                                                                                return <div style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
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
                                                        style={{ cursor: "pointer", width: "200px", marginRight: "15px" }}
                                                    // onClick={() => this.LockClick(kk, 1)}
                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[(kk + 8)].first === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                return <div style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                return <div style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                return <div style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
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
                                                        style={{ cursor: "pointer", width: "220px", marginRight: "15px" }}
                                                    // onClick={() => this.LockClick(kk, 2)}
                                                    >
                                                        {this.state.teamarray
                                                            .map((v, k) => {
                                                                if (this.state.setinfor[(kk + 8)].sec === v.No) {
                                                                    if (this.state.eachentrydata.length === 0) {
                                                                        return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                            <div>
                                                                                <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                            </div>
                                                                            <div>
                                                                                {v.Teamname}
                                                                            </div>


                                                                        </div>
                                                                    }
                                                                    else {
                                                                        var data = this.state.eachentrydata.filter((va, ka) => va.selectTeamNo === v.No);
                                                                        if (data.length === 0) {
                                                                            return <div onClick={() => this.setSelectTeamID(v.No)}>
                                                                                <div>
                                                                                    <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                </div>
                                                                                <div>
                                                                                    {v.Teamname}
                                                                                </div>
                                                                            </div>
                                                                        } else {
                                                                            if (data[0].isOut === 0) {
                                                                                console.log("0000");
                                                                                return <div style={{ background: "#e2e2e2" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 1) {
                                                                                console.log("1111");
                                                                                return <div style={{ background: "lightgreen" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            } else if (data[0].isOut === 2) {
                                                                                console.log("2222");
                                                                                return <div style={{ background: "#ff9999" }}>
                                                                                    <div>
                                                                                        <img src={v.imageURL} width="40px" height="40px" style={{ marginRight: "5px" }} />
                                                                                    </div>
                                                                                    <div>
                                                                                        {v.Teamname}
                                                                                    </div>


                                                                                </div>
                                                                            }
                                                                        }
                                                                    }
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
                        }
                    </div>
                </Card>
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {
        teamname: state.usermatch.teamname,
        matchinfor: state.usermatch.match,
        entrydata: state.usermatch.entrydata,
        eachentry: state.usermatch.eachentrydata
    };
};
export default connect(
    mapStateToProps, { getTeamNames, setTeamID, getuseraction, eachentrydata, eachentrydataclear }
)(index);
