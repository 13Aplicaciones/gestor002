import { t } from "i18next";
import {
  IPresentationDataList,
  IPresentationInputSelect,
  IPresentationTable,
  JustificationText,
  SortColumn,
  TextFormat,
} from "ux-ui";

/**
 * Presentacion de la tabla de Modulos
 *
 * @returns
 */
const tableQueryCredentials = async (): Promise<IPresentationTable> => {
  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "type",
        title: t("modules.GS-UC-001.fields.type.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "14vw",
      },
      {
        name: "email",
        title: t("modules.GS-UC-001.fields.email.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "socialNick",
        title: t("modules.GS-UC-001.fields.socialNick.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-UC-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "acciones",
        title: t("modules.GS-UC-001.fields.acciones.abrev"),
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
      },
    ],
  };
};

/**
 * Presentación de los items de edicion.
 */
const dataViewPresentation = (): IPresentationDataList => {
  return {
    banding: true,
    headers: true,
    skeletonWidth: "90vw",
    items: [
      {
        name: "socialNick",
        title: t("modules.GS-UC-001.fields.socialNick.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "email",
        title: t("modules.GS-UC-001.fields.email.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "type",
        title: t("modules.GS-UC-001.fields.type.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "user",
        title: t("modules.GS-UC-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-UC-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-UC-001.fields.userApp.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };
};

/**
 * Lista de módulos
 *
 * @returns
 */
const listQueryCredentials = (): IPresentationInputSelect => {
  return {
    items: [
      {
        order: 0,
        justification: JustificationText.end,
        codeText: "E",
        name: "Email",
        description: "Email",
        width: "100%",
        separator: false,
      },
      {
        order: 1,
        justification: JustificationText.start,
        codeText: "G",
        name: "Google",
        description: "Usuario de Google",
        width: "100%",
        separator: false,
      },
      {
        order: 2,
        justification: JustificationText.start,
        codeText: "F",
        name: "Facebook",
        description: "Usuario de Facebook",
        width: "100%",
        separator: false,
      },
    ],
  };
};

export { tableQueryCredentials, dataViewPresentation, listQueryCredentials };

