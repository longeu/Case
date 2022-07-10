import React from "react";
interface LoadingSmallProps {
  className?: string;
}
function LoadingSmall(props: LoadingSmallProps) {
  return (
    <div
      className={"spinner-border spinner-border-sm " + props.className}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default LoadingSmall;
