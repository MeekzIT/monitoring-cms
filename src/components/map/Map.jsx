import React, { useEffect } from "react";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/actions/auth-action";
import { themePallete } from "../..";

const regionStyle = {
  initial: {
    fill: "#e4e4e4",
    stroke: "none",
    "stroke-width": 0,
  },
};

const containerStyle = {
  width: "100%",
  height: "420px",
  backgroundColor: "white",
  svg: {
    height: "100%",
  },
};

export default function Maps() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth.admin);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  let setCoutry;
  if (data?.countryId == 1) {
    setCoutry = {
      AM: 200,
    };
  } else if (data?.countryId == 2) {
    setCoutry = {
      Ru: 200,
    };
  } else if (data?.countryId == 3) {
    setCoutry = {
      KZ: 200,
    };
  } else if (data?.countryId == 4) {
    setCoutry = {
      GE: 200,
    };
  } else if (data?.countryId == 5) {
    setCoutry = {
      BY: 200,
    };
  } else if (data?.countryId == 7) {
    setCoutry = {
      AZ: 200,
    };
  }

  let mapData =
    data?.role == "superAdmin"
      ? {
          GE: 200,
          RU: 200,
          AM: 200,
          AZ: 200,
          BY: 200,
          KZ: 200,
          KG: 200,
        }
      : setCoutry;

  const series = {
    regions: [
      {
        values: mapData,
        scale: [themePallete],
        normalizeFunction: "polynomial",
      },
    ],
  };

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
