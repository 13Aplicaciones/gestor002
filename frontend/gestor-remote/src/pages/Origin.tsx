/* eslint-disable @typescript-eslint/no-explicit-any */
import { use } from "i18next";
import Error from "./Error";
import Information from "./Information";
import Module from "./Module";
import User from "./User";
import { useEffect } from "react";

const Origin = ({ structure }: { structure?: any }) => {
  console.log("structure ", JSON.stringify(structure));
  const flow = (structure: any) => {
    switch (structure?.element) {
      case "Error":
        return <Error structure={structure} />;
      case "Information":
        return <Information />;
      case "Module":
        return <Module />;
      case "User":
        return <User />;
      default:
    }
    return <User />;
  };

  useEffect(() => {
    console.log("structure hola taroja ", JSON.stringify(structure));
  }
  , [structure.refreshToken]);

  return (
    <div>
      {flow(structure)}
    </div>
  );
};

export default Origin;