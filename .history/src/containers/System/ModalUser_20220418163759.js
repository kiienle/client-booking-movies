import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
    Modal,
    ModalSideBar,
    ModalBody,
    ModalFooter,
} from "reactstrap";

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phonenumber: "",
            gender: "",
            roleId: "",
        };
    }
    componentDidMount() {}

    toggle = () => {
        this.props.handleHideModalUser();
        console.log(this.props.handleHideModalUser);
    };

    checkValidInput = () => {
        let isValid = true;
        let arrInput = [
            "email",
            "password",
            "firstName",
            "lastaName",
            "address",
            "phonenumber",
            "gender",
            "roleId",
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

    handleAddNewUser = () => {
        this.checkValidInput();
        this.props.handleCreateNewUserService(this.state);
        this.setState({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            phonenumber: "",
            gender: "",
            roleId: "",
        });
    };
    render() {
        console.log(this.state);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={"modal-user-container"}
                size="lg"
            >
                <ModalSideBar toggle={() => this.toggle()}>
                    Create a new user
                </ModalSideBar>
                <ModalBody>
                    <form action="" method="POST">
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>Email</lable>
                                <input
                                    value={this.state.email}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({ email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Password</lable>
                                <input
                                    value={this.state.password}
                                    type="password"
                                    onChange={(e) =>
                                        this.setState({
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>First Name</lable>
                                <input
                                    value={this.state.firstName}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            firstName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Last Name</lable>
                                <input
                                    value={this.state.lastName}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            lastName: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <lable>Address</lable>
                                <input
                                    value={this.state.address}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <lable>Phonenumber Number</lable>
                                <input
                                    value={this.state.phonenumber}
                                    type="text"
                                    onChange={(e) =>
                                        this.setState({
                                            phonenumber: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div class="input-container">
                                <label>Sex</label>
                                <select
                                    name="gender"
                                    value={this.state.gender}
                                    onChange={(e) =>
                                        this.setState({
                                            gender: e.target.value,
                                        })
                                    }
                                >
                                    <option selected value="M">
                                        Male
                                    </option>
                                    <option value="F">Female</option>
                                </select>

                                <label>Role</label>
                                <select
                                    name="roleId"
                                    value={this.state.roleId}
                                    onChange={(e) =>
                                        this.setState({
                                            roleId: e.target.value,
                                        })
                                    }
                                >
                                    <option value="R1">Admin</option>
                                    <option selected value="R2">
                                        Doctor
                                    </option>
                                    <option value="R3">Patient</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary px-2"
                        onClick={() => this.handleAddNewUser()}
                    >
                        Add User
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
