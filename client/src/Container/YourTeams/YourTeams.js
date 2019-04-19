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
        bySearch: true,
        viewTeam: false,
        idOfTeam: ""

    }

    componentDidMount() {
        if (this.props.teamCreateInfo != undefined || this.props.teamsBySearch.length !== 0) {
            let array = this.chunkArray(this.props.teamsBySearch)
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
                console.log("user teams", array)
                this.setState({ yourTeams: array, isLoading: true }, () => {
                })
            }).catch(err => {
                this.props.openErrorMsg()
            })
        })

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
        this.props.loadChatBoard(item)
        this.props.history.push("/chat-team")
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
        let nextIndex = this.state.indexActive - 1 < 0 ? this.state.yourTeams.length - 1 : this.state.indexActive - 1;
        this.setState({ indexActive: nextIndex });
    }
    clickRightHandler = () => {
        let nextIndex = this.state.indexActive + 1 === this.state.yourTeams.length ? 0 : this.state.indexActive + 1;
        this.setState({ indexActive: nextIndex });
    }
    render() {
        let { yourTeams, bySearch } = this.state
        var searchResults = []
        if (yourTeams.length > 0) {
            searchResults = yourTeams[this.state.indexActive].map((item, index) => {
                return (<ItemSearchTeam image={item.generalInfo.file}
                    view={this.props.teamsBySearch.length > 0 ? () => this.viewTeamHandler(item) : () => this.loadTeamMessageBoard(item)}
                    fade={item.membersId.length != 0 && item.membersId.length >= item.generalInfo.numberOfTeam && bySearch ? true : false}
                    sportType={item.generalInfo.typeOfSportChosen}
                    nameOfTeam={item.generalInfo.nameOfTeam}
                    key={index}
                    about={item.generalInfo.aboutTheTeamChosen}
                    title={this.props.teamsBySearch.length > 0? "View" : "Your Team"}
                    dateType={item.dateAndTime.pickType} />)
            })
        } else {
            searchResults = (<p>You are Not a member of any team</p>)
        }
        let displayMainJsx = (
            <div >
                <Tabs />
                <div className="slider">
                    <h3>{this.props.teamsBySearch.length > 0 ? "Your Search Result" : "Your Teams"}</h3>
                    <div className="slides"> {searchResults}</div>
                    <div onClick={this.clickLeftHandler} className="btnLeft fas fa-angle-double-left "></div>
                    <div onClick={this.clickRightHandler} className="btnRight fas fa-angle-double-right"></div>
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
        yourTeams: state.teamCreateInfo.yourTeams,
        teamsBySearch: state.teamCreateInfo.teamsBySearch

    };
};
const mapStateDispatch = dispatch => {
    return {
        processRequestMsg: () => dispatch(actionType.processRequestMsg()),
        joinTeam: (data) => dispatch(actionType.joinTeam(data)),
        viewTeamToJoin: (team) => dispatch(actionType.viewTeamToJoin(team)),
        resetModel: () => dispatch(actionType.resetModel()),
        loadChatBoard:(team)=>dispatch(actionType.loadChatBoard(team)),
        isMemberMsg: () => dispatch(actionType.isMemberMsg()),
        openErrorMsg: () => dispatch(actionType.openErrorMsg()),
        openErrorMsg: () => dispatch(actionType.openErrorMsg()),
        getUsersTeams: (data) => dispatch(actionType.getUsersTeams(data))

    };
};
export default connect(mapStateHandler, mapStateDispatch)(YourTeams)