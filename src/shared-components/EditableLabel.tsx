import React, { ReactElement, useState } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
  minHeight: 15,
  maxHeight: 15,
}));

export interface EditableLabelProps {
  onEditComplete: (value: string) => string;
  getValue: () => string;
}
export function EditableLabel(props: EditableLabelProps): ReactElement {
  const [value, setValue] = useState(props.getValue());
  const [isEditing, setIsEditing] = useState(false);

  const updateValue = (e: any): void => {
    setIsEditing(false);
    const name = e.target.value;
    if (name == null || name === "") {
      return;
    }
    const newValue = props.onEditComplete(e.target.value);
    setValue(newValue);
  };
  const beginEditing = (_: any): void => {
    setIsEditing(true);
  };

  const nameElement = isEditing ? (
    <StyledTextField
      onBlur={updateValue}
      onKeyDown={(e: any) => {
        if (e.key === "Escape") {
          setIsEditing(false);
          return;
        }
        if (e.key === "Enter" || e.keyCode === 13) {
          updateValue(e);
        }
      }}
      onFocus={(e: any) => e.target.select()}
      onAbort={(_: any) => setIsEditing(false)}
      defaultValue={value}
      autoFocus
      size="small"
    />
  ) : (
    <label onDoubleClick={beginEditing}>
      <strong>{value}</strong>
    </label>
  );
  return nameElement;
}
