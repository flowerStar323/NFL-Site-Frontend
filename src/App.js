import React, { Component } from 'react';
import { HashRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Header from "./component/layout/Header";
import { connect } from 'react-redux';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
// const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Admin = React.lazy(() => import('./component/Admin'));
const Matchups = React.lazy(() => import('./component/Matchups'));
const Login = React.lazy(() => import('./component/login/login'));
const Register = React.lazy(() => import('./component/register/register'));
const Leaderboard = React.lazy(() => import('./component/Leaderboard'));
const Account = React.lazy(() => import('./component/Account'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Header {...this.props} />
          <Switch>
            <Route exact path="/admin" name="Home" render={props => <Admin {...props} />} />
            <Route exact path="/" name="Home" render={props => <Leaderboard {...props} />} />
            <Route exact path="/matchup" name="Matchup" render={props => <Matchups {...props} />} />
            <Route exact path="/login" name="Login" render={props => <Login {...props} />} />
            <Route exact path="/register" name="register" render={props => <Register {...props} />} />
            <Route exact path="/account" name="account" render={props => <Account {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
const mapStateToProps = state => {
  return {

  };
};
export default connect(
  mapStateToProps
)(App);




