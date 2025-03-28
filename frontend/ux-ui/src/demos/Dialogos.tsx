import { Alerts } from "../ConstantsPresentation";
import { Button } from "@radix-ui/themes";
import {
  DialogAlerts,
  DialogForm,
} from "../components/dialog/DialogState";
import { hideDialogDinamico, showDialogDinamico } from "api-fetch";
import { useDispatch } from "react-redux";
import { useToastContext } from "../components/toast/useToastContext";

/**
 * Demo de dialogos
 *
 * @author @omargo33
 * @returns
 */
const MiDialogos = () => {
  const dispatch = useDispatch();
  const { showToast } = useToastContext();
  const handleToast = () => {
    showToast(
      "Titulo",
      "Detalle del mensaje, que es super interesante",
      Alerts.success
    );
  };

  return (
    <>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <Button
          onClick={() => {
            handleToast();
          }}
        >
          Abrir Toast !!
        </Button>
      </div>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <Button
          onClick={() => {
            dispatch(showDialogDinamico("1"));
          }}
        >
          Abrir dialogo 1!!
        </Button>

        <DialogForm
          key="true"
          status={true}
          title="Agregar RUC"
          description="Ingrese el <strong>RUC</strong> que desea agregar"
          buttons={
            <>
              <Button
                size="3"
                variant="surface"
                onClick={() => {
                  dispatch(hideDialogDinamico("1"));
                }}
              >
                cerrar{" "}
              </Button>
              <Button
                size="3"
                variant="soft"
                onClick={() => {
                  dispatch(hideDialogDinamico("1"));
                }}
              >
                cerrar45{" "}
              </Button>
            </>
          }
        >
          {
            <div
              style={{
                padding: 20,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label>
                Ejemplo:
                <input type="text" />
              </label>
            </div>
          }
        </DialogForm>
      </div>

      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
        }}
      >
        <Button
          onClick={() => {
            dispatch(showDialogDinamico("2"));
          }}
        >
          Abrir dialogo 2 !!
        </Button>

        <DialogAlerts
          key="true"
          status={true}
          cancel={true}
          title="Agregar RUC"
          description="Ingrese el <strong>RUC</strong> que desea agregar"
          alert={Alerts.warning}
        ></DialogAlerts>
      </div>
    </>
  );
};

export { MiDialogos };
