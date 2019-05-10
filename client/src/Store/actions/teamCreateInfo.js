import * as actionType from "./actionType";
import { getRequestData } from "../../RequestData/RequestData";
import {
  GET_USER_TEAMS,
  GET_TEAMS_BY_DISTANCE,
  JOIN_TEAM,
  SEND_EMAIL_TOKEN,
  CONFIRM_TOKEN_MATCH,
  NEW_TEAM,
  MANAGER_INFO_EXIST,
  FIND_TEAM_BY_CATEGORIES,
  RATE_TEAM,
  GET_USER_CALENDER
} from "../../Url/Url";

export const saveGeneralInfo = general => {
  return {
    type: actionType.SAVE_GENERAL_INFO,
    payload: general
  };
};

export const saveDataAndTime = dateAndTime => {
  return {
    type: actionType.SAVE_DATE_TIME,
    payload: dateAndTime
  };
};
export const saveLocation = location => {
  return {
    type: actionType.SAVE_LOCATION,
    payload: location
  };
};
export const saveEmailManger = emailManager => {
  return {
    type: actionType.SAVE_EMAIL_MANAGER,
    payload: emailManager
  };
};
export const sendEmailToken = dataSent => {
  var data = {
    url: SEND_EMAIL_TOKEN,
    method: "post",
    headers: "",
    data: dataSent,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const checkValidToken = dataSent => {
  var data = {
    url: CONFIRM_TOKEN_MATCH,
    method: "post",
    headers: "",
    data: dataSent,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        console.log("res valid token", res);
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};

export const submitManagerCard = (dataSent, email) => {
  var data = {
    url: NEW_TEAM,
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
      id: email
    },
    data: dataSent,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        console.log("result ", res);
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const checkIfUserIsManager = email => {
  var data = {
    url: MANAGER_INFO_EXIST,
    method: "get",
    headers: "",
    data: email,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const loadBySearchResult = data => {
  return {
    type: actionType.SEARCH_TEAMS,
    payload: data
  };
};
export const getTeamsByCategoryType = dataSent => {
  var data = {
    url: FIND_TEAM_BY_CATEGORIES,
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    data: dataSent,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        dispatch(loadBySearchResult(res.data));
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const viewTeamToJoin = teamInfo => {
  console.log("action", teamInfo);
  return dispatch => {
    dispatch(saveGeneralInfo(teamInfo.generalInfo));
    dispatch(saveDataAndTime(teamInfo.dateAndTime));
    dispatch(saveLocation(teamInfo.location));
    dispatch(saveEmailManger(teamInfo.emailManger));
  };
};

export const setLocationUser = loc => {
  return {
    type: actionType.SET_USER_LOCATION,
    payload: loc
  };
};
export const joinTeam = dataSent => {
  var data = {
    url: JOIN_TEAM,
    method: "post",
    headers: {
      id: dataSent.id
    },
    data: dataSent,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        return Promise.resolve(res);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const getUsersTeams = dataEmail => {
  var data = {
    url: GET_USER_TEAMS,
    method: "get",
    headers: {
      id: dataEmail.id
    },
    data: "",
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        dispatch(loadYourTeams(res.data));
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const clearSearchTeamArray = () => {
  return {
    type: actionType.CLEAR_SEARCH_TEAM
  };
};
export const rateATeam = ratingInfo => {
  var data = {
    url: RATE_TEAM,
    method: "post",
    headers: "",
    data: ratingInfo,
    params: ""
  };

  return dispatch => {
    return getRequestData(data)
      .then(res => {
        // dispatch(updateTeams(res.data));
        return Promise.resolve(res.status);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
export const loadYourTeams = data => {
  return {
    type: actionType.YOUR_TEAMS,
    payload: data
  };
};
export const clearAllTeams = () => {
  return {
    type: actionType.CLEAR_ALL_TEAMS
  };
};
export const loadChatBoard = teamSelected => {
  return {
    type: actionType.LOAD_CHAT_GROUP,
    payload: teamSelected
  };
};
export const clearSelectedTeam = () => {
  return {
    type: actionType.CLEAR_SELECTED_TEAM,
    payload: []
  };
};

export const getTeamsByParams = paramsUser => {
  var data = {
    url: GET_TEAMS_BY_DISTANCE,
    method: "post",
    headers: "",
    data: "",
    params: paramsUser
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        dispatch(loadBySearchResult(res.data));
        Promise.resolve(res.data);
      })
      .catch(err => {
        Promise.reject(err);
      });
  };
};
export const loadCalender = calender => {
  return {
    type: actionType.LOAD_USER_CALENDER,
    payload: calender
  };
};
export const getUserCalender = email => {

  var data = {
    url: GET_USER_CALENDER,
    method: "post",
    headers: "",
    data: email,
    params: ""
  };
  return dispatch => {
    return getRequestData(data)
      .then(res => {
        dispatch(loadCalender(res.data));
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  };
};
