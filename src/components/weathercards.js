import React,{useEffect} from 'react';
import WeatherCard from './weathercard';
import BarChart from './barchart';
import {useSelector} from 'react-redux';


const WeatherCards = (props) => {
	
  const selectedCard =  useSelector(state => state.chartDataOfDay);
	 
	 useEffect(()=>{
		let isCancelled = false;
		if(!isCancelled){
				 
			
		}
		return () => {
			isCancelled = true;
		}

	},[props.weatherData]);


	return(
		<div className="border rounded   mx-auto  my-2">
		 

		 <div className="flex p-1 justify-between">
			{props.weatherData&&props.weatherData.map((it,index)=>{
				return(
						<WeatherCard weatherdate={it[0]} weatherinfo={it[1]} key={index} indexval={index} isActive={selectedCard?.selected===index} />
				)
			
			})}
		</div>
 
	 
		<div className="p-2 max-w-xs">
			<BarChart  currentPageWeatherData={props.weatherData} />
		</div>
	    

		</div>
	);
}

export default WeatherCards;