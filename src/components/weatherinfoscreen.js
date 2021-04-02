import React,{useEffect,useState} from 'react';
import axios from 'axios';
import WeatherCards from './weathercards';
import { useDispatch} from 'react-redux';
import allActions  from '../actions/action';

const WeatherInfoScreen = (props) => {
	
	const [loadingWeatherData,setloadingWeatherData] = useState(false);
	const [weatherDataLoaded,setweatherDataLoaded] = useState(false);
	const [weatherData,setweatherData] = useState({});
	const [currentPageIndex,setcurrentPageIndex] = useState(0);
	const [totalNumberOfPages,settotalNumberOfPages] = useState(0);
	const [temperatureUnit,settemperatureUnit] = useState("f");
	const {pageSize} = props;
	const dispatch = useDispatch();

	const API_KEY = "75f972b80e26f14fe6c920aa6a85ad57"; // Ideally the API_KEY should be kept in .env file 


	useEffect(()=>{
		let isCancelled = false;
		if(!isCancelled){
			if(!weatherDataLoaded){
				getWeatherData();
				dispatch(allActions.setTemperatureUnit("f"));
			}
			document.title = "Payoneer Test Task | Shivam"
		}
		return () => {
			isCancelled = true;
		}

	},[weatherDataLoaded]);


	const getWeatherData =  () => {
		setloadingWeatherData(true);
		axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=${API_KEY}&cnt=40 `).then((data)=>{
			let weatherDataByDate = groupResultByDate(data.data.list,"dt_txt");
			setweatherData(weatherDataByDate);
			settotalNumberOfPages(Object.keys(weatherDataByDate).length/pageSize);
			setloadingWeatherData(false);
			setweatherDataLoaded(true);
		})	
	}


 

	const groupResultByDate = (apiResult,keyName) => {
		return apiResult.reduce((final,cv)=>{
				let dateV = cv[keyName].substr(0,10);
				if(final[dateV]){
					final[dateV].push(cv);
					return {...final};
				}else{
					let newWeatherObj = { [dateV] : [cv] };
					return {...final,...newWeatherObj};  
				}
		},{});
	}


	const handlePageChange = (action) =>{
		if(action==="next"){
			setcurrentPageIndex(currentPageIndex => currentPageIndex+1 );
		}
		if(action==="prev"){
			setcurrentPageIndex(currentPageIndex => currentPageIndex-1 );
		}
		 dispatch(allActions.setSelectedDayCardInfo({}))
	}

	const changeTempUnit = (tUnit) => {
		settemperatureUnit(tUnit);
		dispatch(allActions.setTemperatureUnit(tUnit))
	}


	return(
		<div className="bg-white relative shadow-xl border rounded-l w-3/6 mx-auto h-auto my-20 ">
			{!weatherDataLoaded&&
				loadingWeatherData?
				<div className="p-20 m-20">
					<p className="p-20 text-3xl">Loading...</p>
				</div>
				:''
			}

			{weatherDataLoaded&&
			<div>
			<div className="m-5 flex justify-center">

				<div className="p-1">
					 <input type="radio" onChange={()=>{changeTempUnit("c")}} value="c" name="tempType" checked={temperatureUnit==="c"} /> 
					 <span className="text-xl p-2">Celsius</span>
				</div>
				<div className="p-1">
			         <input type="radio" onChange={()=>{changeTempUnit("f")}} value="f" name="tempType" checked={temperatureUnit==="f"} /> 
					 <span className="text-xl p-2">Fahrenheit</span>
				</div>
			</div>
			<div className="mx-4 flex justify-between">
								<div  className="self-start">
									<button onClick={()=>{handlePageChange("prev")}} className="focus:outline-none text-white text-xl font-extrabold py-2.5 px-10 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg disabled:opacity-20"  disabled={currentPageIndex===0}>  &#60; </button>
								</div>
								<div className="self-end">
									<button onClick={()=>{handlePageChange("next")}} className="focus:outline-none text-white text-xl font-extrabold py-2.5 px-10 rounded-md bg-blue-500 hover:bg-blue-600 hover:shadow-lg disabled:opacity-20" disabled={currentPageIndex===(totalNumberOfPages-1)}> &#62; </button>
								</div>
			
			</div>
			<div className="flex justify-center">
				<WeatherCards weatherData={Object.entries(weatherData).slice(currentPageIndex*pageSize,(((currentPageIndex+1)*pageSize)))}   />
			</div>
			</div>
			}
		</div>
	);
}

export default WeatherInfoScreen;