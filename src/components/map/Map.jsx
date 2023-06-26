import React from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
let mapData = {
  GE: 200,
  RU: 200,
  AM: 200,
  AZ: 200,
  BY: 200,
  KZ: 200,
  TR: 200,
};

const regionStyle = {
  initial: {
    fill: "#e4e4e4",
    stroke: "none",
    "stroke-width": 0,
  },
};

const series = {
  regions: [
    {
      values: mapData,
      scale: ["#00a896"],
      normalizeFunction: "polynomial",
    },
  ],
};

const containerStyle = {
  width: "100%",
  height: "420px",  
  backgroundColor:"white",
  svg: {  
    height: "100%",
  },
};

export default function Maps() {
  return (  
    <VectorMap
      map={"world_mill"}
      backgroundColor="transparent"
      zoomOnScroll={false}
      containerStyle={containerStyle}
      containerClassName="map"
      regionStyle={regionStyle}
      series={series}
      zoomMin={0}
    />
  );
}
