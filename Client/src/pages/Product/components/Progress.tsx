import React from "react";

interface ProgressProps {
  now?: number;
  isDisplay?: boolean;
}
function Progress(props: ProgressProps) {
  if (props.isDisplay === false) {
    return null;
  } else {
    return (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${props.now}%` }}
          aria-valuenow={props.now}
          aria-valuemin={10}
          aria-valuemax={100}
        >
          {props.now}%
        </div>
      </div>
    );
  }
}

export default Progress;
