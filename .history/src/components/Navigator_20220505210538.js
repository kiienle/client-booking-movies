import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./Navigator.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKey: "",
        };
    }
    handleClickMenu = (key) => {
        if (key) {
            this.setState({
                currentKey: key,
            });
        }
    };

    render() {
        const { icon, name, key, link } = this.props;
        const { currentKey } = this.state;
        console.log(currentKey);
        return (
            <li className={currentKey === key ? "menu active" : "menu"}>
                <Link
                    to={link}
                    className="menu-link"
                    onClick={() => this.handleClickMenu(key)}
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
                    ? menus.map((menu) => {
                          return (
                              <MenuWithRouter
                                  icon={menu.icon}
                                  key={menu.index}
                                  index={menu.index}
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
