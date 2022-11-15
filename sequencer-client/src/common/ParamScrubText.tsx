import React, {
  ReactElement,
  useState,
  MouseEvent,
  TouchEvent,
  useEffect,
} from "react";
import { styled } from "@mui/system";
import { useParameter, ParamInfo } from "../hooks";

const StyledInput = styled("input")(
  ({ theme }) => `
  border: none;
  background-color: rgb(0,0,0);
  color: rgb(229,229,229);
  cursor: default;
  outline: none;
  caret-color: transparent;
  font-size: 16px;
  touch-action: none;
  `
);
export function ParamScrubText(paramInfo: ParamInfo): ReactElement {
  const [value, setValue] = useParameter(paramInfo);
  const [receivedTouchEvent, setReceivedTouchEvent] = useState(false);
  const [dragStartValue, setDragStartValue] = useState<null | number>(null);
  const [startY, setStartY] = useState<null | number>(null);

  const onMouseDown = (e: MouseEvent<HTMLInputElement>): void => {
    if (receivedTouchEvent) {
      return;
    }
    setDragStartValue(value);
    setStartY(e.screenY);
  };
  const onTouchStart = (e: TouchEvent): void => {
    console.log(e);
    setReceivedTouchEvent(true);
    setDragStartValue(value);

    const touch = e.touches.item(0);
    setStartY(touch.screenY);
  };
  const onMouseMove = (e: any): void => {
    if (startY == null || dragStartValue == null) {
      return;
    }
    console.log(e);
    let increment = startY;
    if (receivedTouchEvent) {
      increment -= e.touches.item(0).screenY as number;
    } else {
      increment -= e.screenY as number;
    }
    setValue(dragStartValue + increment);
  };

  const onMouseUp = (_e: any): void => {
    setDragStartValue(null);
    setStartY(null);
  };
  useEffect(() => {
    addEventListener("mouseup", onMouseUp);
    addEventListener("mousemove", onMouseMove);
    addEventListener("touchmove", onMouseMove);
    addEventListener("touchend", onMouseUp);
    return () => {
      removeEventListener("mouseup", onMouseUp);
      removeEventListener("mousemove", onMouseMove);
      removeEventListener("touchmove", onMouseMove);
      removeEventListener("touchend", onMouseUp);
    };
  });

  return (
    <StyledInput
      sx={{
        width: 50,
      }}
      value={value}
      onMouseDown={onMouseDown}
      onTouchStartCapture={onTouchStart}
    />
  );
}
