import { Alerts, useToastContext } from "ux-ui";
import { Button, Flex, Heading } from "@radix-ui/themes";
import { getToken } from "orchestrator_remote/service/Tokens";
import { OriginProps } from "./Origin";
import { useEffect, useState } from "react";

const Error = ({ structure }: { structure?: OriginProps }) => {
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
  }, [structure?.refreshToken]);

  const heandleError = () => {
    showToast("Error", "Error", Alerts.info);
  };

  return (
    <Flex direction="column" gap="2">
      <Heading>Error</Heading>
      {JSON.stringify(token)}
      <Button size="3" onClick={heandleError}>
        Click me
      </Button>
    </Flex>
  );
};

export default Error;
