import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage/UserManage";
import MovieManage from "../containers/System/MovieManage/MovieManage";
import ShowtimeManage from "../containers/System/Showtime/ShowtimeManage";
import Cineplex from "../containers/System/Cineplex/Cineplex";
import Cinema from "../containers/System/Cinema/Cinema";
import SideBar from "../containers/Menu/SideBar";
import AdminHeader from "../containers/Header/AdminHeader";

import "./System.scss";

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-content">
                    {this.props.isLoggedIn && <AdminHeader />}
                    {this.props.isLoggedIn && <SideBar />}

                    <Switch>
                        <Route
                            exact
                            path="/system/user-manage"
                            component={UserManage}
                        />
                        <Route
                            exact
                            path="/system/movie-manage"
                            component={MovieManage}
                        />
                        <Route
                            exact
                            path="/system/showtimes-manage"
                            component={ShowtimeManage}
                        />
                        <Route
                            exact
                            path="/system/cineplex"
                            component={Cineplex}
                        />
                        <Route exact path="/system/cinema" component={Cinema} />
                        <Route
                            component={() => {
                                return <Redirect to={systemMenuPath} />;
                            }}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.admin.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
