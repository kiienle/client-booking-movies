import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage/UserManage";
import MovieManage from "../containers/System/MovieManage/MovieManage";
import ShowtimeManage from "../containers/System/Showtime/ShowtimeManage";
import Cineplex from "../containers/System/Cineplex/Cineplex";
import Cinema from "../containers/System/Cinema/Cinema";
import SideBar from "../containers/SideBar/SideBar";

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                {this.props.isLoggedIn && <SideBar />}

                <div className="system-list">
                    <Switch>
                        <Route
                            path="/system/user-manage"
                            component={UserManage}
                        />
                        <Route
                            path="/system/movie-manage"
                            component={MovieManage}
                        />
                        <Route
                            path="/system/showtimes-manage"
                            component={ShowtimeManage}
                        />
                        <Route path="/system/cineplex" component={Cineplex} />
                        <Route path="/system/cinema" component={Cinema} />
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
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
