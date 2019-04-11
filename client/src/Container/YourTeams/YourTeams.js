import React, { Component } from "react"
import "./YourTeams.css"
import ItemSearchTeam from "../../Component/ItemSearchTeam/ItemSearchTeam"
import Tabs from "../../Component/Tabs/Tabs"
import { connect } from "react-redux"
import TeamManagerCard from "../TeamCreator/TeamManagerCard/TeamManagerCard"
import * as actionType from "../../Store/actions/index"
import Aux from "../../Hoc/Hoc"
import Spinner from "../../Component/Ui/Spinner/Spinner"

class YourTeams extends Component {
    state = {
        isLoading: false,
        indexActive: 0,
        yourTeams: [],
        bySearch: false,
        viewTeam: false,
        idOfTeam: ""

    }

    componentDidMount() {
        if (this.props.yourTeams.length > 0) {
            let array = this.chunkArray(this.props.yourTeams)
            this.setState({
                yourTeams: array,
                isLoading: true, bySearch: true
            }, () => {

            })
        } else {

            this.initUserTeams()
        }
    }


    initUserTeams = () => {
        this.setState({ isLoading: false }, () => {
            let data = {
                id: this.props.emailRegister
            }
            this.props.getUsersTeams(data).then(res => {
                let array = this.chunkArray(res)
                this.setState({ yourTeams: array, isLoading: true }, () => {
                })
            }).catch(err => {
                this.props.openErrorMsg()
            })
        })

    }

    componentWillReceiveProps() {
        if (this.props.yourTeams === undefined || this.props.yourTeams.length === 0) {
            this.setState({ bySearch: false, isLoading: false }, () => {
                this.initUserTeams()
            })
        }
    }
    chunkArray = (array) => {
        let teamsArrayChunk = []
        let index = 0
        let size = 1
        while (index < array.length) {
            teamsArrayChunk.push(array.slice(index, size + index))
            index += size
        }
        return teamsArrayChunk
    }
    viewTeamHandler = (team) => {
        if (this.state.bySearch) {
            this.props.viewTeamToJoin(team)
            this.setState({
                idOfTeam: team._id,
                viewTeam: !this.state.viewTeam
            })
        }
    }
    loadTeamMessageBoard = (item) => {
        console.log(item)
    }
    removeJoinHandler = () => {
        this.setState({ viewTeam: !this.state.viewTeam })
    }
    JoinTeamHandler = () => {
        let data = {
            id: this.state.idOfTeam,
            userEmail: this.props.emailRegister
        }
        this.props.processRequestMsg()
        this.props.joinTeam(data).then(res => {

            if (res.status === 201) {
                this.props.isMemberMsg()
            } else {
                this.props.resetModel()
                this.props.history.push("/")
            }
        }).catch(err => {
            this.props.openErrorMsg()
        })
    }

    clickLeftHandler = () => {
        console.log("click left")
        let nextIndex = this.state.indexActive - 1 < 0 ? this.state.yourTeams.length - 1 : this.state.indexActive - 1;
        this.setState({ indexActive: nextIndex });
    }
    clickRightHandler = () => {
        console.log("click right")
        let nextIndex = this.state.indexActive + 1 === this.state.yourTeams.length ? 0 : this.state.indexActive + 1;
        this.setState({ indexActive: nextIndex });
    }
    render() {

        let { yourTeams, bySearch } = this.state
        let searchResults = []
        if (yourTeams.length > 0) {
            searchResults = yourTeams[this.state.indexActive].map((item, index) => {
                return (<ItemSearchTeam image={item.generalInfo.file}
                    view={this.state.bySearch ? () => this.viewTeamHandler(item) : () => this.loadTeamMessageBoard(item)}
                    fade={item.membersId.length != 0 && item.membersId.length >= item.generalInfo.numberOfTeam && bySearch ? true : false}
                    sportType={item.generalInfo.typeOfSportChosen}
                    nameOfTeam={item.generalInfo.nameOfTeam}
                    key={index}
                    title={!this.state.bySearch ? "Your Team" : "View"}
                    dateType={item.dateAndTime.pickType} />)
            })
        } else {
            searchResults = (<p>You are Not a member of any team</p>)
        }
        let displayMainJsx = (
            <div >
                <Tabs />
                <div className="slider">
                    <h3>{this.state.bySearch ? "Your Search Result" : "Your Teams"}</h3>
                    <div className="slides"> {searchResults}</div>
                    {yourTeams.length > 1 && (<div onClick={this.clickLeftHandler} className="btnLeft fas fa-angle-double-left "></div>)}
                    {yourTeams.length > 1 && (<div onClick={this.clickRightHandler} className="btnRight fas fa-angle-double-right"></div>)}
                </div>
            </div>)
        if (this.state.viewTeam) {
            displayMainJsx = (<div><TeamManagerCard cancel="Go Back" join="Join"
                joinTeamHandler={this.JoinTeamHandler}
                leftClick={this.removeJoinHandler} /></div>)
        }

        return (
            <Aux>{this.state.isLoading ?
                <div className="wrapper-your-teams">  {displayMainJsx}</div>
                : <Spinner />}</Aux>)
    }
}
const mapStateHandler = state => {
    return {
        userEmail: state.user.email,
        emailManger: state.teamCreateInfo.emailManger,
        emailRegister: state.user.email,
        yourTeams: state.teamCreateInfo.yourTeams

    };
};
const mapStateDispatch = dispatch => {
    return {
        processRequestMsg: () => dispatch(actionType.processRequestMsg()),
        joinTeam: (data) => dispatch(actionType.joinTeam(data)),
        viewTeamToJoin: (team) => dispatch(actionType.viewTeamToJoin(team)),
        resetModel: () => dispatch(actionType.resetModel()),
        isMemberMsg: () => dispatch(actionType.isMemberMsg()),
        openErrorMsg: () => dispatch(actionType.openErrorMsg()),
        openErrorMsg: () => dispatch(actionType.openErrorMsg()),
        getUsersTeams: (data) => dispatch(actionType.getUsersTeams(data))

    };
};
export default connect(mapStateHandler, mapStateDispatch)(YourTeams)
