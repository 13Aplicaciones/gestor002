import { GenericPreview } from "../../components/forms/GenericPreviewProps";
import { Menus } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataError, IRowDataError } from "./Structures/Types";

/**
 * Función para tener una vista previa de los errores del sistema.
 */
const PreviewError = ({ row }: { row?: IRowDataError }) => {
  return (
    <GenericPreview<IRowDataError>
      row={row || createIRowDataError()}
      endpoint={Menus.ERROR_ENDPOINT}
      createEmptyData={createIRowDataError}
      getPresentationData={dataViewPresentation}
      entityName="Error"
    />
  );
};

export { PreviewError };