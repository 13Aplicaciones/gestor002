/* eslint-disable @typescript-eslint/no-explicit-any */
import { alertColor, useToastContext } from "ux-ui";
import { Alerts, BandPresentation, Direction, StatusEdit } from "ux-ui";
import { AreaField, InputField } from "ux-ui";
import { BannerInformation, InformationPanelRegistration } from "ux-ui";
import { Button, Flex } from "@radix-ui/themes";
import { DialogAlerts } from "ux-ui";
import { fetchData, IFetchData } from "api-fetch";
import { FooterForm, FormState } from "ux-ui";
import { getParameter, IParameter } from "orchestrator_remote/service/Parameter";
import { getToken, ITokenRoot, refreshToken} from "orchestrator_remote/service/Tokens";
import { IRowDataError } from "./Types";
import { MethodREST, TypeBody } from "api-fetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * Formulario de edición de errores del sistema.
 *
 * @author @omargo33
 *
 * @param param0
 * @returns
 */
const ErrorEdit = ({
  status,
  row,
  onAtras = () => {},
}: {
  status: StatusEdit;
  row?: IRowDataError;
  onAtras?: () => void;
}) => {
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>({} as IParameter);
  const { showToast } = useToastContext();
  const [stateFormulario, setFormStateulario] = useState<StatusEdit>(status || StatusEdit.create);
  const [messageFormulario, setMessageForm] = useState("");
  const [uuid, setUuid] = useState(row ? row.uuid : "");
  const [loading, setLoading] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogRefresh, setDialogRefresh] = useState(false);

  /**
   * Esquema de validación de formulario
   * 
   */ 
  const schema = yup.object({
    indexError: yup
      .string()
      .required("El indice es requerido")
      .min(5, "El indice debe tener mínimo 5 caracter")
      .max(128, "El indice debe tener máximo 10 caracteres"),
    message: yup
      .string()
      .required("El message es requerido")
      .max(1024, "El message debe tener máximo 124 caracteres"),
    description: yup
      .string()
      .max(4098, "La descripción debe tener máximo 4098 caracteres"),
    userApp: yup.string(),
  });

  /**
   * Función para registrar los datos del formulario
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexError: row?.indexError || "",
      message: row?.message || "",
      description: row?.description || "",
      userApp: row?.userApp || "",
    },
  });

  /**
   * Función para accionar el formulario
   * 
   * @param data 
   */
  const accionar = async (data: any) => {
    setLoading(true);
    const nombreAplicativo =
      window.location.pathname.split("/").pop() + "miNuevoDato";
    data = { ...data, usuarioPrograma: nombreAplicativo };

    setTimeout(async () => {
      if (stateFormulario === StatusEdit.create) {
        fetchData({
          url: parameterUrl?.valueText01,
          methodRest: MethodREST.POST,
          typeBody: TypeBody.JSON,
          bodyParameter: data,
          token: token.access_token,
          getToken: await refreshToken(),
        })
          .then((response) => {
            analizarAccionar(response);
            setFormStateulario(StatusEdit.edit);
          })
          .catch((error) => {
            setMessageForm("Error al crear el registro: " + error);
            return null;
          });
      }
      if (stateFormulario === StatusEdit.edit) {
        fetchData({
          url: parameterUrl?.valueText01 + "/" + uuid,
          methodRest: MethodREST.PUT,
          typeBody: TypeBody.JSON,
          bodyParameter: data,
          token: token.access_token,
          getToken: await refreshToken(),
        })
          .then((response) => {
            analizarAccionar(response);
          })
          .catch((error) => {
            setMessageForm("Error al accionar el registro " + error);
            return null;
          });
      }
      if (stateFormulario === StatusEdit.block) {
        fetchData({
          url: parameterUrl?.valueText01 + "/" + uuid,
          methodRest: MethodREST.DELETE,
          typeBody: TypeBody.NONE,
          bodyParameter: null,
          token: token.access_token,
          getToken: await refreshToken(),
        })
          .then((response) => {
            analizarAccionar(response);
            setFormStateulario(StatusEdit.find);
            setDialogStatus(false);
            onAtras();
          })
          .catch((error) => {
            setMessageForm("Error al borrar el registro " + error);
            return null;
          });
      }
      setLoading(false);
    }, 333);
  };

  /**
   * Función para analizar las respuestrra de accionar
   * 
   * @param response 
   * @returns 
   */
  const analizarAccionar = (response: IFetchData) => {
    if (response.error) {
      if (response.status === 400) {
        console.log(response.responseErrorJSON);
        showToast(
          response.error + " " + response.status.toString(),
          response.responseErrorJSON.message,
          Alerts.warning
        );

        console.log(response.error + " " + response.status.toString());
      } else {
        showToast(response.status.toString(), response.error, Alerts.warning);
        console.log(response.status.toString());
      }
      return;
    } else {
      const respuesta = response;
      if (respuesta.response && respuesta.response.uuid) {
        setUuid(respuesta.response.uuid);
      }
      showToast(
        respuesta.status.toString(),
        "Accion realizada con exito",
        Alerts.success
      );
      console.log(respuesta.status.toString());
    }
  };

  /**
   * Función para mostrar el popUp de borrar
   */
  const showPopUpDelete = () => {
    setFormStateulario(StatusEdit.block);
    setDialogStatus(true);
  };

  /**
   * Funcion para inicializar el token
   *
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter("GS_001_00", "200");
      setParameterUrl(parameter);
    };
    initializeStructure();
  }, []);

  /**
   * Funcion para inicializar el refrescador de dialogo
   */
  useEffect(() => {
    setDialogRefresh((prev) => !prev); // Forzar la actualización cuando cambie dialogStatus
  }, [dialogStatus]);

  return (
    <>
      <BannerInformation message={messageFormulario} alert={Alerts.error} />
      <Flex direction="row" gap="3" align="center">
        <FormState statusEdit={stateFormulario} />
        <InformationPanelRegistration row={row} />
      </Flex>
     
      <form onSubmit={handleSubmit(accionar)}>
        <InputField
          title="Indice"
          columns={BandPresentation.column_3}
          placeholder="ERR001"
          directionLabel={Direction.horizontal}
          register={register("indexError", { required: true })}
          messageError={errors.indexError?.message}
        />
        <AreaField
          title="Mensaje"
          columns={BandPresentation.column_2}
          rows={3}
          placeholder="Error al procesar la solicitud"
          directionLabel={Direction.horizontal}
          register={register("message", { required: true })}
          messageError={errors.message?.message}
        />
        <AreaField
          title="Descripción"
          columns={BandPresentation.column_1}
          rows={5}
          placeholder="Descripción detallada del error"
          directionLabel={Direction.horizontal}
          register={register("description")}
          messageError={errors.description?.message}
        />
        <FooterForm
          directionLabel={Direction.horizontal}
          columns={BandPresentation.column_2}
        >
          <Button type="submit" disabled={loading}>
            Guardar
          </Button>
          <Button
            type="button"
            variant="surface"
            disabled={stateFormulario === StatusEdit.create}
            onClick={() => {
              showPopUpDelete();
            }}
          >
            Borrar
          </Button>
        </FooterForm>
      </form>
    </>
  );
};

export default ErrorEdit;
