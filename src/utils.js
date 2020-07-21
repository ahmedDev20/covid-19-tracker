import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
  cases: {
    hex: "#f4511e",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#cc1034",
    multiplier: 2000,
  },
};

const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

const showDataOnMap = (data, casesType = "cases") =>
  data.map((c) => (
    <Circle
      center={[c.countryInfo.lat, c.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={Math.sqrt(c[casesType]) * casesTypeColors[casesType].multiplier}
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${c.countryInfo.flag})` }}
          />
          <div className="info-name">{c.country}</div>
          <div className="info-confirmed">
            Cases : {numeral(c.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered : {numeral(c.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths : {numeral(c.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export { sortData, showDataOnMap, prettyPrintStat };
