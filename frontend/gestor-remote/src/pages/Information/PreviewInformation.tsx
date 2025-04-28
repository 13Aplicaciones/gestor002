import { GenericPreview } from "../../components/forms/GenericPreview";
import { Menus } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataInformation, IRowDataInformation } from "./Structures/Types";

/**
 * Función para tener una vista previa de la Información del sistema.
 */
const PreviewInformation = ({ row }: { row?: IRowDataInformation }) => {
  return (
    <GenericPreview<IRowDataInformation>
      rowId={row?.uuid || ""}
      endpoint={Menus.INFORMATION_ENDPOINT}
      createEmptyData={createIRowDataInformation}
      getPresentationData={dataViewPresentation}
      entityName="Information"
    />
  );
};

export { PreviewInformation };