import { t } from "i18next";
import {
  IPresentationDataList,
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
const tableQueryMenu = (): IPresentationTable => {
  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "name",
        title: t("modules.GS-MN-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.asc,
        orderNameColumn: "name",
      },
      {
        name: "indexMenu",
        title: t("modules.GS-MN-001.fields.indexMenu.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "15vw",
      },
      {
        name: "type",
        title: t("modules.GS-MN-001.fields.type.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "15vw",
      },
      {
        name: "taskFlow",
        title: t("modules.GS-MN-001.fields.taskFlow.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "15vw",
      },
      {
        name: "order",
        title: t("modules.GS-MN-001.fields.order.title"),
        justification: JustificationText.end,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-MN-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "userDate",
      },
      {
        name: "acciones",
        title: t("modules.GS-MN-001.fields.acciones.abrev"),
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
        name: "uuid",
        title: t("modules.GS-MN-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "uuidModule",
        title: t("modules.GS-MN-001.fields.uuidModule.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "name",
        title: t("modules.GS-MN-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "type",
        title: t("modules.GS-MN-001.fields.type.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "indexMenu",
        title: t("modules.GS-MN-001.fields.indexMenu.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "taskFlow",
        title: t("modules.GS-MN-001.fields.taskFlow.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "status",
        title: t("modules.GS-MN-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "order",
        title: t("modules.GS-MN-001.fields.order.title"),
        justification: JustificationText.end,
        format: TextFormat.none,
      },
      {
        name: "user",
        title: t("modules.GS-MN-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-MN-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-MN-001.fields.userApp.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };
};

export { tableQueryMenu, dataViewPresentation };
