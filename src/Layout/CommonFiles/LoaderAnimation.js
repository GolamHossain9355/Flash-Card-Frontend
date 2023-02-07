import { useState, useEffect } from "react";

//Loading animation for page rendering
export default function LoaderAnimation() {
  //*declared a state variable to dynamically move the progress bar from left to right
  const [widthValueForProgressBar, setWidthValueForProgressBar] = useState(1);

  useEffect(() => {
    if (widthValueForProgressBar < 98) {
      setWidthValueForProgressBar(widthValueForProgressBar + 2);
    }
  }, [widthValueForProgressBar]);

  return (
    <div className="">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          style={{
            role: "progressBar",
            ariaValueNow: `${widthValueForProgressBar}`,
            ariaValuemin: "0",
            ariaValuemax: "100",
            width: `${widthValueForProgressBar}%`,
          }}
        ></div>
      </div>
    </div>
  );
}
