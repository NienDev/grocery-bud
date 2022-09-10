import { useEffect } from "react";

const Alert = ({ msg, color, removeAlert, data }) => {
  useEffect(() => {
    const myTimeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(myTimeOut);
  }, [data]);

  const styles = {
    backgroundColor:
      color == "red" ? "hsl(360, 71%, 66%)" : "hsl(125, 71%, 66%)",
  };
  return (
    <div
      style={styles}
      className="text-white tracking-widest rounded-md mb-4 py-1"
    >
      {msg}
    </div>
  );
};

export default Alert;
