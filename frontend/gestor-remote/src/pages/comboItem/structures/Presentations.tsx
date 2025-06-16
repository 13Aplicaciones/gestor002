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
    skeletonWidth: "90vw",
    items: [
      {
        name: "indexError",
        title: "Index Error",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "index_combo_item",
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
