import { t } from "i18next";
import {
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
const tableQueryCombo = async (): Promise<IPresentationTable> => {
  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "60vw",
    items: [
      {
        name: "indexCombo",
        title: t("modules.GS-CB-001.fields.indexCombo.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "14vw",
      },
      {
        name: "name",
        title: t("modules.GS-CB-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "25vw",
      },
      {
        name: "status",
        title: t("modules.GS-CB-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-CB-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "15vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "acciones",
        title: t("modules.GS-CB-001.fields.acciones.abrev"),
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
      },
    ],
  };
};

export { tableQueryCombo };
