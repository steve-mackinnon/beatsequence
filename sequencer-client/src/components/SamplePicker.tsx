import React, { ReactElement, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useSampleManager } from "../hooks";
import { loadSample } from "../reducers/tracksSlice";

export interface SamplePickerProps {
  trackId: number;
}

export function SamplePicker(props: SamplePickerProps): ReactElement {
  const dispatch = useAppDispatch();
  const { addSample } = useSampleManager();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        if (reader.result == null || typeof reader.result === "string") {
          console.log("Unexpected file reading error");
          return;
        }
        const sampleId = acceptedFiles[0].name;
        addSample(sampleId, reader.result);
        dispatch(
          loadSample({
            trackId: props.trackId,
            sampleId,
          })
        );
      };
      reader.readAsArrayBuffer(acceptedFiles[0]);
    },
    [dispatch, props.trackId, addSample]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    // accept: {
    //   "audio/mpeg": [],
    //   "audio/wav": [],
    //   "audio/aac": [],
    //   "audio/x-aiff": [],
    //   "audio/aiff": [],
    // },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}
