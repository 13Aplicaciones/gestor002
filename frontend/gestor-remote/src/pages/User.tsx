import { Flex } from "@radix-ui/themes";
import { OriginProps } from "./Origin";
import { useEffect } from "react";

const User = ({ structure }: { structure?: OriginProps }) => {
  useEffect(() => {}, [structure?.refreshToken]);

  return (
    <Flex direction="column" gap="2">
    </Flex>
  );
};

export default User;
