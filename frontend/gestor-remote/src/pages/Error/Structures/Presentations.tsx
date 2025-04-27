import { t } from "i18next";
import { IPresentationDataList, IPresentationTable, JustificationText, SortColumn, TextFormat } from "ux-ui";

/**
 * Presentacion de la tabla de errores
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
        title: t("modules.GS-ER-001.fields.indexError.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.desc,
        orderNameColumn: "index_error",
      },
      {
        name: "message",
        title: t("modules.GS-ER-001.fields.message.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "description",
        title: t("modules.GS-ER-001.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "34vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-ER-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
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
}


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
            title: t("modules.GS-ER-001.fields.uuid.title"),
            justification: JustificationText.start,
            format: TextFormat.none,
          },
    
          {
            name: "indexError",
            title: t("modules.GS-ER-001.fields.indexError.title"),
            justification: JustificationText.start,
            format: TextFormat.none,
          },
          {
            name: "message",
            title: t("modules.GS-ER-001.fields.message.title"),
            justification: JustificationText.start,
            format: TextFormat.none,
          },
          {
            name: "description",
            title: t("modules.GS-ER-001.fields.description.title"),
            justification: JustificationText.start,
            format: TextFormat.none,
          },
          {
            name: "user",
            title: t("modules.GS-ER-001.fields.user.title"),
            justification: JustificationText.start,
            format: TextFormat.none,
          },
          {
            name: "userDate",
            title: t("modules.GS-ER-001.fields.userDate.title"),
            justification: JustificationText.start,
            format: TextFormat.dateSocialNetworkDinamic,
          },
          {
            name: "userApp",
            title: t("modules.GS-ER-001.fields.userApp.title"),
            justification: JustificationText.start,
            format: TextFormat.none,
          },
        ],    
    };
}

export { tableQueryModule, dataViewPresentation };