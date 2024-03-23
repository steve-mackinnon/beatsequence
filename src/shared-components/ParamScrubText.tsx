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
  background-color: rgb(18,18,18);
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

  const captureStartValue = (): void => {
    let startValue = value;
    if (typeof startValue === "string") {
      if (paramInfo.toNumber == null) {
        throw new Error("toNumber is required for string values");
      }
      startValue = paramInfo.toNumber(startValue);
    }
    setDragStartValue(startValue);
  };
  const onMouseDown = (e: MouseEvent<HTMLInputElement>): void => {
    if (receivedTouchEvent) {
      return;
    }
    captureStartValue();
    setStartY(e.screenY);
  };
  const onTouchStart = (e: TouchEvent): void => {
    setReceivedTouchEvent(true);
    captureStartValue();
    const touch = e.touches.item(0);
    setStartY(touch.screenY);
  };
  const onMouseMove = (e: any): void => {
    if (startY == null || dragStartValue == null) {
      return;
    }
    let increment = startY;
    if (receivedTouchEvent) {
      increment -= e.touches.item(0).screenY as number;
    } else {
      increment -= e.screenY as number;
    }
    const newValue = dragStartValue + increment;
    if (typeof value === "string") {
      if (paramInfo.valueToString == null) {
        throw new Error("toNumber is required for string values");
      }
      setValue(paramInfo.valueToString(newValue));
    } else {
      setValue(newValue);
    }
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
      onChange={(e) => setValue(e.target.value)}
      onMouseDown={onMouseDown}
      onTouchStartCapture={onTouchStart}
    />
  );
}
