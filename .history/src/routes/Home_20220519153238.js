import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = isLoggedIn ? "/" : "/login";

        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route
                            component={() => {
                                return <Redirect to={linkToRedirect} />;
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
        isLoggedIn: state.admin.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
