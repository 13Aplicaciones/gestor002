import {
  JustificationText,
  TextFormat,
} from "../../../../ConstantsPresentation";
import i18n from "../../../../i18n";
import { IPresentationTable } from "../../../table/Table";

/**
 * Presentacion de la tabla de combo items
 *
 * @returns
 */
const tableQueryLov = (): IPresentationTable => {
  const t = (key: string) => i18n.t(key, { ns: "global_ux" });

  return {
    banding: true,
    headers: true,
    numberLinea: true,
    skeletonWidth: "90vw",
    rowCount: 8,
    items: [
      {
        name: "label",
        title: t("lov.fields.label.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "15vw",
      },
      {
        name: "labelAlternative",
        title: t("lov.fields.labelAlternative.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "description",
        title: t("lov.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "40vw",
      },
      {
        name: "value",
        title: t("lov.fields.value.title"),
        justification: JustificationText.end,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "doubleValue",
        title: t("lov.fields.doubleValue.title"),
        justification: JustificationText.end,
        format: TextFormat.decimal2,
        width: "10vw",
      },
    ],
  };
};

export { tableQueryLov };
