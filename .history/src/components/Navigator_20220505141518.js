import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./Navigator.scss";

class Menu extends Component {
    render() {
        const {
            name,
            active,
            link,
            children,
            onClick,
            hasSubMenu,
            onLinkClick,
        } = this.props;
        return (
            <li
                className={
                    "menu" +
                    (hasSubMenu ? " has-sub-menu" : "") +
                    "" +
                    (active ? " active" : "")
                }
            >
                {hasSubMenu ? (
                    <Fragment>
                        <span
                            data-toggle="collapse"
                            className={"menu-link collapsed"}
                            onClick={onClick}
                            aria-expanded={"false"}
                        >
                            <FormattedMessage id={name} />
                            <div className="icon-right">
                                <i className={"far fa-angle-right"} />
                            </div>
                        </span>
                        <div>
                            <ul className="sub-menu-list list-unstyled">
                                {children}
                            </ul>
                        </div>
                    </Fragment>
                ) : (
                    <Link to={link} className="menu-link" onClick={onLinkClick}>
                        <FormattedMessage id={name} />
                    </Link>
                )}
            </li>
        );
    }
}

const MenuWithRouter = withRouter(Menu);

const withRouterInnerRef = (WrappedComponent) => {
    class InnerComponentWithRef extends React.Component {
        render() {
            const { forwardRef, ...rest } = this.props;
            return <WrappedComponent {...rest} ref={forwardRef} />;
        }
    }

    const ComponentWithRef = withRouter(InnerComponentWithRef, {
        withRef: true,
    });

    return React.forwardRef((props, ref) => {
        return <ComponentWithRef {...props} forwardRef={ref} />;
    });
};

class Navigator extends Component {
    state = {
        expandedMenu: {},
    };

    componentDidMount() {}

    // componentWillReceiveProps(nextProps, prevState) {
    //     const { location, setAccountMenuPath, setSettingMenuPath } = this.props;
    //     const { location: nextLocation } = nextProps;
    //     if (location !== nextLocation) {
    //         let pathname = nextLocation && nextLocation.pathname;
    //         if ((pathname.startsWith('/account/') || pathname.startsWith('/fds/account/'))) {
    //             setAccountMenuPath(pathname);
    //         }
    //         if (pathname.startsWith('/settings/')) {
    //             setSettingMenuPath(pathname);
    //         };
    //     };
    // };

    componentDidUpdate(prevProps, prevState) {
        const { location } = this.props;
        const { location: prevLocation } = prevProps;
    }

    render() {
        const { menus, location, onLinkClick } = this.props;
        return (
            <Fragment>
                <ul className="navigator-menu list-unstyled">
                    x{" "}
                    {menus
                        ? menus.map((menu, menuIndex) => {
                              return (
                                  <MenuWithRouter
                                      key={menuIndex}
                                      name={menu.name}
                                      link={menu.link}
                                      onLinkClick={onLinkClick}
                                  ></MenuWithRouter>
                              );
                          })
                        : null}
                    );
                </ul>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouterInnerRef(
    connect(mapStateToProps, mapDispatchToProps)(Navigator)
);
