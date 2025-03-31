import "@radix-ui/themes/styles.css";
import { I18nextProvider } from "react-i18next";
import { Origin } from "./pages/Origin";
import { Theme } from "@radix-ui/themes";
import i18next from "./i18n";

const WrapOrigin = ({ name }: { name: string }) => {
  return (
    <Theme asChild={true} >
      <I18nextProvider i18n={i18next}>
                      
            <Origin name={name} />
          
      </I18nextProvider>
    </Theme>
  );
};

export { WrapOrigin };
