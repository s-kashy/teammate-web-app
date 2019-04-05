import React, { Component } from "react"
import Aux from "../../Hoc/Hoc"
import { connect } from "react-redux"
import * as actionType from "../../Store/actions/index"
import ErrorMsg from "../../Component/ErrorMsg/ErrorMsg"
import ProcessRequestMsg from "../../Component/ProcessRequestMsg/ProcessRequestMsg"
import Model from "../../Component/Ui/Model/Model"


import "./Layout.css"
class Layout extends Component {
    onClickModel = () => {
        this.props.openErrorMsg()
    }
    onClickErrorModelHandler = () => {
        this.props.closeErrorMsg()
    }
    render() {
        return (<Aux>
            <Model visible={this.props.backDrop} >
                <ErrorMsg visible={this.props.errorMsg} click={this.onClickErrorModelHandler} />
               <ProcessRequestMsg visible={this.props.processRequestMsg}/>
            </Model>
            <main className="content">{this.props.children}</main>
        
        </Aux>
        )
    }
}
const mapStateHandler = state => {
    return {
        backDrop: state.controlModel.backDrop,
        errorMsg: state.controlModel.errorMsg,
        processRequestMsg:state.controlModel.processRequestMsg
    };
};
const mapStateDispatch = dispatch => {
    return {
        closeErrorMsg: () => dispatch(actionType.closeErrorMsg()),
        openErrorMsg: () => dispatch(actionType.openErrorMsg())
    };
};
export default connect(mapStateHandler, mapStateDispatch)(Layout)