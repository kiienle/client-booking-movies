import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
// import {
//     getAllUsers,
//     createNewUserService,
//     deleteUser,
//     updateUser,
// } from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditMode: false,
            userEditData: {},
        };
    }

    // async componentDidMount() {
    //     await this.getAllUsersFromReact();
    // }

    // getAllUsersFromReact = async () => {
    //     let response = await getAllUsers("ALL");
    //     if (response && response.errCode === 0) {
    //         this.setState({
    //             arrUsers: response.users,
    //         });
    //     }
    // };

    // handleAddNewUser = () => {
    //     this.setState({
    //         isOpenModalUser: true,
    //     });
    // };

    // handleHideModalUser = () => {
    //     this.setState({
    //         isOpenModalUser: !this.state.isOpenModalUser,
    //     });
    // };

    // handlecreateNewUserService = async (userData) => {
    //     try {
    //         let response = await createNewUserService(userData);
    //         console.log(response);
    //         if (response && response.message.errCode !== 0) {
    //             alert(response.message.errMessage);
    //         } else {
    //             await this.getAllUsersFromReact();
    //             this.setState({
    //                 isOpenModalUser: !this.state.isOpenModalUser,
    //             });
    //         }
    //         console.log("response user ", response);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // handleDeleteUser = async (id) => {
    //     console.log(typeof id);
    //     try {
    //         let response = await deleteUser(id);
    //         console.log(response.errMessage);
    //         if (response && response.message.errCode === 0) {
    //             await this.getAllUsersFromReact();
    //         } else {
    //             alert(response.message.errMessage);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    // handleEditUser = (item) => {
    //     this.setState({
    //         isOpenEditMode: true,
    //         userEditData: { ...item },
    //     });
    // };

    // handleUpdateUser = async (data) => {
    //     try {
    //         let res = await updateUser(data);
    //         if (res && res.message.errCode === 0) {
    //             await this.getAllUsersFromReact();
    //             this.setState({
    //                 isOpenEditMode: !this.state.isOpenEditMode,
    //             });
    //         } else {
    //             alert(res.message.errMessage);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    render() {
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    handleHideModalUser={this.handleHideModalUser}
                    handlecreateNewUserService={this.handlecreateNewUserService}
                />
                {this.state.isOpenEditMode && (
                    <ModalEditUser
                        isOpen={this.state.isOpenEditMode}
                        hideModalEidt={() =>
                            this.setState({
                                isOpenEditMode: !this.state.isOpenEditMode,
                            })
                        }
                        currentUser={this.state.userEditData}
                        handleUpdateUser={this.handleUpdateUser}
                    />
                )}
                <div className="title">Manage users with Kien</div>
                <div className="mx-1">
                    <button
                        onClick={() => this.handleAddNewUser()}
                        type="button"
                        class="btn btn-primary px-2 mx-1"
                    >
                        <i class="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>

                <div className="users-table mt-3 mx-1">
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {this.state.arrUsers.map((item, i) => (
                            <tr className="divClass" key={i}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            this.handleEditUser(item)
                                        }
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            this.handleDeleteUser(item.id)
                                        }
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                            <td>Germany</td>
                            <td>Germany</td>
                        </tr> */}
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
