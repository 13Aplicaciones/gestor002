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
 * Presentación de la tabla de UserDefinedCodeHeader
 *
 * @returns
 */
const tableQueryUserDefinedCodeHeader =
  async (): Promise<IPresentationTable> => {
    return {
      banding: true,
      headers: true,
      numberLinea: false,
      skeletonWidth: "90vw",
      items: [
        {
          name: "codeText",
          title: t("modules.GS-CD-001.fields.codeText.title"),
          justification: JustificationText.start,
          format: TextFormat.none,
          width: "10vw",
        },
        {
          name: "name",
          title: t("modules.GS-CD-001.fields.name.title"),
          justification: JustificationText.start,
          format: TextFormat.none,
          width: "20vw",
          order: SortColumn.asc,
          orderNameColumn: "name",
        },
        {
          name: "description",
          title: t("modules.GS-CD-001.fields.description.title"),
          justification: JustificationText.start,
          format: TextFormat.none,
          width: "34vw",
        },
        {
          name: "userDate",
          title: t("modules.GS-CD-001.fields.userDate.title"),
          justification: JustificationText.start,
          format: TextFormat.dateSocialNetworkDinamic,
          width: "20vw",
        },
        {
          name: "status",
          title: t("modules.GS-CD-001.fields.status.title"),
          justification: JustificationText.start,
          format: TextFormat.none,
          width: "10vw",
          // cellSelect: statusList,
        },
        {
          name: "acciones",
          title: t("modules.GS-CD-001.fields.acciones.abrev"),
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
const listaQueryUserDefinedCodeHeader = (): IPresentationInputSelect => {
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
        name: "uuid",
        title: t("modules.GS-CD-001.fields.uuid.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "indexModule",
        title: t("modules.GS-CD-001.fields.indexModule.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "name",
        title: t("modules.GS-CD-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "context",
        title: t("modules.GS-CD-001.fields.context.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "status",
        title: t("modules.GS-CD-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "user",
        title: t("modules.GS-CD-001.fields.user.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
      {
        name: "userDate",
        title: t("modules.GS-CD-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
      },
      {
        name: "userApp",
        title: t("modules.GS-CD-001.fields.userApp.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
      },
    ],
  };
};

const listaFormUserDefinedCodeHeader = (): IPresentationInputSelect => {
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
  listaFormUserDefinedCodeHeader,
  listaQueryUserDefinedCodeHeader,
  tableQueryUserDefinedCodeHeader,
};
