import React, { Component } from "react"
import "./SearchTeam.css"
import { connect } from "react-redux"
import CheckBox from "../../Component/CheckBox/CheckBox"
import * as actionType from "../../Store/actions/index"
import SliderRc from "../SliderRc/SliderRc"
import TeamCard from "../TeamCreator/TeamManagerCard/TeamManagerCard"
import MapTeamSearchLayout from "./MapTeamSearchLayout/MapTeamSearchLayout"

class SearchTeam extends Component {

    componentDidMount() {
        this.findTeamsByParams()
    }
    state = {
        user: {
            sportInterest: {
                Running: { value: false },
                Bicycle: { value: false },
                Basketball: { value: false },
                Soccer: { value: false },
                Tennis: { value: false },
                Volleyball: { value: false },
                Aerobics: { value: false },
                Yoga: { value: false },
                Bowling: { value: false },
                Golf: { value: false },
                Poker: { value: false },
                Snooker: { value: false }
            },

        },
        resultSearch: [],
        indexActive: 0,
        showTeamCard: false,
        noTeamMsg: false,
        idOfTeam: "",
        valueRc: 10,
        joinATeam: false,
        teamId: ""
    }
    createParamsUrl = () => {
        const { lat, lng } = this.props.userLocation
        const params = new URLSearchParams();
        params.append("lat", lat)
        params.append("lng", lng)
        params.append("dist", this.state.valueRc)
        return params
    }
    onClickSearchHandler = () => {
        let data = []
        let sportInterest = JSON.parse(JSON.stringify(this.state.user.sportInterest))
        for (let key in sportInterest) {
            if (sportInterest[key].value) {
                data.push(key)
            }
        }
        if (data.length > 0) {
            this.props.getTeamsByCategoryType(data).then(res => {
                if (this.props.teamsBySearch === undefined || this.props.teamsBySearch.length === 0) {
                    this.setState({ noTeamMsg: true })
                } else {
                    this.props.history.push("/your-teams")
                }
            }).catch(err => {
                this.props.openErrorMsg()
            })
        }

    }
    joinTeamHandler = () => {
        let data = {
            id: this.state.teamId,
            userEmail: this.props.emailRegister
        }
        this.props.processRequestMsg()
        this.props.joinTeam(data).then(res => {
            if (res.status === 201) {
                this.props.isMemberMsg()
            } else {
                this.props.resetModel()
                this.setState({ joinATeam: !this.state.joinATeam })
            }
        }).catch(err => {
            this.props.openErrorMsg()
        })
    }
    TeamCardHandler = (id = "") => {
        this.setState({ joinATeam: !this.state.joinATeam, teamId: id }, () => {
        })
    }
    findTeamsByParams = () => {
        this.props.getTeamsByParams(this.createParamsUrl()).then(res => {
        }).catch(err => {
            this.props.openErrorMsg()
        })
    }
    onChangeRcSliderHandler = (value) => {
        this.setState({ valueRc: value }, () => {
            this.findTeamsByParams()
        })

    }
    onChangeCheckBoxHandler = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.sportInterest[event.target.name].value = !userInfo.sportInterest[event.target.name].value
        this.setState({ user: userInfo }, () => {

        })
    }
    convertObjectToArray = () => {
        let arrayObject = [];
        const { sportInterest } = this.state.user
        for (let key in sportInterest) {
            arrayObject.push({ key: key, value: sportInterest[key].value })
        }
        return arrayObject
    }
    render() {
        const { noTeamMsg } = this.state
        let arrayOfObjectSport = this.convertObjectToArray()
        let arrayOfCheckBox = arrayOfObjectSport.map((item, index) => {
            return (<CheckBox value={item.value}
                click={(e) => this.onChangeCheckBoxHandler(e)}
                name={item.key} key={index} classCheckbox="check-box-search-team" />)
        })

        return (<div>
            {!this.state.joinATeam ?
                <div className="wrapper-search-team" >
                    <div className="search-by-categorie">
                        <div className="msg-search-categorie">
                            <p style={{ color: "#34495e" }}>Search By Category</p></div>
                        <div className="wrapper-check-box">
                            {arrayOfCheckBox}
                        </div>
                        <div className="submit-search-wrapper"><button onClick={this.onClickSearchHandler} className="btn-search-team">Search</button></div>
                        <div className="wrapper-items-search-team">
                            {noTeamMsg && (<p className="text-no-team-search-Team">No Teams Found</p>)}
                        </div>
                    </div>
                    <div className="map-search-team-wrapper">
                        <div className="rc-child-search-team">
                            <SliderRc value={this.state.valueRc} change={this.onChangeRcSliderHandler} />
                        </div>
                        <div className="map-search-bar-wrapper">
                            <MapTeamSearchLayout displayTeam={this.TeamCardHandler} findTeamsByParams={this.findTeamsByParams} />
                        </div>
                    </div>
            </div> : <TeamCard
                    leftClick={this.TeamCardHandler}
                    joinTeamHandler={this.joinTeamHandler}
                    cancel="Go Back"
                    join="Join" />}
        </div>)
    }
}
const mapStateHandler = state => {
    return {
        emailRegister: state.user.email,
        yourTeams: state.teamCreateInfo.yourTeams,
        teamsBySearch: state.teamCreateInfo.teamsBySearch,
        userLocation: state.teamCreateInfo.userLocation
    };
};
const mapStateDispatch = dispatch => {
    return {
        resetModel: () => dispatch(actionType.resetModel()),
        processRequestMsg: () => dispatch(actionType.processRequestMsg()),
        viewTeamToJoin: (teamInfo) => dispatch(actionType.viewTeamToJoin(teamInfo)),
        getTeamsByCategoryType: (data) => dispatch(actionType.getTeamsByCategoryType(data)),
        joinTeam: (data) => dispatch(actionType.joinTeam(data)),
        isMemberMsg: () => dispatch(actionType.isMemberMsg()),
        openErrorMsg: () => dispatch(actionType.openErrorMsg()),
        getTeamsByParams: (params) => dispatch(actionType.getTeamsByParams(params))
    };
}
export default connect(mapStateHandler, mapStateDispatch)(SearchTeam)