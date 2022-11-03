import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { setGeneratorParam, ParamInfo } from "./tracks";
import { ParamSlider } from "../../common/ParamSlider";

export interface TrackParamsViewProps {
  trackId: number;
  params: ParamInfo[];
}

export function TrackParamsView(props: TrackParamsViewProps): ReactElement {
  const sliders = props.params.map((paramInfo) => (
    <ParamSlider
      key={paramInfo.name}
      minValue={paramInfo.min}
      maxValue={paramInfo.max}
      valueDispatcher={(value) =>
        setGeneratorParam({
          trackId: props.trackId,
          paramId: paramInfo.name,
          paramValue: value,
        })
      }
      valueSelector={(state) => paramInfo.valueSelector(state, props.trackId)}
      label={paramInfo.displayName}
    />
  ));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: {
          mobile: "column",
          tablet: "column",
          desktop: "row",
        },
        paddingTop: 1,
        flex: 1,
      }}
    >
      {sliders}
    </Box>
  );
}
