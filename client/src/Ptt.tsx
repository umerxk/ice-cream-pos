import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  return <div ref={ref}>My cool content here!</div>;
});

const Ptt = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};
export default Ptt;
