import WeatherInfoScreen from './components/weatherinfoscreen';

function App() {
  return (
    <div className="flex items-center h-screen w-full justify-center">
        <WeatherInfoScreen pageSize={3}/>
    </div>
  );
}

export default App;
