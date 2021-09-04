import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Tag } from 'antd';
import { getleaderboard } from "../../actions";
import "./style.css";
class index extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      alldata: []
    }
    this.columns = [
      {
        title: "EntryName",
        dataIndex: "name",
        align: "center",
        width: "200px"
      },
      {
        title: "1",
        dataIndex: "1",
        align: "center",
        width: "50px",
        render: (text, record) => {
          if (record.flag1 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag1 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "2",
        dataIndex: "2",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag2 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag2 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "3",
        dataIndex: "3",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag3 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag3 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "4",
        dataIndex: "4",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag4 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag4 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "5",
        dataIndex: "5",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag5 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag5 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "6",
        dataIndex: "6",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag6 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag6 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "7",
        dataIndex: "7",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag7 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag7 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "8",
        dataIndex: "8",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag8 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag8 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "9",
        dataIndex: "9",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag9 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag9 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "10",
        dataIndex: "10",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag10 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag10 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "11",
        dataIndex: "11",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag11 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag11 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "12",
        dataIndex: "12",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag12 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag12 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "13",
        dataIndex: "13",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag13 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag13 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "14",
        dataIndex: "14",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag14 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div>
          } else if (record.flag14 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "15",
        dataIndex: "15",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag15 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag15 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "16",
        dataIndex: "16",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag16 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag16 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "17",
        dataIndex: "17",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag17 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag17 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      },
      {
        title: "18",
        dataIndex: "18",
        align: "center", width: "50px",
        render: (text, record) => {
          if (record.flag18 === 1) {
            return <div style={{
              background: "lightgreen", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          } else if (record.flag18 === 2) {
            return <div style={{
              background: "red", height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}> {text.substr(0, 3).toUpperCase()}</div >
          }
        }
      }
    ]
  }
  componentDidMount() {
    this.props.getleaderboard();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.alldata) {
      var all = nextProps.alldata;
      var filteredname = Array.from(all.reduce((a, o) => a.set(`${o.entryname}`, o), new Map()).values());
      let data = filteredname.map((v1, k1) => {
        var obj = { name: v1.entryname, week: v1.weekNo, flag: 0 };
        all.map((v2, k2) => {
          if (v2.entryname === v1.entryname) {
            obj[v2.weekNo] = v2.teamname[0].Teamname;
            obj[`flag${v2.weekNo}`] = v2.isOut;
          }
        });
        return obj;
      })
      console.log(data);
      this.setState({ data })
    }
  }

  render() {
    return (
      <div style={{ height: "90vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Card style={{ minWidth: "95%", minHeight: "95%", maxWidth: "95%", maxHeight: "95%", borderRadius: "20px", boxShadow: "5px 5px 5px grey" }}
          title={<div style={{ fontWeight: "bold" }}>LeaderBoard</div>}
        >
          <Table columns={this.columns} dataSource={this.state.data} bordered pagination={false} />
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    alldata: state.board.borderdata
  };
};
export default connect(
  mapStateToProps, { getleaderboard }
)(index);