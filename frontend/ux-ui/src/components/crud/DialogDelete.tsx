import { alertColor } from "../IconosColoresAlerts";
import { Alerts } from "../../ConstantsPresentation";
import { Button } from "@radix-ui/themes";
import { DialogAlerts } from "../dialog/DialogState";
import { useTranslation } from "react-i18next";

/**
 * Dialogo de confirmación de eliminación de registro.
 *
 * @param dialogRefresh si se refresca el dialogo
 * @param dialogStatus en que estado se va a refrerscar el dialogo
 * @param loadingOnDelete si se esta cargando la eliminación se deshabilita los botones
 * @param onDelete función a ejecutar cuando se confirma la eliminación
 * @param onCancel función a ejecutar cuando se cancela la eliminación
 * @returns
 */
const DialogDelete = ({
  dialogRefresh,
  dialogStatus,
  loadingOnDelete,
  onDelete,
  onCancel,
}: {
  dialogRefresh: boolean;
  dialogStatus: boolean;
  loadingOnDelete: boolean;
  onDelete: () => void;
  onCancel: () => void;
}) => {
  const [t] = useTranslation("global_ux");

  return (
    <DialogAlerts
      key={dialogRefresh.toString()}
      status={dialogStatus}
      title={t("dialogDelete.title")}
      description={t("dialogDelete.message")}
      alert={Alerts.error}
      cancel={false}
      buttons={
        <>
          <Button
            disabled={loadingOnDelete}
            color={alertColor({ alert: Alerts.error })}
            variant="solid"
            onClick={() => {
              onDelete();
            }}
          >
            {t("actions.delete")}
          </Button>
          <Button
            disabled={loadingOnDelete}
            variant="solid"
            onClick={() => {
              onCancel();
            }}
          >
            {t("actions.cancel")}
          </Button>
        </>
      }
    ></DialogAlerts>
  );
};

export { DialogDelete };
