import React, { Component } from "react"
import DayPicker, { DateUtils } from 'react-day-picker';
import moment from "moment"
import Spinner from "../../../Component/Ui/Spinner/Spinner"
import "./DateAndTime.css"
import { connect } from "react-redux";
import * as actionType from "../../../Store/actions/index"
import _ from "lodash"
import TimePicker from 'rc-time-picker';
import CheckBox from "../../../Component/CheckBox/CheckBox"
import RadioButton from "../../../Component/RadioButton/RadioButton"
import ContralTeamCreate from "../ContralTeamCreate/ContralTeamCreate"

class DateAndTime extends Component {
    state = {
        isLoading: true,
        isValid: false,
        startTime: "08:00",
        endTime: "08:00",
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
    createObject = (type) => {
        const { startTime, endTime, selectedDays, dayOfTheWeekPicker, pickType } = this.state
        switch (type) {
            case "Daily":
                return {
                    pickType: pickType,
                    startTime: startTime,
                    endTime: endTime,
                }
            case "Weekly":
                return {
                    pickType: pickType,
                    startTime: startTime,
                    endTime: endTime,
                    dayOfTheWeekPicker: dayOfTheWeekPicker.filter(item => {
                        return item.check !== false
                    })
                }
            case "Monthly":
                return {
                    pickType: pickType,
                    startTime: startTime,
                    endTime: endTime,
                    selectedDays: selectedDays
                }
        }

    }
    componentDidMount() {
        const { pickType, startTime, endTime } = this.props.dateAndTime
        if (this.props.dateAndTime !== "") {
            if (pickType === "Daily") {
                this.setState({ startTime, endTime, pickType, isValid: true }, () => { })
            }
            else if (pickType === "Weekly") {
                const { dayOfTheWeekPicker, pickType } = this.props.dateAndTime
                let tempStateDayCopyWeek = JSON.parse(JSON.stringify(this.state.dayOfTheWeekPicker))
                let timePickerCopy = JSON.parse(JSON.stringify(this.state.timePicker))
                for (let i = 0; i < dayOfTheWeekPicker.length; i++) {
                    for (let j = 0; j < tempStateDayCopyWeek.length; j++) {
                        if (dayOfTheWeekPicker[i].value == tempStateDayCopyWeek[j].value) {
                            tempStateDayCopyWeek[j].check = true
                        }
                    }
                }

                timePickerCopy[1].checked = true
                this.setState({ dayOfTheWeekPicker: tempStateDayCopyWeek, isValid: true, timePicker: timePickerCopy, pickType }, () => {

                })

            }
            else if (pickType === "Monthly") {
                const { selectedDays, startTime, endTime, pickType } = this.props.dateAndTime
                let timePickerCopy = JSON.parse(JSON.stringify(this.state.timePicker))
                timePickerCopy[2].checked = true
                this.setState({ selectedDays, startTime, endTime, pickType, isValid: true, timePicker: timePickerCopy })
            }
        }
    }
    checkValidFrom = () => {
        const { pickType, startTime, endTime, dayOfTheWeekPicker, selectedDays } = this.state
        if (pickType === "Daily") {
            if (startTime !== endTime) {
                this.setState({ isValid: true }, () => {
                    this.props.saveDataAndTime(this.createObject(this.state.pickType))
                })
            } else {
                this.setState({ isValid: false })
            }
        }
        else if (pickType === "Weekly") {
            if ((_.reject(_.map(dayOfTheWeekPicker, _.partialRight(_.pick, 'check')), { check: false }).length > 0) && startTime !== endTime) {
                this.setState({ isValid: true }, () => {
                    this.props.saveDataAndTime(this.createObject(this.state.pickType))
                })
            } else {
                this.setState({ isValid: false })
            }
        }
        else if (pickType === "Monthly") {
            if (selectedDays.length > 0 && startTime !== endTime) {
                this.setState({ isValid: true }, () => {
                    this.props.saveDataAndTime(this.createObject(this.state.pickType))
                })
            } else {
                this.setState({ isValid: false })
            }
        }
    }
    onChangeTimeHandler = (value, name) => {
        let time = value && value.format('HH:mm');
        if (name === "start") {
            if (time == null) {
                time = "08:00"
            }
            this.setState({ startTime: time }, () => {
                this.checkValidFrom()
            })
        }
        else {
            if (time == null) {
                time = "20:00"
            }
            this.setState({ endTime: time }, () => {
                this.checkValidFrom()
            })
        }

    }

    onClickCheckBoxHandler = (event) => {
        let checkBoxName = event.target.name
        let dayOfTheWeekPicker = JSON.parse(JSON.stringify(this.state.dayOfTheWeekPicker))
        for (let i = 0; i < dayOfTheWeekPicker.length; i++) {
            if (dayOfTheWeekPicker[i].value === checkBoxName) {
                console.log(dayOfTheWeekPicker[i].value)
                dayOfTheWeekPicker[i].check = !dayOfTheWeekPicker[i].check

            }
        }
        this.setState({ dayOfTheWeekPicker: dayOfTheWeekPicker }, () => {
            this.checkValidFrom()
        })

    }
    resetCalendarHandler = () => {
        let selectedDay = JSON.parse(JSON.stringify(this.state.selectedDay))
        selectedDay = []
        this.setState({ selectedDay: selectedDay })
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
        this.setState({ selectedDays }, () => {
            this.checkValidFrom()
        })
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
        this.setState({ timePicker: timePicker, pickType: value, isValid: false }, () => {
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
            return (<CheckBox
                value={item.check}
                classCheckbox="checkbox-days-date-time"
                click={(e) => this.onClickCheckBoxHandler(e)}
                id={item.value}
                name={item.value}
                label="label-day-picker-checkbox"
                key={index} />)
        })
        return (<div>
            {this.state.isLoading ? <div className='main-date-time'>
                <div className="main-controller-date-time-left" >
                    <div className="time-picker-general-wrapper"  >

                        <div className="start-time-div">
                            <span className="label-time-picker-start">Start Time</span>
                            <TimePicker value={moment(this.state.startTime, 'HH:mm')} defaultValue={moment(this.state.startTime, 'HH:mm')} name="startTime" showSecond={false}
                                onChange={(e) => this.onChangeTimeHandler(e, "start")} allowEmpty={true} className="start-time-date-time" label="start" />
                        </div>
                        <div className="end-time-div">
                            <span className="label-time-picker-end">End Time</span>
                            <TimePicker value={moment(this.state.endTime, 'HH:mm')} allowEmpty={true} hideDisabledOptions={true}
                                defaultValue={moment(this.state.endTime, 'HH:mm')}
                                name="endTime" placeholder='end time'
                                showSecond={false}
                                onChange={(e) => this.onChangeTimeHandler(e, "end")}
                                className="end-time-date-time" />

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
                    <ContralTeamCreate class="contral-team-date-time" leftClick={this.props.leftClick} rightClick={this.props.rightClick} disabled={!this.state.isValid} />

                </div>

            </div> : <Spinner />}</div>)
    }

}

const mapStateHandler = state => {
    return {
        dateAndTime: state.teamCreateInfo.dateAndTime,
    };
};
const mapStateDispatch = dispatch => {
    return {
        saveDataAndTime: (dateAndTime) => dispatch(actionType.saveDataAndTime(dateAndTime)),


    };
};
export default connect(mapStateHandler, mapStateDispatch)(DateAndTime)