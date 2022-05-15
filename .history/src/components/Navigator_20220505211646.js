import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./Navigator.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: "",
        };
    }
    handleClickMenu = (Index) => {
        if (Index) {
            this.setState({
                currentIndex: Index,
            });
        }
    };

    render() {
        const { menus } = this.props;
        console.log(menus);
        const { currentIndex } = this.state;
        return (
            <li>hello</li>
            //     {menus.map(menu => {
            //         <li className={currentIndex === index ? "menu active" : "menu"}>
            //         <Link
            //             to={link}
            //             className="menu-link"
            //             onClick={() => this.handleClickMenu(index)}
            //         >
            //             {icon}
            //             <FormattedMessage id={name} />
            //         </Link>
            //     </li>
            //     })}
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
        const { menus } = this.props;
        return (
            <ul className="navigator-menu list-unstyled">
                <MenuWithRouter menus={menus}></MenuWithRouter>
                {/* {menus
                    ? menus.map((menu) => {
                          console.log(menu.index);
                          return (
                              <MenuWithRouter
                                  icon={menu.icon}
                                  key={menu.index}
                                  index={menu.index}
                                  name={menu.name}
                                  link={menu.link}
                                  onClick={() =>
                                      this.handleSelectedLink(menu.index)
                                  }
                              ></MenuWithRouter>
                          );
                      })
                    : null} */}
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
