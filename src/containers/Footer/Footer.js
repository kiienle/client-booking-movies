import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Footer.scss";

import bg from "../../assets/images/footer-bg.jpg";
import Logo from "../../assets/images/BM-logo-2.png";
class Footer extends Component {
    render() {
        return (
            <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
                <div className="footer__content container">
                    <div className="footer__content__logo">
                        <div className="logo">
                            <img src={Logo} />
                            <p>BookingMovie</p>
                        </div>
                    </div>
                    <div className="footer__content__menus">
                        <div className="footer__content__menu">
                            <Link to="/">Home</Link>
                            <Link to="/">Contact us</Link>
                            <Link to="/">Term of services</Link>
                            <Link to="/">About us</Link>
                        </div>
                        <div className="footer__content__menu">
                            <Link to="/">Live</Link>
                            <Link to="/">FAQ</Link>
                            <Link to="/">Premium</Link>
                            <Link to="/">Pravacy policy</Link>
                        </div>
                        <div className="footer__content__menu">
                            <Link to="/">You must watch</Link>
                            <Link to="/">Recent release</Link>
                            <Link to="/">Top TMDB</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
