import React, { Component } from "react";
import BackDrop from "../BackDrop/BackDrop"
import Aux from "../../../Hoc/Hoc"; 
import "./Model.css";
class Model extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.visible !== this.props.visible ||
            nextProps.children !== this.props.children
        );
    }


    closeModelHandler = () => {

    };
    render() {
        let visibilityState = this.props.visible ? "block" : "none";
        return (
            <Aux style={{ display: visibilityState }}>
                <BackDrop
                    visible={this.props.visible}
                    modalClosed={this.closeModelHandler}
                />
                <div
                    className="Model"
                    style={{
                        transform: this.props.visible
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                        opacity: this.props.visible ? "1" : "0"
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Model