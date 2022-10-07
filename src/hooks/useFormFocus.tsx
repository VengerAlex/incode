import { useEffect } from "react";

const UseFormFocus = (cb: () => void) => {
  useEffect(() => {
    cb();
  }, [cb]);
};

export default UseFormFocus;
