import React, { Component } from "react"
import IntroStep from "./IntroStep/IntroStep"
import GeneralInfo from "./GeneralInfo/GeneralInfo"
import DateAndTime from "./DateAndTime/DateAndTime"
import MapSearchLayout from "./Map/MapSearchLayout/MapSearchLayout"
import EmailVerification from "./EmailVerification/EmailVerification"
import TeamManagerCard from "./TeamManagerCard/TeamManagerCard"
import { connect } from "react-redux"
import * as actionType from "../../Store/actions/index"
import "./TeamCreator.css"
class TeamCreator extends Component {

    componentDidMount() {
        this.props.checkIfUserIsManager(this.props.userEmail).then(res => {
     
            this.props.saveEmailManger(res.data)
        }).catch(err => {

        })
    }

    constructor(props) {
        super(props)
        this.state = {
            indexActive: 0

        }
    }


    onClickLeft = () => {
        let nextIndex = this.state.indexActive - 1 < 0 ? this.state.indexActive : this.state.indexActive - 1;
        if (this.props.emailManger && nextIndex === 4) {
            nextIndex -= 1
        }
        this.setState({ indexActive: nextIndex });
    }
    onClickRight = () => {
            let nextIndex = this.state.indexActive + 1 > 6 ? this.state.indexActive : this.state.indexActive + 1;
        if (this.props.emailManger && nextIndex === 4) {
            nextIndex += 1
        }
        this.setState({ indexActive: nextIndex });
    }
    render() {
        const { indexActive } = this.state
        if (indexActive === 0) {
            return (<div><IntroStep rightClick={this.onClickRight} /></div>)
        }
        else if (indexActive === 1) {
            return (<div ><GeneralInfo rightClick={this.onClickRight} leftClick={this.onClickLeft} /></div>)
        }
        else if (indexActive === 2) {
            return (<div><DateAndTime rightClick={this.onClickRight} leftClick={this.onClickLeft} /></div>)
        }
        else if (indexActive === 3) {
            return (<div><MapSearchLayout rightClick={this.onClickRight} leftClick={this.onClickLeft} /></div>)
        }
        else if (indexActive === 4) {
            return (<div><EmailVerification rightClick={this.onClickRight} leftClick={this.onClickLeft} /></div>)
        }
        else if (indexActive === 5) {
            return (<div><TeamManagerCard rightClick={this.onClickRight} leftClick={this.onClickLeft} /></div>)
        }



    }

}
const mapStateHandler = state => {
    return {
        userEmail: state.user.email,
        emailManger: state.teamCreateInfo.emailManger

    };
};
const mapStateDispatch = dispatch => {
    return {
        checkIfUserIsManager: (userEmail) => dispatch(actionType.checkIfUserIsManager(userEmail)),
        saveEmailManger: (emailManager) => dispatch(actionType.saveEmailManger(emailManager))

    };
};
export default connect(mapStateHandler, mapStateDispatch)(TeamCreator)