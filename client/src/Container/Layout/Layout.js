import React, { Component } from "react";
import Aux from "../../Hoc/Hoc";
import { connect } from "react-redux";
import * as actionType from "../../Store/actions/index";
import YouAreAMember from "../../Component/YouAreAMember/YouAreAMember";
import ErrorMsg from "../../Component/ErrorMsg/ErrorMsg";
import ProcessRequestMsg from "../../Component/ProcessRequestMsg/ProcessRequestMsg";
import ConformUserSelection from "../../Component/ConformUserSelection/ConformUserSelection";
import Model from "../../Component/Ui/Model/Model";

import "./Layout.css";
class Layout extends Component {
  onClickModel = () => {
    this.props.openErrorMsg();
  };
  onClickErrorModelHandler = () => {
    this.props.resetModel();
  };
  userConformRequest = () => {
this.props.userClickOnConformation(true)
  };
  userCancelRequest = () => {
      this.props.userClickOnConformation(false)
  };
  render() {
    return (
      <Aux>
        <Model visible={this.props.backDrop}>
          <ErrorMsg
            visible={this.props.errorMsg}
            click={this.onClickErrorModelHandler}
          />
          <ProcessRequestMsg visible={this.props.processRequestMsg} />
          <YouAreAMember
            visible={this.props.memberMsg}
            click={this.onClickErrorModelHandler}
          />
          <ConformUserSelection
            visible={this.props.userConfirmation}
            cancel={this.userCancelRequest}
            submit={this.userConformRequest}
          />
        </Model>
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateHandler = state => {
  return {
    backDrop: state.controlModel.backDrop,
    errorMsg: state.controlModel.errorMsg,
    processRequestMsg: state.controlModel.processRequestMsg,
    memberMsg: state.controlModel.memberMsg,
    userConfirmation:state.controlModel.conformRequest
  };
};
const mapStateDispatch = dispatch => {
  return {
    closeErrorMsg: () => dispatch(actionType.closeErrorMsg()),
    openErrorMsg: () => dispatch(actionType.openErrorMsg()),
    resetModel: () => dispatch(actionType.resetModel()),
    userClickOnConformation:(res)=>dispatch(actionType.userClickOnConformation(res))
  };
};
export default connect(
  mapStateHandler,
  mapStateDispatch
)(Layout);
