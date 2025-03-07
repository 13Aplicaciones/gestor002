/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Error from "./Error";
import Information from "./Information";
import Module from "./Module";
import User from "./User";

type OriginProps = {  
  id?: number | 0;
  name?: string;
  description?: string;
  element?: string | "Base";  
  refreshToken?: number | 0;
  [key: string]: any;
};

const Origin = (
  { structure }: 
  {structure?:OriginProps}
) => {  
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
        return <><h1>Base</h1></>;
    }
    return <User />;
  };

  useEffect(() => {
    console.log("structure hola taroja ", JSON.stringify(structure));
  }
  , [structure?.refreshToken]);

  return (
    <div>
      {flow(structure)}
    </div>
  );
};

export { Origin };
export type { OriginProps };