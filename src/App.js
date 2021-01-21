import React, { useState, useEffect } from "react";
import { MenuItem, Select, FormControl, Card, CardContent } from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData } from "./utils";
import LineGraph from "./components/LineGraph";
import "./App.css";
import "leaflet/dist/leaflet.css";

function App() {
  //*States
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  //*When the app loads, Get all the data about all countries
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  //*If the countries data changes get it from the API
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((c) => ({
            name: c.country,
            value: c.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setCountries(countries);
          setmapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, [countries]);

  //*If you select a country from the list the data will change
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        //*If there is no coordinates use the defaults

        if (!data.countryInfo) setMapCenter([34.80746, -40.4796]);
        else setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  //*The state data we pass to other components via props
  const { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths } = countryInfo;

  return (
    <>
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <div className="app__brand">
              <img src={require("./assets/virus.png")} alt="virus" />
              <h1>COVID-19 TRACKER</h1>
            </div>
            <FormControl className="app__dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((c) => (
                  <MenuItem key={c.name} value={c.value}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox isOrange active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Cases" cases={todayCases} total={cases} />
            <InfoBox isGreen active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recovered" cases={todayRecovered} total={recovered} />
            <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={todayDeaths} total={deaths} />
          </div>

          <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType} />
        </div>
        <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">Worldwide Daily New {casesType}</h3>
            <LineGraph casesType={casesType} className="app__graph" />
          </CardContent>
        </Card>
      </div>

      <div className="app__credit">
        <code>
          Made with 💖 by : &nbsp;
          <a style={{ textAlign: "center" }} href="https://github.com/ahmedDev20/">
            Ahmed - Balady (Please stay safe 🙏🏻🙏🏻 )
          </a>
        </code>
      </div>
    </>
  );
}

export default App;
