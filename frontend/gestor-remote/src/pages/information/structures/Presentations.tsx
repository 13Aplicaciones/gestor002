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
const tableQueryInformation=() :IPresentationTable => {
  return {
    banding: true,
    headers: true,
    numberLinea: false,
    
    skeletonWidth: "90vw",
    items: [
      {
        name: "name",
        title: t("modules.GS-IN-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.asc,
        orderNameColumn: "name",
      },
      {
        name: "value01",
        title: t("modules.GS-IN-001.fields.value01.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "34vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-IN-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "userDate",
      },

      {
        name: "acciones",
        title: t("modules.GS-IN-001.fields.acciones.abrev"),
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
        title: t("modules.GS-IN-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "name",
        title: t("modules.GS-IN-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "value01",
        title: t("modules.GS-IN-001.fields.value01.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "value02",
        title: t("modules.GS-IN-001.fields.value02.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "user",
        title: t("modules.GS-IN-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-IN-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-IN-001.fields.userApp.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };
};

export { tableQueryInformation, dataViewPresentation };
