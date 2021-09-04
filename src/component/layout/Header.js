import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from "antd";
import { Logout } from "../../actions";
const { Header } = Layout;


class top extends Component {
    logout = () => {
        localStorage.clear();
        this.props.Logout();
    }
    render() {
        let menu1 = (<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1"><Link to="/matchup">This Week's Matchups</Link></Menu.Item>
            <Menu.Item key="2">
                <Link to="/">Leaderboard</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/admin">Admin</Link>
            </Menu.Item>
            <Menu.Item key="4"><Link to="/account">My Account</Link></Menu.Item>
            <Menu.Item key="5" onClick={() => this.logout()}><Link to="/login">log out</Link></Menu.Item>
        </Menu>);
        let menu2 = (<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="2">
                <Link to="/">Leaderboard</Link>
            </Menu.Item>
            <Menu.Item key="5"><Link to="/login">login</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/register">register</Link></Menu.Item>
        </Menu>);
        return (
            <div>
                <Header className="header">
                    {/* {this.props.logflag ? menu1 : menu2} */}
                    {menu1}
                </Header>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        logflag: state.auth.isAuthenticate
    };
};
export default connect(
    mapStateToProps, { Logout }
)(top);