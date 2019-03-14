import React, { Component } from "react"
import DayPicker, { DateUtils } from 'react-day-picker';
import ReactTimeSelect from "react-time-select"
import "./DateAndTime.css"
import CheckBox from "../../../Component/CheckBox/CheckBox"
import RadioButton from "../../../Component/RadioButton/RadioButton"
import ContralTeamCreate from "../ContralTeamCreate/ContralTeamCreate"

class DateAndTime extends Component {

    state = {
        isValid:false,
        startTime: "",
        endTime: "",
        selectedDays: [],
        pickType: "Daily",
        date: new Date(),
        timePicker: [
            { value: "Daily", checked: true },
            { value: "Weekly", checked: false },
            { value: "Monthly", checked: false },
        ],
        dayOfTheWeekPicker: [
            { value: "Sunday", check: false },
            { value: "Monday", check: false },
            { value: "Tuesday", check: false },
            { value: "Wednesday", check: false },
            { value: "Thursday", check: false },
            { value: "Friday", check: false },
            { value: "Saturday", check: false },

        ]



    }
    checkValidFrom=()=>{
        
    }
    onChangeTimeHandler = (event) => {
        console.log("time",event)
        
    }
    onClickCheckBoxHandler = (value) => {
        let dayOfTheWeekPicker = JSON.parse(JSON.stringify(this.state.dayOfTheWeekPicker))
        for (let i = 0; i < dayOfTheWeekPicker.length; i++) {
            if (dayOfTheWeekPicker[i].value === value) {
                dayOfTheWeekPicker[i].check = !dayOfTheWeekPicker[i].check
                break;
            }
        }
        this.setState({ dayOfTheWeekPicker: dayOfTheWeekPicker })

    }
    resetCalendarHandler = () => {
      
        let selectedDay = JSON.parse(JSON.stringify(this.state.selectedDay))
        selectedDay = []
        this.setState({ selectedDay: [] })
    }
    handleDayClick = (day, { selected }) => {
        const { selectedDays } = this.state;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
        } else {
            selectedDays.push(day);
        }
        this.setState({ selectedDays })
    }
    onClickRadioHandler = (value) => {
        let timePicker = JSON.parse(JSON.stringify(this.state.timePicker))
        timePicker.forEach(element => {
            if (element.value === value) {
                element.checked = true

            } else {
                element.checked = false
            }
        });
        this.setState({ timePicker: timePicker, pickType: value },()=>{
            this.checkValidFrom()
        })
    }

    render() {

        const { timePicker, dayOfTheWeekPicker, pickType } = this.state
        let arrayRadio = timePicker.map(item => {
            return (<RadioButton label={item.value}
                classRadio="single-date-time-radio"
                key={item.value}
                click={(e) => this.onClickRadioHandler(item.value)}
                id={item.value} name="time" checked={item.checked} />)
        })
        let arrayDayPicker = dayOfTheWeekPicker.map((item, index) => {

            return (<CheckBox name={item.value}
                value={item.check}
                classCheckbox="checkbox-days-date-time"
                click={(e) => this.onClickCheckBoxHandler(item.value)}
                id={item.value}
                label="label-day-picker-checkbox"
                key={index} />)
        })
        return (<div className='main-date-time'>

            <div className="main-controller-date-time-left" >
                <div className="time-picker-general-wrapper"  >

                    <div className="start-time-div">
                        <span className="label-time-picker-start">Start Time</span>
                        <ReactTimeSelect name="startTime" onChange={(e) => this.onChangeTimeHandler(e)} className="start-time-date-time" label="start" /><span className="icon-start-date-time">
                            <i className="fas fa-arrow-down"></i></span>
                    </div>
                    <div className="end-time-div">
                        <span className="label-time-picker-end">End Time</span>
                        <ReactTimeSelect name="endTime"  onChange={(e) => this.onChangeTimeHandler(e)} className="end-time-date-time" label="start" />
                        <span className="icon-end-date-time">
                            <i className="fas fa-arrow-down"></i></span>
                    </div>
                    <div className="radio-btn-date-time-wrapper">
                        {arrayRadio}
                    </div>

                </div>
                <div className="main-controller-date-time-left-right">
                    {pickType === "Weekly" && (<div className="weekly-choice-date-time">{arrayDayPicker}</div>)}
                    {pickType === "Monthly" && (<div className="monthly-choice-date-time"><DayPicker selectedDays={this.state.selectedDays}
                        onDayClick={this.handleDayClick}
                        fromMonth={new Date(new Date().getFullYear(), new Date().getMonth())} /></div>)}
                    {/* <div><button className="reset-date-input">Reset Dates</button></div> */}
                </div>

            </div>
            <div className="msg-date-time-contral-wrapper">
                <div className="msg" >
                    <strong> type and scrambled it
                    to make a type specimen book. It has
                    survived not only fivly unchanged. It was
                     popularised in the 1960s with the release
                 of Letraset sheets </strong>
                </div>
                <ContralTeamCreate class="contral-team-date-time" leftClick={this.props.leftClick} rightClick={this.props.rightClick} disabled={!this.state.isValid}  />

            </div>
           
        </div>)
    }


}
export default DateAndTime