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
const tableQueryModule = async (): Promise<IPresentationTable> => {
  const statusList = await getUserDefinedCodeByGroup("LG_001_00", "AD_CD_01");

  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "indexModule",
        title: t("modules.GS-MD-001.fields.indexModule.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.desc,
        orderNameColumn: "index_module",
      },
      {
        name: "name",
        title: t("modules.GS-MD-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "context",
        title: t("modules.GS-MD-001.fields.context.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "34vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-MD-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "status",
        title: t("modules.GS-MD-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        cellSelect: statusList,
      },
      {
        name: "acciones",
        title: t("modules.GS-MD-001.fields.acciones.abrev"),
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
      },
    ],
  };
};

/**
 * Lista de módulos
 *
 * @returns
 */
const listaQueryModule = (): IPresentationInputSelect => {
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
        order: 9,
        separator: true,
      },
      {
        order: 10,
        justification: JustificationText.start,
        codeText: "X",
        color: "red",
        iconName: "TrashIcon",
        name: "Borrado",
        description: "Borrado",
        width: "100%",
        separator: false,
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
        name: "indexModule",
        title: t("modules.GS-MD-001.fields.indexModule.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "name",
        title: t("modules.GS-MD-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "context",
        title: t("modules.GS-MD-001.fields.context.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "status",
        title: t("modules.GS-MD-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };
};

const listaFormModule = (): IPresentationInputSelect => {
  return {
    items: [
      {
        order: 0,
        justification: JustificationText.end,
        codeText: "A",
        name: "Activo",
        width: "100%",
      },
      {
        order: 1,
        justification: JustificationText.start,
        codeText: "I",
        name: "Inactivo",
        width: "100%",
      },
    ],
  };
};

export {
  dataViewPresentation,
  listaFormModule,
  listaQueryModule,
  tableQueryModule,
};
