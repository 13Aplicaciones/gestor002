import "@radix-ui/themes/styles.css";
import { I18nextProvider } from "react-i18next";
import { Origin, Title as TitleWrap, SubTitle as SubTitleWrap } from "./pages/Origin";
import { Theme } from "@radix-ui/themes";
import i18next from "./i18n";

/**
 * Componente que envuelve el titulo de la aplicacion y se encarga de la internacionalización.
 * 
 * @author omargo33
 * @since 2025-03-22
 *
 */

/**
 * Componente que envuelve el menu de la aplicacion
 *
 * @param name Nombre del menu
 * @returns Componente MenuWrap
 */
const MenuWrap = ({ name }: { name: string }) => {
  return (
    <Theme asChild={true} >
      <I18nextProvider i18n={i18next}>
        <Origin name={name} />
      </I18nextProvider>
    </Theme>
  );
};

export { MenuWrap, TitleWrap, SubTitleWrap };
