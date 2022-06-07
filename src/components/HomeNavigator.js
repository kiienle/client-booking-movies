import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./HomeNavigator.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { menus } = this.props;
        const active = menus.findIndex(
            (e) => e.link === this.props.location.pathname
        );
        return (
            <Fragment>
                {menus.map((menu, i) => (
                    <li className={i === active ? "active" : ""}>
                        <Link to={menu.link}>
                            <FormattedMessage id={menu.name} />
                        </Link>
                    </li>
                ))}
            </Fragment>
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
    handleSelectedLink = (index) => {
        console.log(index);
    };
    render() {
        const { menus, location } = this.props;
        return (
            <ul className="header__nav">
                <MenuWithRouter menus={menus}></MenuWithRouter>
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
