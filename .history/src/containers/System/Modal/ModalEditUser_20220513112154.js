import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Modal.scss";

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            address: "",
            phone_number: "",
            gender: "",
            role_id: "",
        };
    }
    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: "user.password",
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                phone_number: user.phone_number,
                gender: user.gender,
                role_id: user.role_id,
            });
        }
    }

    toggle = () => {
        this.props.hideModalEidt();
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "email",
            "password",
            "first_name",
            "last_name",
            "address",
            "phone_number",
            "gender",
            "role_id",
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert(`Missing parametor: ${arrInput[i]}`);
                break;
            }
            return isValid;
        }
    };

    handleEditUser = () => {
        console.log(this.state);
        this.checkValidInput();
        this.props.handleUpdateUser(this.state);
        this.setState({
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            address: "",
            phone_number: "",
            gender: "",
            roleId: "",
        });
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-container"}
                size="lg"
            >
                <ModalHeader
                    className="form-title"
                    toggle={() => this.toggle()}
                >
                    Edit user
                </ModalHeader>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-content_">
                            <div className="modal-input">
                                <div className="input-container">
                                    <input
                                        className="form-input"
                                        disabled
                                        value={this.state.email}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <lable className="form-label">Email</lable>
                                </div>
                                <div className="input-container">
                                    <input
                                        className="form-input"
                                        disabled
                                        value={this.state.password}
                                        type="password"
                                        onChange={(e) =>
                                            this.setState({
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                    <lable className="form-label">
                                        Password
                                    </lable>
                                </div>

                                <div className="input-container">
                                    <input
                                        className="form-input"
                                        value={this.state.first_name}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                first_name: e.target.value,
                                            })
                                        }
                                    />
                                    <lable className="form-label">
                                        First Name
                                    </lable>
                                </div>
                                <div className="input-container">
                                    <input
                                        className="form-input"
                                        value={this.state.last_name}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                last_name: e.target.value,
                                            })
                                        }
                                    />
                                    <lable className="form-label">
                                        Last Name
                                    </lable>
                                </div>

                                <div className="input-container">
                                    <input
                                        className="form-input"
                                        value={this.state.address}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                    <lable className="form-label">
                                        Address
                                    </lable>
                                </div>
                                <div className="input-container">
                                    <input
                                        className="form-input"
                                        value={this.state.phone_number}
                                        type="text"
                                        onChange={(e) =>
                                            this.setState({
                                                phone_number: e.target.value,
                                            })
                                        }
                                    />
                                    <lable className="form-label">
                                        Phone Number
                                    </lable>
                                </div>
                                <div class="select-container">
                                    <select
                                        className="select-box"
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={(e) =>
                                            this.setState({
                                                gender: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>

                                    <select
                                        className="select-box"
                                        name="roleId"
                                        value={this.state.role_id}
                                        onChange={(e) =>
                                            this.setState({
                                                role_id: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="1">Admin</option>
                                        <option value="2">Doctor</option>
                                        <option value="3">Patient</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleEditUser()}
                    >
                        Save User
                    </Button>{" "}
                    <Button color="danger px-2" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
