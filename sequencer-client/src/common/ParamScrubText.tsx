import React, { ReactElement, useState, MouseEvent, useEffect } from "react";
import { styled } from "@mui/system";
import { useParameter, ParamInfo } from "../hooks";

const StyledInput = styled("input")(
  ({ theme }) => `
  border: none;
  background-color: rgb(30, 30, 30);
  color: rgb(229,229,229);
  cursor: default;
  outline: none;
  caret-color: transparent;
  font-size: 16px;
  `
);
export function ParamScrubText(paramInfo: ParamInfo): ReactElement {
  const [value, setValue] = useParameter(paramInfo);
  const [dragStartValue, setDragStartValue] = useState<null | number>(null);
  const [startY, setStartY] = useState<null | number>(null);

  const onMouseDown = (e: MouseEvent<HTMLInputElement>): void => {
    setDragStartValue(value);
    setStartY(e.screenY);
  };
  const onMouseMove = (e: any): void => {
    if (startY == null || dragStartValue == null) {
      return;
    }
    const increment = startY - e.screenY;
    setValue(dragStartValue + increment);
  };

  const onMouseUp = (_e: any): void => {
    setDragStartValue(null);
    setStartY(null);
  };
  useEffect(() => {
    addEventListener("mouseup", onMouseUp);
    addEventListener("mousemove", onMouseMove);
    return () => {
      removeEventListener("mouseup", onMouseUp);
      removeEventListener("mousemove", onMouseMove);
    };
  });

  return (
    <StyledInput
      sx={{
        width: 50,
      }}
      value={value}
      onMouseDown={onMouseDown}
    />
  );
}
