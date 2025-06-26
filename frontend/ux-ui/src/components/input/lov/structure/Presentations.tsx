import { JustificationText, TextFormat } from "../../../../ConstantsPresentation";
import { IPresentationTable } from "../../../table/Table";

/**
 * Presentacion de la tabla de combo items
 *
 * @returns
 */
const tableQueryLov = (): IPresentationTable => {
  return {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "index",
        title: "index",
        
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "label",
        title: "label",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "labelAlternative",
        title: "labelAlternative",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "description",
        title: "description",
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
      },
      {
        name: "value",
        title: "value",
        justification: JustificationText.end,
        format: TextFormat.none,
        width: "10vw",
      },
      {
        name: "doubleValue",
        title: "doubleValue",
        justification: JustificationText.end,
        format: TextFormat.decimal2,
        width: "10vw",
      },
      {
        name: "status",
        title: "status",
        justification: JustificationText.center,
        format: TextFormat.none,
        width: "10vw",
      },
    ],
  };
};

export { tableQueryLov };
