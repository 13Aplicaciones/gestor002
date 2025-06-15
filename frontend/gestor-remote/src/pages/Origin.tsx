import { Flex, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { IconComponent, PageCrud } from "ux-ui";
import { Menus } from "../utils/Constants";
import { FormEditError } from "./Error/FormEditError";
import { WorkError } from "./Error/WorkError";
import { QueryError } from "./Error/QueryError";
import { createIRowDataError } from "./Error/Structures/Types";
import { FormEditInformation } from "./Information/FormEditInformation";
import { WorkInformation } from "./Information/WorkInformation";
import { QueryInformation } from "./Information/QueryInformation";
import { createIRowDataInformation } from "./Information/Structures/Types";
import { FormEditModule } from "./Module/FormEditModule";
import { WorkModule } from "./Module/WorkModule";
import { QueryModule } from "./Module/QueryModule";
import { createIRowDataModule } from "./Module/Structures/Types";
import { FormEditUser } from "./User/FormEditUser";
import { WorkUser } from "./User/WorkUser";
import { QueryUser } from "./User/QueryUser";
import { createIRowDataUser } from "./User/Structures/Types";
import { createIRowDataComboItem } from "./ComboItem/Structures/Types";
import { QueryComboItem } from "./ComboItem/QueryComboItem";
import { WorkComboItem } from "./ComboItem/WorkComboItem";
import { FormEditComboItem } from "./ComboItem/FormComboItem";

/**
 * Funcion para mostrar el titulo de la aplicacion.
 *
 * @returns
 */
const Title = () => {
  const [t] = useTranslation("global_gestor");

  return (
    <Flex direction="row" gap="2" align="center">
      <IconComponent iconName={t("GearIcon")} width="36" height="36" />
      <Flex direction="column">
        <Heading>{t("title")}</Heading>
        <Text>{t("description")}</Text>
      </Flex>
    </Flex>
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
  const ifFound: boolean = icon !== "modules." + nameMenu + ".icon";

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
            WorkPanel={WorkError}
            FormPanel={FormEditError}
          />
        );
      case Menus.INFORMATION:
        return (
          <PageCrud
            tranlation={Menus.INFORMATION}
            createIRowDataCustom={createIRowDataInformation}
            QueryPanel={QueryInformation}
            WorkPanel={WorkInformation}
            FormPanel={FormEditInformation}
          />
        );
      case Menus.MODULE:
        return (
          <PageCrud
            tranlation={Menus.MODULE}
            createIRowDataCustom={createIRowDataModule}
            QueryPanel={QueryModule}
            WorkPanel={WorkModule}
            FormPanel={FormEditModule}
          />
        );
      case Menus.USER:
        return (
          <PageCrud
            tranlation={Menus.USER}
            createIRowDataCustom={createIRowDataUser}
            QueryPanel={QueryUser}
            WorkPanel={WorkUser}
            FormPanel={FormEditUser}
          />
        );
      case Menus.COMBO_ITEM:
        return (
          <PageCrud
            tranlation={Menus.COMBO_ITEM}
            createIRowDataCustom={createIRowDataComboItem}
            QueryPanel={QueryComboItem}
            WorkPanel={WorkComboItem}
            FormPanel={FormEditComboItem}
          />
        );
      default:
        return <>No definido</>;
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
