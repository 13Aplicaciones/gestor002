import { Button } from "@radix-ui/themes";
import { Alerts, StatusEdit } from "../../ConstantsPresentation";
import { DialogAlerts } from "../dialog/DialogState";
import { alertColor } from "../IconosColoresAlerts";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const DialogDelete = () => {
  const [t] = useTranslation("global_ux");
  const [dialogStatus, setDialogStatus] = useState(false);

  return (
    <DialogAlerts
      key={dialogRefresh.toString()}
      status={dialogStatus}
      title={t("dialogDelete{.delete")}
      description={t("dialogDelete{.description")}
      alert={Alerts.error}
      cancel={false}
      buttons={
        <>
          <Button
            size="3"
            disabled={loading}
            color={alertColor({ alert: Alerts.error })}
            variant="solid"
            onClick={() => {
              accionar(null);
            }}
          >
            {t("actions.delete")}
          </Button>
          <Button
            size="3"
            onClick={() => {
              setFormStateulario(StatusEdit.edit);
              setDialogStatus(false);
            }}
          >
            {t("actions.cancel")}
          </Button>
        </>
      }
    ></DialogAlerts>
  );
};

export default DialogDelete;
