import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";
import CountUp from "react-countup";

function InfoBox({
  title,
  cases,
  total,
  active,
  isOrange,
  isGreen,
  isRed,
  ...props
}) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"}
         ${isOrange && "infoBox--orange"}
         ${isGreen && "infoBox--green"}
        ${isRed && "infoBox--red"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography color="textSecondary" variant="h6">
          {title}
        </Typography>
        <h2
          className={`infoBox__cases ${isOrange && "infoBox__cases--orange"}
         ${isGreen && "infoBox__cases--green"}
        ${isRed && "infoBox__cases--red"}`}
        >
          <CountUp end={cases || 0} prefix="+ " separator="," />
        </h2>
        <Typography className="infoBox__total">
          <CountUp end={total || 0} prefix="+ " separator="," /> total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
