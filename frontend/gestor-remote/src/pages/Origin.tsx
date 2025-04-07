import { Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { getIconComponent, PageCrud } from "ux-ui";
import { Menus } from "../utils/Constants";
import { FormEditError, PreviewError } from "./Error/Form";
import { QueryError } from "./Error/Query";
import { createIRowDataError } from "./Error/Types";
import Information from "./Information";
import { FormEditModule, PreviewModule } from "./Module/Form";
import { QueryModule } from "./Module/Query";
import { createIRowDataModule } from "./Module/Types";
import User from "./User";

/**
 * Funcion para mostrar el titulo de la aplicacion.
 *
 * @returns
 */
const Title = () => {
  const [t] = useTranslation("global_gestor");

  return (
    <>
      <Flex direction="row" gap="2" align="center">
        {getIconComponent(t("GearIcon"), "36", "36")}
        <Flex direction="column">
          <Heading>{t("title")}</Heading>
          <Text>{t("description")}</Text>
        </Flex>
      </Flex>
    </>
  );
};

/**
 * Funcion para mostrar el subtitulo de la aplicacion.
 *
 * @param param0
 * @returns
 */
const SubTitle = ({ nameMenu }: { nameMenu?: string }) => {
  const [t] = useTranslation("global_gestor");
  const icon = t("modules." + nameMenu + ".icon");
  const ifFound: boolean = !(icon === "modules." + nameMenu + ".icon");

  return (
    <>
      {ifFound && (
        <Flex direction="row" gap="2" align="center">
          {getIconComponent(icon, "36", "36")}
          <Flex direction="column">
            <Heading>{t("modules." + nameMenu + ".title")}</Heading>
            <Text>{t("modules." + nameMenu + ".description")}</Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};

/**
 * Funcion para mostrar los paneles de los modulos de la aplicacion.
 * 
 * @param param0 
 * @returns 
 */
const Origin = ({ name }: { name: string }) => {
  const flow = () => {
    switch (name) {
      case Menus.ERROR:
        return <PageCrud
          tranlation={Menus.ERROR}
          createIRowDataCustom={createIRowDataError}
          QueryPanel={QueryError}
          PreviewPanel={PreviewError}
          FormPanel={FormEditError}
        />;
      case "GS-IN-001":
        return <Information />;
      case Menus.MODULE:
        return <PageCrud
          tranlation={Menus.MODULE}
          createIRowDataCustom={createIRowDataModule}
          QueryPanel={QueryModule}
          PreviewPanel={PreviewModule}
          FormPanel={FormEditModule}
        />;      
      case "GS-US-001":
        return <User />;
      default:
        return <PageCrud
          tranlation={Menus.ERROR}
          createIRowDataCustom={createIRowDataError}
          QueryPanel={QueryError}
          PreviewPanel={PreviewError}
          FormPanel={FormEditError}
        />;
    }
  };

  return (
    <>
      <SubTitle nameMenu={name} />
      {flow()}
    </>
  );
};

export { Origin, SubTitle, Title };

