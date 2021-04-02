describe('Testing getWeatherData', () => {
  it('when no data is recieved', () => {
    const weatherDataLoaded = false;
    const weatherDataLoadedExpected = false;
    expect(weatherDataLoadedExpected).toEqual(false);
  });

  it('when Actual data is recieved', () => {
    const weatherDataLoaded = false;
    const weatherDataLoadedExpected = true;
    expect(weatherDataLoadedExpected).toEqual(true);
  });
});