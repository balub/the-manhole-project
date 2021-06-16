import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Card from "@material-ui/core/Card";
import "./component.css";
import DeviceCards from "./DeviceCards";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  LineChart,
  ReferenceLine,
  Area,
  Bar,
  BarChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const API_KEY = "AIzaSyDnEx68w-4QEjv__pHaJq7ylZYWE6BmBYI";
const getColor = (val) => {
  if (val["water level"] >= 80) {
    return "#00c853";
  } else if (val["water level"] < 80 && val["water level"] >= 40) {
    return "#ffab00";
  } else {
    return "#d50000";
  }
};

function Mapps() {
  const [markers, setMarkers] = React.useState([
    { lat: 12.905165, lng: 77.4779238 },
    { lat: 12.905283, lng: 77.4772817 },
  ]);
  const [details, setDetails] = React.useState(false);
  const center = {
    lat: markers[0].lat,
    lng: markers[0].lng,
  };
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();
  const handleClick = () => {
    setMarkers((old) => [...old, { lat: lat, lng: long }]);
  };

  const [state, setstate] = React.useState([]);
  const url = "https://boiling-oasis-28823.herokuapp.com";
  React.useEffect(() => {
    let eventSource1 = new EventSource(`${url}/stream`);
    eventSource1.onmessage = (e) => setstate(JSON.parse(e.data));
  }, []);
  let device2 = state.filter((item) => item["device_id"] === 2);
  function CardDetails() {
    return (
      <div>
        <Button onClick={()=>{setDetails(false);}}>Close</Button>
        <DeviceCards device={2} class="hoverOver2">
          <BarChart width={480} height={250} data={device2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis unit={" cm"} />
            <Tooltip />
            <ReferenceLine
              y={80}
              label="Normal Levels"
              stroke="#00e676"
              strokeDasharray="3 3"
              alwaysShow={true}
              isFront={true}
            />
            <ReferenceLine
              y={40}
              label="Tolerable Levels"
              stroke="#ff9100"
              strokeDasharray="3 3"
              alwaysShow={true}
              isFront={true}
            />
            <ReferenceLine
              y={20}
              label="Danger Levels"
              stroke="#ff1744"
              strokeDasharray="3 3"
              alwaysShow={true}
              isFront={true}
            />
            <Legend color="green" verticalAlign="top" height={36} />
            <Bar dataKey="water level" barSize={20}>
              {device2.map((entry, index) => (
                <Cell key={index} cursor="pointer" fill={getColor(entry)} />
              ))}
            </Bar>
          </BarChart>
        </DeviceCards>
        <DeviceCards
          device={2}
          class="hoverOver3"
          data={state.filter((item) => item["device_id"] === 2)}
        >
          <AreaChart
            width={480}
            height={250}
            data={device2}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="timestamp" />
            <YAxis unit={" ppm"} />
            <CartesianGrid strokeDasharray="3 3" />
            <Legend color="green" verticalAlign="top" height={36} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="gas level"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </DeviceCards>
        <DeviceCards
          device={2}
          class="hoverOver4"
          data={state.filter((item) => item["device_id"] === 2)}
        >
          <LineChart
            width={480}
            height={250}
            data={device2}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis unit={" V"} />
            <ReferenceLine
              y={4}
              label="Inoperable Level"
              stroke="#ff1744"
              strokeDasharray="3 3"
              alwaysShow={true}
              isFront={true}
            />

            <Tooltip />
            <Legend color="green" verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="battery level" stroke="#dd2c00" />
          </LineChart>
        </DeviceCards>
      </div>
    );
  }
  return (
    <div>
      <CssBaseline />
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {markers.map((marker) => (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{
                lat: parseFloat(marker.lat),
                lng: parseFloat(marker.lng),
              }}
              onClick={() => {
                setDetails(true);
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <Card className="hoverOver1">
        <Grid container direction="row" justify="center" alignItems="center">
          <form>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="h6" gutterBottom>
                Latitude
              </Typography>
              <input
                type="text"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              ></input>
            </Grid>
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography variant="h6" gutterBottom>
                Longnitude
              </Typography>
              <input
                type="text"
                value={long}
                onChange={(e) => setLong(e.target.value)}
              ></input>
            </Grid>
            <Button style={{ padding: 12 }} onClick={handleClick}>
              Add new Marker
            </Button>
          </form>
        </Grid>
      </Card>
      {details && <CardDetails />}
    </div>
  );
}

export default Mapps;
