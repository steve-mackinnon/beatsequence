import React, { ReactElement } from "react";
import { Stack } from "@mui/system";
import { ParamSlider } from "../common/ParamSlider";

export function HeaderControls(): ReactElement {
  return (
    <Stack
      direction="row"
      spacing={2}
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingX="15px"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width={200}
        spacing={2}
      >
        <ParamSlider
          paramInfo={{
            trackId: undefined,
            stepIndex: undefined,
            name: "tempo",
            min: 10,
            max: 200,
          }}
          label="Tempo"
        />
      </Stack>
      <div />
    </Stack>
  );
}