import React from "react";
import Card from "@material-ui/core/Card";
import "./component.css";

import Typography from "@material-ui/core/Typography";


function DeviceCards(props) {
  return (
    <div>
      <Card className={props.class}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ paddingLeft: 30, paddingTop: 12 }}
        >
          Device {props.device}
        </Typography>
        {props.children}
      </Card>
    </div>
  );
}

export default DeviceCards;
