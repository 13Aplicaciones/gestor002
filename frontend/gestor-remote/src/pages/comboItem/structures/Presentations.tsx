import { t } from "i18next";
import {
  IPresentationDataList,
  IPresentationTable,
  JustificationText,
  SortColumn,
  TextFormat,
} from "ux-ui";

/**
 * Presentacion de la tabla de combo items
 *
 * @returns
 */
const tableQueryModule = (): IPresentationTable => {
  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "96vw",
    items: [
      {
        name: "indexComboItem",
        title: t("modules.GS-CB-IT-001.fields.indexComboItem.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "label",
        title: t("modules.GS-CB-IT-001.fields.label.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "description",
        title: t("modules.GS-CB-IT-001.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "30vw",
      },
      {
        name: "codeText",
        title: t("modules.GS-CB-IT-001.fields.codeText.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "codeNumber",
        title: t("modules.GS-CB-IT-001.fields.codeNumber.title"),
        justification: JustificationText.end,
        format: TextFormat.none,
        width: "10vw",
      },

      {
        name: "orden",
        title: t("modules.GS-CB-IT-001.fields.order.title"),
        justification: JustificationText.end,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.asc,
        orderNameColumn: "orden",
      },
      {
        name: "status",
        title: t("modules.GS-CB-IT-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "acciones",
        title: t("modules.GS-ER-001.fields.acciones.abrev"),
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
      },
    ],
  };
};

/**
 * Presentacion de la vista de datos de combo items
 *
 * @returns
 */
const dataViewPresentation = (): IPresentationDataList => {
  return {
    banding: true,
    headers: true,
    skeletonWidth: "90vw",
    items: [
      {
        name: "uuid",
        title: t("modules.GS-CB-IT-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };
};

export { dataViewPresentation, tableQueryModule };
