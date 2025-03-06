import { Alerts, useToastContext } from "ux-ui";
import { getToken } from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";

const Error = ({ structure }: { structure?: any }) => {
  const [token, setToken] = useState({});
  const { showToast } = useToastContext();

  useEffect(() => {
    const token1 = async () => {
      const token1 = await getToken();
      setToken(token1);
      if (token) {
        console.log("miToken", JSON.stringify(token));
      }
    };
    token1();
  }, [structure.refreshToken]);

  const heandleError = () => {
    showToast("Error", "Error", Alerts.info);
  };

  return (
    <div>
      <h1>Error hola taraola</h1>
      {JSON.stringify(token)}
      <br />

      <button onClick={heandleError}>Error</button>
    </div>
  );
};

export default Error;
