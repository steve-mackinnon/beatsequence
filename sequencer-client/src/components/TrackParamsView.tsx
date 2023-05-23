import React, { ReactElement } from "react";
import { Box } from "@mui/material";
import { ParamSlider } from "../shared-components/ParamSlider";
import { ParamInfo } from "../entities/paramInfo";
import { SamplePicker } from "./SamplePicker";
export interface TrackParamsViewProps {
  trackId: number;
  params: ParamInfo[];
}

export function TrackParamsView(props: TrackParamsViewProps): ReactElement {
  const sliders = props.params.map((paramInfo) => (
    <ParamSlider
      key={paramInfo.name}
      paramInfo={{
        trackId: props.trackId,
        stepIndex: undefined,
        name: paramInfo.name,
        min: paramInfo.min,
        max: paramInfo.max,
      }}
      label={paramInfo.displayName}
    />
  ));

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <SamplePicker trackId={props.trackId} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          paddingTop: 1,
          flex: 1,
        }}
      >
        {sliders}
      </Box>
    </Box>
  );
}
