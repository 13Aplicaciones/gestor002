import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  AreaField,
  BandPresentation,
  Direction,
  FooterForm,
  IFormProps,
  InputField,
  StatusEdit,
} from "ux-ui";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";
import { GenericCrudForm } from "../../components/forms/GenericCrudForm";

/**
 * Formulario de edición de errores del sistema.
 */
const FormEditInformation = ({ status, row, onAtras }: IFormProps) => {
  const [t] = useTranslation("global_gestor");

  /**
   * Esquema de validación de formulario
   */
  const schema = yup.object({
    name: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 128 })),
    value01: yup
      .string()
      .required(t("validation.required"))
      .min(5, t("validation.min", { min: 5 }))
      .max(128, t("validation.max", { max: 256 })),
    value02: yup
      .string().max(256, t("validation.max", { max: 256 })),
    userApp: yup.string(),
  });

  /**
   * Hook para el manejo de formularios
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: row?.name || "",
      value01: row?.value01 || "",
      value02: row?.value02 || "",
      userApp: row?.userApp || "",
    },
  });

  return (
    <GenericCrudForm
      status={status}
      row={row}
      onAtras={onAtras}
      endpoint={Menus.INFORMATION_ENDPOINT}
      moduleCode={MODULE}
      renderForm={({
        formStatus,
        loading,
        handleSubmit: submitData,
        showPopUpDelete,
      }) => (
        <form onSubmit={handleSubmit(submitData)}>
          <InputField
            title={t("modules.GS-IN-001.fields.name.title")}
            columns={BandPresentation.column_3}
            placeholder={t("modules.GS-IN-001.fields.name.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("name")}
            messageError={errors.name?.message}
          />
          <AreaField
            title={t("modules.GS-IN-001.fields.value01.title")}
            columns={BandPresentation.column_2}
            rows={3}
            placeholder={t("modules.GS-IN-001.fields.value01.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("value01")}
            messageError={errors.value01?.message}
          />
          <AreaField
            title={t("modules.GS-IN-001.fields.value02.title")}
            columns={BandPresentation.column_2}
            rows={3}
            placeholder={t("modules.GS-IN-001.fields.value02.placeholder")}
            directionLabel={Direction.horizontal}
            register={register("value02")}
            messageError={errors.value02?.message}
          />
          <FooterForm
            directionLabel={Direction.horizontal}
            columns={BandPresentation.column_2}
          >
            <Button type="submit" disabled={loading}>
              {t("actions.save")}
            </Button>
            <Button
              type="button"
              form="none"
              variant="surface"
              disabled={formStatus === StatusEdit.create}
              onClick={showPopUpDelete}
            >
              {t("actions.delete")}
            </Button>
          </FooterForm>
        </form>
      )}
    />
  );
};

export { FormEditInformation };
