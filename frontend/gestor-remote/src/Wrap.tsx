import "@radix-ui/themes/styles.css";
import { I18nextProvider } from "react-i18next";
import { Origin } from "./pages/Origin";
import { Theme } from "@radix-ui/themes";
import { ToastContextProvider } from "ux-ui";
import i18next from "i18next";

const WrapOrigin = ({ name }: { name: string }) => {
  return (
    <Theme
      accentColor="indigo"
      grayColor="auto"
      scaling="100%"
      radius="medium"
      panelBackground="translucent"
      appearance="dark"
    >
      <I18nextProvider i18n={i18next}>
        <ToastContextProvider>
          <Origin name={name} />
        </ToastContextProvider>
      </I18nextProvider>
    </Theme>
  );
};

export { WrapOrigin };
