import { useRouteError } from "react-router-dom";
const Error = () => {
  const err = useRouteError();
  return (
    <div className="error-page">
      <h1>{err.data}</h1>
    </div>
  );
};

export default Error;
