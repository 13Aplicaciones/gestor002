import { Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { getIconComponent } from "ux-ui";
import { PageCrud } from "ux-ui";
import { Modules } from "../utils/Constants";
import { FormEditError, PreviewError } from "./Error/Form";
import { QueryError } from "./Error/Query";
import { createIRowDataError } from "./Error/Types";
import Information from "./Information";
import Module from "./Module";
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
      case Modules.ERROR:
        return <PageCrud
          tranlation={Modules.ERROR}
          createIRowDataCustom={createIRowDataError}
          QueryPanel={QueryError}
          PreviewPanel={PreviewError}
          FormPanel={FormEditError}
        />;
      case "GS-IN-001":
        return <Information />;
      case "GS-MD-001":
        return <Module />;
      case "GS-US-001":
        return <User />;
      default:
        return <PageCrud
          tranlation={Modules.ERROR}
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

