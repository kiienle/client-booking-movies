import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import * as actions from "../../store/actions";
import "./AdminHeader.scss";
import Logo from "../../assets/images/unnamed.jpg";

class AdminHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageRedux(language);
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(prevProps.language !== this.props.langauge) {
    //         this.changeLanguage()
    //     }
    // }
    render() {
        const { languageRedux } = this.props;
        return (
            <div className="header-container">
                <div className="content-left">
                    <div className="logo">
                        <img src={Logo} />
                        <p>BookingMovie</p>
                    </div>
                    <div className="search"></div>
                </div>
                <div className="content-right">
                    <div className="toggle-language">
                        <i class="fas fa-globe mx-3"></i>
                        <div
                            className={
                                languageRedux === LANGUAGES.VI
                                    ? "language-vi active"
                                    : "language-vi"
                            }
                        >
                            <span
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.VI)
                                }
                            >
                                Việt Nam
                            </span>
                        </div>
                        <span>/</span>
                        <div
                            className={
                                languageRedux === LANGUAGES.EN
                                    ? "language-en active"
                                    : "language-en"
                            }
                        >
                            <span
                                onClick={() =>
                                    this.changeLanguage(LANGUAGES.EN)
                                }
                            >
                                English
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.admin.isLoggedIn,
        languageRedux: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageRedux: (language) =>
            dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHeader);
