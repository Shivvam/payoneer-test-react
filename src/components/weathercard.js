import React,{useEffect,useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import allActions  from '../actions/action';

const WeatherCard = (props) => {
	
	 const [avgTemperatureofDay,setavgTemperatureofDay] = useState(0);
	 const temperatureUnit = useSelector(state => state.temperatureUnit);
	 const dispatch = useDispatch();

	useEffect(()=>{
		let isCancelled = false;
		if(!isCancelled){
				if(!avgTemperatureofDay){
					 calculateAverageTemp();
				}
			
		}
		return () => {
			isCancelled = true;
		}

	},[temperatureUnit]);


	const calculateAverageTemp = () => {
		let totalT = props.weatherinfo.reduce((acc,cv)=>{
			return acc+ cv.main.temp ;
		},0);
		let avgTemp = totalT/(props.weatherinfo.length);
		setavgTemperatureofDay(avgTemp.toFixed(2));
	}

	const displayTempAsPerUnit = (tempVal,unitVal) => {
		switch(unitVal){
			case "c":
				return (tempVal-273.15).toFixed(2);
				break;
			case "f":
				return (((tempVal-273.15)*(9/5))+32).toFixed(2);
				break;
			default:
				return (((tempVal-273.15)*(9/5))+32).toFixed(2);
				break;
		}
	}

	const displayBarChart = (idx) => {
		  dispatch(allActions.setSelectedDayCardInfo({"date":props.weatherdate,"selected":idx}))
	}


	const getFormattedDate = (dateYYYYMMDD) => {
		const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		let dateDestructArray = dateYYYYMMDD.split("-");
		return dateDestructArray[2]+"-"+months[parseInt(dateDestructArray[1])-1]+"-"+dateDestructArray[0];
	}
	 

	return(
		<div className="mx-2 cursor-pointer" onClick={()=>{displayBarChart(props.indexval)}}>
			<div className={props.isActive?"border rounded-l border-2 border-green-300 bg-gray-300":"border rounded-l border-2 border-gray-200 bg-gray-100"}>
			<div className="p-3">
				<p className="text-sm text-gray-800">{getFormattedDate(props.weatherdate)}</p>
				<p className="text-l text-indigo-800 pt-2">{displayTempAsPerUnit(avgTemperatureofDay,temperatureUnit)} &#176;{temperatureUnit}</p>
			</div>
			</div>
		</div>
	);
}

export default WeatherCard;