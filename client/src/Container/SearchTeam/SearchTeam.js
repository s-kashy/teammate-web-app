import React, { Component } from "react"
import "./SearchTeam.css"
import Tabs from "../../Component/Tabs/Tabs";
import { connect } from "react-redux"
import Aux from "../../Hoc/Hoc"
import CheckBox from "../../Component/CheckBox/CheckBox"
import TeamManagerCard from "../TeamCreator/TeamManagerCard/TeamManagerCard"
import * as actionType from "../../Store/actions/index"
import MapTeamSearchLayout from "./MapTeamSearchLayout/MapTeamSearchLayout"
import ItemSearchTeam from "../../Component/ItemSearchTeam/ItemSearchTeam"



class SearchTeam extends Component {

    state = {
        user: {
            sportInterest: {
                Running: { value: false },
                Bicycle: { value: false },
                basketball: { value: false },
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
        idOfTeam: ""

    }
    removeJoinHandler = () => {
        this.setState({ showTeamCard: !this.state.showTeamCard })
    }
    JoinTeamHandler = () => {
        let data = {
            id: this.state.idOfTeam,
            userEmail: this.props.emailRegister
        }
        this.props.joinTeam(data).then(res => {
            if (res.status === 201) {
                this.props.openErrorMsg()
            } else {
                this.props.history.push("/")
            }
        }).catch(err => {
            this.props.openErrorMsg()
        })
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
                console.log(res)
                this.setState({ resultSearch: res.data, noTeamMsg: false }, () => {
                    console.log("team", res.data)
                    if (this.state.resultSearch === undefined || this.state.resultSearch.length === 0) {
                        this.setState({ noTeamMsg: true })
                    }
                })
            }).catch(err => {
                this.props.openErrorMsg()
            })
        }

    }
    viewTeamHandler = (item) => {
        console.log(item._id)
        this.props.viewTeamToJoin(item)
        this.setState({ showTeamCard: !this.state.showTeamCard, idOfTeam: item._id })
    }
    onChangeCheckBoxHandler = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.sportInterest[event.target.name].value = !userInfo.sportInterest[event.target.name].value
        this.setState({ user: userInfo }, () => {

        })
    }

    clickLeftHandler = () => {
        let nextIndex = this.state.indexActive - 1 < 0 ? this.state.resultSearch.length - 1 : this.state.indexActive - 1;
        this.setState({ indexActive: nextIndex });
    }
    clickRightHandler = () => {
        let nextIndex = this.state.indexActive + 1 === this.state.resultSearch.length ? 0 : this.state.indexActive + 1;
        this.setState({ indexActive: nextIndex });
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
        const { resultSearch, noTeamMsg } = this.state
        let searchResults = []
        if (resultSearch.length > 0) {
            searchResults = resultSearch.map(item => {

                return (<ItemSearchTeam image={item.generalInfo.file}
                    clickLeft={this.clickLeftHandler}
                    clickRight={this.clickRightHandler}
                    view={() => this.viewTeamHandler(item)}
                    fade={item.membersId.length != 0 && item.membersId.length >= item.generalInfo.numberOfTeam ? true : false}
                    sportType={item.generalInfo.typeOfSportChosen}
                    nameOfTeam={item.generalInfo.nameOfTeam}
                    dateType={item.dateAndTime.pickType} />)
            })
        }
        let arrayOfObjectSport = this.convertObjectToArray()
        let arrayOfCheckBox = arrayOfObjectSport.map((item, index) => {
            return (<CheckBox value={item.value}
                click={(e) => this.onChangeCheckBoxHandler(e)}
                name={item.key} key={index} classCheckbox="check-box-search-team" />)
        })

        return (<div>{!this.state.showTeamCard ?
            <Aux>
                <Tabs />
                <div className="wrapper-search-team" >
                    <div className="search-by-categorie">
                        <div className="msg-search-categorie">
                            <p>Search By Categorie</p></div>
                        <div className="wrapper-check-box">
                            {arrayOfCheckBox}
                        </div>
                        <div className="submit-search-wrapper"><button onClick={this.onClickSearchHandler} className="btn-search-team">Search</button></div>
                        <div className="wrapper-items-search-team">
                            {searchResults[this.state.indexActive]}
                            {noTeamMsg && (<p>No Teams Found</p>)}
                        </div>

                    </div>
                    <div className="map-search-team-wrapper">
                        <MapTeamSearchLayout />
                    </div>
                </div>
            </Aux> : <TeamManagerCard cancel="Go Back" join="Join" joinTeamHandler={this.JoinTeamHandler} leftClick={this.removeJoinHandler} />}</div>)
    }
}
const mapStateHandler = state => {
    return {
        emailRegister: state.user.email
    };
};
const mapStateDispatch = dispatch => {
    return {

        viewTeamToJoin: (teamInfo) => dispatch(actionType.viewTeamToJoin(teamInfo)),
        getTeamsByCategoryType: (data) => dispatch(actionType.getTeamsByCategoryType(data)),
        joinTeam: (data) => dispatch(actionType.joinTeam(data)),
        openErrorMsg: () => dispatch(actionType.openErrorMsg())
    };
}
export default connect(mapStateHandler, mapStateDispatch)(SearchTeam)