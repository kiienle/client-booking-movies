import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "../containers/HomePage/HomePage";
import MovieGrid from "../containers/Movie/MovieGrid";
import HomeHeader from "../containers/Header/HomeHeader";
import MovieDetail from "../containers/Movie/MovieDetail";
import Footer from "../containers/Footer/Footer";

class Home extends Component {
    render() {
        const { homeMenuPath } = this.props;
        // let linkToRedirect = isLoggedIn ? "/" : "/login";

        return (
            <>
                <HomeHeader />
                <Switch>
                    <Route exact path="/" component={HomePage} />

                    <Route exact path="/movie" component={MovieGrid} />

                    <Route path="/movie/:id" component={MovieDetail} />
                    <Route
                        component={() => {
                            return <Redirect to={homeMenuPath} />;
                        }}
                    />
                </Switch>
                <Footer />
            </>
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
