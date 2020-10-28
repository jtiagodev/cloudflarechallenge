# Sensors Checker deployed on Cloudflare Workers

## Getting started

```
npm install
npm run build
wrangler publish
```

## (few) Technical Considerations

Application Root (App) manages the sensors state array.
Each component MyAbsoluteOrientationSensor, MyAccelerometer, MyAmbientLightSensor, MyGyroscope instanciates his own Sensor API class and registers an event listener for readings.
There is a default frequency of 3 readings per second for each Sensor and it udpates the latest read values you can find on the left of each Sensor block and each reading adds a new data entry to feed our canvas charts (based on ChartsJS). 
SIDENOTES: At first I implemented Recharts but I realized for continuous real-time data update a canvas element would be far superior in terms of performance drawing a much larger set of data, so there was some refactoring. To avoid memory leaks, when components are unmounted the event listeners are removed.
