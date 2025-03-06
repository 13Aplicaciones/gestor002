/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastContextProvider } from "ux-ui";
import Error from "./pages/Error.tsx";
import Information from "./pages/Information.tsx";
import Module from "./pages/Module.tsx";
import User from "./pages/User.tsx";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

const App = ({ structure }: { structure?: any }) => {
  console.log("structure ", JSON.stringify(structure));

  const flow = (structure: any) => {
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
    }

    return <User />;

  };

  return (
    <div>
      <I18nextProvider i18n={i18next}>
        <ToastContextProvider>{flow(structure)}</ToastContextProvider>
      </I18nextProvider>
    </div>
  );
};

export default App;
