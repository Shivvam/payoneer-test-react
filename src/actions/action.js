  
const setSelectedDayCardInfo = (weatherObj) => {
    return {
        type: "SET_SELECTED_WEATHER_CARD",
        payload: weatherObj
    }
    
}

const setTemperatureUnit = (unitVal) => {
    return {
        type: "SET_TEMP_UNIT",
        payload: unitVal
    }
    
}

export default {
    setSelectedDayCardInfo,
    setTemperatureUnit
}