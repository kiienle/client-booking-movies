import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./Navigator.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        };
    }
    handleClickMenu = (active) => {
        this.setState({
            isActive: !this.state.isActive,
        });
    };
    render() {
        const { icon, name, active, link } = this.props;

        return (
            <li className={isActive ? "menu active" : "menu"}>
                <Link
                    to={link}
                    className="menu-link"
                    onClick={() => this.handleClickMenu(active)}
                >
                    {icon}
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
        const { menus } = this.props;
        return (
            <ul className="navigator-menu list-unstyled">
                {menus
                    ? menus.map((menu, menuIndex) => {
                          return (
                              <MenuWithRouter
                                  menu={menu}
                                  icon={menu.icon}
                                  key={menuIndex}
                                  name={menu.name}
                                  link={menu.link}
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
