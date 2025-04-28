import { GenericPreview } from "../../components/forms/GenericPreview";
import { Menus } from "../../utils/Constants";
import { dataViewPresentation } from "./Structures/Presentations";
import { createIRowDataModule, IRowDataModule } from "./Structures/Types";

/**
 * Función para tener una vista previa de los Modules del sistema.
 */
const PreviewModule = ({ row }: { row?: IRowDataModule }) => {
  return (
    <GenericPreview<IRowDataModule>
      rowId={row?.uuid || ""}
      endpoint={Menus.MODULE_ENDPOINT}
      createEmptyData={createIRowDataModule}
      getPresentationData={dataViewPresentation}
      entityName="Module"
    />
  );
};

export { PreviewModule };
