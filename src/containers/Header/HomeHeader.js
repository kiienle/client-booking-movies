import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/HomeNavigator";
import Logo from "../../assets/images/BM-logo-2.png";
import { homeMenu } from "../Menu/menuApp";
import "./HomeHeader.scss";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.headerRef = React.createRef();
    }

    componentDidMount() {
        console.log(document.body.scrollTop);
        // window.addEventListener("scroll", this.handleScroll());
    }

    componentWillUnmount() {
        // window.removeEventListener("scroll", this.handleScroll());
    }
    handleScroll = (e) => {
        console.log(e.target.scrollTop);
        // const headerRef = this.headerRef;
        // if (
        //     document.body.scrollTop > 100 ||
        //     document.documentElement.scrollTop > 100
        // ) {
        //     headerRef.current.classList.add("shrink");
        // } else {
        //     headerRef.current.classList.remove("shrink");
        // }
    };
    render() {
        const { processLogout } = this.props;

        return (
            <div
                onScroll={this.handleScroll}
                ref={this.headerRef}
                className="header"
            >
                <div className="header__wrapper home-container">
                    <div className="logo">
                        <img src={Logo} />
                        <p>BookingMovie</p>
                    </div>

                    {/* thanh navigator */}
                    <Navigator menus={homeMenu} />

                    {/* nút logout */}
                    {/* <div className="profile">
                        <div
                            className="btn btn-logout "
                            onClick={processLogout}
                        >
                            log out
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div> */}
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
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
