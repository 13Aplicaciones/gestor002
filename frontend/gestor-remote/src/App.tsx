/* eslint-disable @typescript-eslint/no-explicit-any */
import Error from "./pages/Error.tsx";
import Information from "./pages/Information.tsx";
import Module from "./pages/Module.tsx";
import User from "./pages/User.tsx";

/**
 * Funcion para renderizar el flujo de la aplicación.
 *
 * @param structure estructura de la aplicación.
 * @returns
 */
interface Structure {
  element?: string;
}

const commutator = ( structure?: Structure ) => {
  switch (structure?.element) {
    case "Error":
      return <Error />;
    case "Information":
      return <Information />;
    case "Module":
      return <Module />;
    case "User":
      return <User />;
    default:
const App = ({ structure }: { structure?: Structure }) => {
  }
};

const App = ({ structure }: { structure?: any }) => {
  return (    
      {commutator( structure )}
  );
};

export default App;
