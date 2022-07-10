import React, { useState } from "react";
interface ToastProps {
  content: string;
  title: string;
  isDisplay: boolean;
}
function Toast(props: ToastProps) {
  const [toast, setToast] = useState(props.isDisplay);
  if (!toast) {
    return null;
  } else {
    return (
      <div className="position-fixed bottom-0 end-0 p-3">
        <div
          id="liveToast"
          className="toast hide"
          role="alert"
          //
        >
          <div className="toast-header">
            <img src="..." className="rounded me-2" alt="..." />
            <strong className="me-auto">{props.title}</strong>

            <button
              type="button"
              className="btn-close"
              onClick={() => setToast(false)}
            ></button>
          </div>
          <div className="toast-body">{props.content}</div>
        </div>
      </div>
    );
  }
}

export default Toast;
