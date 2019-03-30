import React, { Component } from "react"
import "./SearchTeam.css"
import Tabs from "../../Component/Tabs/Tabs";
import {connect} from "react-redux"
import CheckBox from "../../Component/CheckBox/CheckBox"
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
        }
    }
    onClickSearchHandler = () => {
        let data=[]
        let sportInterest = JSON.parse(JSON.stringify(this.state.user.sportInterest))
        for (let key in sportInterest){
            if (sportInterest[key].value){
                data.push(key)
            }
        }
  data=Object.assign({}, data); 
        this.props.getTeamsByCategoryType(data).then(res=>{
            console.log("type",res)
        }).catch(err=>{
            console.log(err)
        })

     }
    onChangeCheckBoxHandler = (event) => {
        let userInfo = JSON.parse(JSON.stringify(this.state.user))
        userInfo.sportInterest[event.target.name].value = !userInfo.sportInterest[event.target.name].value
        this.setState({ user: userInfo }, () => { 
            
        })
    }
    onClickLeftHandler=()=>{}
    onClickRightHandler=()=>{}
    convertObjectToArray = () => {
        let arrayObject = [];
        const { sportInterest } = this.state.user
        for (let key in sportInterest) {
            arrayObject.push({ key: key, value: sportInterest[key].value })
        }
        return arrayObject
    }
    render() {
        let arrayOfObjectSport = this.convertObjectToArray()
        let arrayOfCheckBox = arrayOfObjectSport.map((item, index) => {
            return (<CheckBox value={item.value}
                click={(e) => this.onChangeCheckBoxHandler(e)}
                name={item.key} key={index} classCheckbox="check-box-search-team" />)
        })

        return (<div>
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
                        <ItemSearchTeam />
                        <ItemSearchTeam />
                        <div className="icon-contral-search-item">
                        <span onClick={this.onClickLeftHandler}><i className="fas fa-backward"></i></span>
                         <span onClick={this.onClickRightHandler}><i className="fas fa-forward"></i></span>   
                        </div>
                    </div>
                </div>
                <div className="map-search-team-wrapper">
                    <MapTeamSearchLayout />
                </div>
            </div>
        </div>)
    }
}
const mapStateHandler = state => {
    return {
        emailRegister: state.user.email
    };
};
const mapStateDispatch = dispatch => {
    return {
        getTeamsByCategoryType:(data)=>dispatch(actionType.getTeamsByCategoryType(data))
    };
};
export default connect(mapStateHandler,mapStateDispatch)(SearchTeam)