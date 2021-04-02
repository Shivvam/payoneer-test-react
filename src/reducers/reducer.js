const reducerFunction = (state = {}, action) => {
    switch(action.type){
        case "SET_SELECTED_WEATHER_CARD":
            return {
            ...state,
            chartDataOfDay: action.payload
            }
        case "SET_TEMP_UNIT":
            return {
            ...state,
            temperatureUnit: action.payload
            }
        default: 
            return state
    }
}

export default reducerFunction;