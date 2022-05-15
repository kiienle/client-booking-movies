import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./Navigator.scss";

class Menu extends Component {
    render() {
        const {
            icon,
            name,
            active,
            link,
            children,
            onClick,
            hasSubMenu,
            onLinkClick,
        } = this.props;
        console.log(<i class="fa-solid fa-phone"></i>);
        console.log(icon);
        return (
            <li
                className={
                    "menu" +
                    (hasSubMenu ? " has-sub-menu" : "") +
                    "" +
                    (active ? " active" : "")
                }
            >
                <Link to={link} className="menu-link" onClick={onLinkClick}>
                    {icon}
                    <i className="fas fa-phone"></i>

                    <FormattedMessage id={name} />
                </Link>
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

    // componentDidUpdate(prevProps, prevState) {
    //     const { location } = this.props;
    //     const { location: prevLocation } = prevProps;
    // }

    render() {
        const { menus, location, onLinkClick } = this.props;
        return (
            <ul className="navigator-menu list-unstyled">
                {menus
                    ? menus.map((menu, menuIndex) => {
                          return (
                              <MenuWithRouter
                                  icon={menu.icon}
                                  key={menuIndex}
                                  name={menu.name}
                                  ink={menu.link}
                                  onLinkClick={onLinkClick}
                              ></MenuWithRouter>
                          );
                      })
                    : null}
                );
            </ul>
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
