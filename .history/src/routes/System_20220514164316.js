import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage/UserManage";
import MovieManage from "../containers/System/MovieManage/MovieManage";
import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
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
                            component={RegisterPackageGroupOrAcc}
                        />
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
