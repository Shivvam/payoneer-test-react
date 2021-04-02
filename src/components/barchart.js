import React,{useEffect,useState} from 'react';
import {useSelector} from 'react-redux';


const BarChart = (props) => {
	
	   const chartDataOfDay = useSelector(state => state.chartDataOfDay);
	   const temperatureUnit = useSelector(state => state.temperatureUnit);
	   const [maxTemp,setmaxTemp] = useState(0);
	   const [minTemp,setminTemp] = useState(0);
	   const [scalerFactor,setscalerFactor] = useState(1);
 	   const {currentPageWeatherData} = props;
	   const currentDateWeatherData = currentPageWeatherData[chartDataOfDay?.selected||0][1];
	  

	useEffect(()=>{
		let isCancelled = false;
		if(!isCancelled){
			 setmaxTemp(Number(displayTempAsPerUnit(getMax()["maxTemp"],temperatureUnit)));
 			 setminTemp(Number(displayTempAsPerUnit(getMax()["minTemp"],temperatureUnit)));
			 if(temperatureUnit){
				  configureScalerFactor(temperatureUnit);
			 }
			  
		}
		return () => {
			isCancelled = true;
		}

	},[currentPageWeatherData,maxTemp,temperatureUnit]);

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


	const configureScalerFactor = (unitVal) => {
		switch(unitVal){
			case "c":
				return setscalerFactor(5);
				break;
			case "f":
				return setscalerFactor(1);
				break;
			default:
				return setscalerFactor(1);
				break;
		}
	}

	const getMax = () => {
		let maxTemp = 0;
		let minTemp = 0;
		
		if(currentDateWeatherData){
			 
			 let maxTempA = currentDateWeatherData.map((cv)=>{
			 	return Number(cv["main"]["temp"]);
			 });
			 maxTemp = Math.max(...maxTempA);
			 minTemp = Math.min(...maxTempA);
		}
		return {
			maxTemp,
			minTemp
		};
	}
 

	const getFormattedDate = (dateYYYYMMDD) => {
		const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		let dateDestructArray = dateYYYYMMDD.split("-");
		return dateDestructArray[2]+"-"+months[parseInt(dateDestructArray[1])-1]+"-"+dateDestructArray[0];
	}
	 

	return(
			<div className="my-1 ">
			{chartDataOfDay?.date&&
			<div className="border rounded pb-2">

				<p className="text-sm text-gray-600 mx-2 pb-2"> {chartDataOfDay?.date&&getFormattedDate(chartDataOfDay.date)}   </p>
				<div className="flex justify-start">
				{chartDataOfDay&&currentDateWeatherData.map((cd,idx)=>{
					if(Number(displayTempAsPerUnit(cd["main"]["temp"],temperatureUnit))>0){
						return(
							<div className="m-3 bg-gray-200 border cursor-pointer" key={idx} title={displayTempAsPerUnit(cd["main"]["temp"],temperatureUnit) + temperatureUnit} >
								<div className="w-8  bg-indigo-600"  style={{height: "100px" }}>
									<div style={{height: Number(100-displayTempAsPerUnit(cd["main"]["temp"],temperatureUnit)*scalerFactor)+"px", color:"red" }} className="border bg-gray-200">

									</div>

								 
								</div>
								<div className="border border-gray-700"></div>
								<div style={{height: "100px", color:"red" }} className="border bg-gray-200">

								</div>
								<span className="text-xs absolute  text-gray-500">{displayTempAsPerUnit(cd["main"]["temp"],temperatureUnit)} &#176;{temperatureUnit}</span>
							 
							</div>
						)
					}else{
						return(
							<div className="m-3 bg-gray-200 border cursor-pointer" key={idx} title={displayTempAsPerUnit(cd["main"]["temp"],temperatureUnit) + temperatureUnit} >
								<div className="w-8  bg-gray-200"  style={{height: "200px" }}>
									 <div style={{height: "100px", color:"red" }} className="border bg-gray-200">

									 </div>
									 <div className="border border-gray-700"></div>
									 <div style={{height:  Math.abs(minTemp)*scalerFactor+"px", color:"red" }} className="bg-indigo-600">

									 </div>
								</div>
								<span className="text-xs absolute   text-gray-500">{displayTempAsPerUnit(cd["main"]["temp"],temperatureUnit)} &#176;{temperatureUnit}</span>	 
							</div>
						)
					}
					
				})}
				</div>

			 

			</div>
			}
			
		</div>
	);
}

export default BarChart;