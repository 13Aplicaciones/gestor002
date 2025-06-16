import { t } from "i18next";
import { getUserDefinedCodeByGroup } from "orchestrator_remote/service/UserDefineCode";
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
const tableQueryUser = async (): Promise<IPresentationTable> => {

  const statusList = await getUserDefinedCodeByGroup("LG_001_00", "AD_CD_01");

  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "nick",
        title: t("modules.GS-US-001.fields.nick.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "14vw",
        order: SortColumn.asc,
        orderNameColumn: "nick",
      },
      {
        name: "name",
        title: t("modules.GS-US-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.asc,
        orderNameColumn: "name",
      },
      {
        name: "lastName",
        title: t("modules.GS-US-001.fields.lastName.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        order: SortColumn.asc,
        orderNameColumn: "last_name",
      },
      {
        name: "userDate",
        title: t("modules.GS-US-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "status",
        title: t("modules.GS-US-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        cellSelect: statusList,
      },
      {
        name: "acciones",
        title: t("modules.GS-US-001.fields.acciones.abrev"),
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
        title: t("modules.GS-US-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "nick",
        title: t("modules.GS-US-001.fields.nick.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "name",
        title: t("modules.GS-US-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "lastName",
        title: t("modules.GS-US-001.fields.lastName.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "status",
        title: t("modules.GS-US-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },

      {
        name: "user",
        title: t("modules.GS-US-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-US-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-US-001.fields.userApp.title"),
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
const listQueryUser = (): IPresentationInputSelect => {
  return {
    items: [
      {
        order: 0,
        justification: JustificationText.end,
        codeText: "A",
        name: "Activo",
        description: "Activo",
        width: "100%",
        separator: false,
      },
      {
        order: 1,
        justification: JustificationText.start,
        codeText: "I",
        name: "Inactivo",
        width: "100%",
        separator: false,
      },
      {
        order: 2,
        justification: JustificationText.start,
        codeText: "C",
        name: "Creado",
        width: "100%",
        separator: false,
      },
    ],
  };
};


export { tableQueryUser, dataViewPresentation, listQueryUser };
//
