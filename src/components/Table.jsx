import React from "react";
import "./Table.css";
import CountUp from "react-countup";

function Table({ countries }) {
  const getTotalCases = () => {
    return countries.reduce((a, b) => a + b.cases, 0);
  };

  return (
    <div className="table">
      <tr>
        <td>Total</td>
        <td>
          <strong>
            <CountUp end={getTotalCases() || 0} prefix="+ " separator="," />
          </strong>
        </td>
      </tr>
      {countries.map(({ country, cases }) => (
        <tr key={country}>
          <td>{country}</td>
          <td>
            <strong>
              <CountUp end={cases || 0} prefix="+ " separator="," />
            </strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
