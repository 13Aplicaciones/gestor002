import { Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { IconComponent, PageCrud } from "ux-ui";
import { Menus } from "../utils/Constants";
import { FormEditError } from "./Error/FormEditError";
import { PreviewError } from "./Error/PreviewError";
import { QueryError } from "./Error/QueryError";
import { createIRowDataError } from "./Error/Structures/Types";
import { FormEditInformation } from "./Information/FormEditInformation";
import { PreviewInformation } from "./Information/PreviewInformation";
import { QueryInformation } from "./Information/QueryInformation";
import { createIRowDataInformation } from "./Information/Structures/Types";
import { FormEditModule } from "./Module/FormEditModule";
import { PreviewModule } from "./Module/PreviewModule";
import { QueryModule } from "./Module/QueryModule";
import { createIRowDataModule } from "./Module/Structures/Types";
import { FormEditUser } from "./User/FormEditUser";
import { PreviewUser } from "./User/PreviewUser";
import { QueryUser } from "./User/QueryUser";
import { createIRowDataUser } from "./User/Structures/Types";

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
        <IconComponent iconName={t("GearIcon")} width="36" height="36" />
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
          <IconComponent iconName={icon} width="36" height="36" />
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
        return (
          <PageCrud
            tranlation={Menus.ERROR}
            createIRowDataCustom={createIRowDataError}
            QueryPanel={QueryError}
            PreviewPanel={PreviewError}
            FormPanel={FormEditError}
          />
        );
      case Menus.INFORMATION:
        return (
          <PageCrud
            tranlation={Menus.INFORMATION}
            createIRowDataCustom={createIRowDataInformation}
            QueryPanel={QueryInformation}
            PreviewPanel={PreviewInformation}
            FormPanel={FormEditInformation}
          />
        );
      case Menus.MODULE:
        return (
          <PageCrud
            tranlation={Menus.MODULE}
            createIRowDataCustom={createIRowDataModule}
            QueryPanel={QueryModule}
            PreviewPanel={PreviewModule}
            FormPanel={FormEditModule}
          />
        );
      case Menus.USER:
        return (
          <PageCrud
            tranlation={Menus.USER}
            createIRowDataCustom={createIRowDataUser}
            QueryPanel={QueryUser}
            PreviewPanel={PreviewUser}
            FormPanel={FormEditUser}
          />
        );
      default:
        return (
          <PageCrud
            tranlation={Menus.INFORMATION}
            createIRowDataCustom={createIRowDataInformation}
            QueryPanel={QueryInformation}
            PreviewPanel={PreviewInformation}
            FormPanel={FormEditInformation}
          />
        );
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
