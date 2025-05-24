import {
  EyeOpenIcon,
  LockClosedIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Badge, Button, Flex, Separator } from "@radix-ui/themes";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Alerts,
  BandPresentation,
  Direction,
  StatusEdit,
} from "../../ConstantsPresentation";
import { alertColor } from "../IconosColoresAlerts";
import useCalculatePresentation from "../input/Calculations";

/**
 * Funciones de presentation de pie en los formualrios y estos son resize.
 *
 * @autor @omargo33
 * @since 2025-01-20
 *
 */

/**
 * Funcion para orderar los botones en el pie de los formularios y espacio para los botones.
 *
 * @param columns Columnas de la banda de presentación
 * @param directionLabel Dirección de la banda de presentación
 * @param children Botones a mostrar
 *
 * @returns
 */
const FooterForm = ({
  columns,
  directionLabel,
  children,
}: {
  columns?: BandPresentation;
  directionLabel: Direction | Direction.horizontal;
  children?: ReactNode;
}) => {
  const presentation = useCalculatePresentation(
    directionLabel,
    columns,
    "60vw"
  );

  return (
    <Flex
      direction={presentation.direction}
      gapX="3"
      style={{ alignItems: presentation.align }}
    >
      <Flex
        width="calc(150px * var(--scaling))"
        style={{ justifyContent: presentation.justify }}
      />
      <Flex
        gapX="2"
        style={{ justifyContent: presentation.justify }}
        align="center"
      >
        {children}
      </Flex>
    </Flex>
  );
};

/**
 * Funcion para mostrar el estado de edición de los formularios.
 *
 * @param statusEdit Estado de edición del formulario
 * @returns
 */
const FormState = ({ statusEdit }: { statusEdit: StatusEdit }) => {
  const [t] = useTranslation("global_ux");

  return (
    <Flex>
      {statusEdit === StatusEdit.create && (
        <Badge
          color={alertColor({ alert: Alerts.info })}
          radius="full"
          size="1"
          variant="soft"
        >
          <PlusIcon />
          {t("stateForm.create")}
        </Badge>
      )}
      {statusEdit === StatusEdit.edit && (
        <Badge
          color={alertColor({ alert: Alerts.success })}
          radius="full"
          size="1"
          variant="soft"
        >
          <Pencil1Icon />
          {t("stateForm.edit")}
        </Badge>
      )}
      {statusEdit === StatusEdit.block && (
        <Badge
          color={alertColor({ alert: Alerts.warning })}
          radius="full"
          size="1"
          variant="soft"
        >
          <LockClosedIcon />
          {t("stateForm.block")}
        </Badge>
      )}
      {statusEdit === StatusEdit.see && (
        <Badge
          color={alertColor({ alert: Alerts.success })}
          radius="full"
          size="1"
          variant="soft"
        >
          <EyeOpenIcon />
          {t("stateForm.see")}
        </Badge>
      )}
    </Flex>
  );
};

/**
 * Funcion para mostrar los botones de acción en el pie de los formularios.
 *
 * @param param0
 * @returns
 */
const FooterFormAction = ({
  loading,
  onBack,
  showPopUpDelete,
  formStatus,
}: {
  loading: boolean;
  onBack: () => void;
  showPopUpDelete: () => void;
  formStatus: StatusEdit;
}) => {
  const [t] = useTranslation("global_ux");

  return (
    <FooterForm
      directionLabel={Direction.horizontal}
      columns={BandPresentation.column_1}
    >
      <Button type="submit" variant="solid" disabled={loading}>
        {t("actions.save")}
      </Button>
      <Button form="none" variant="surface" onClick={onBack}>
        {t("actions.cancel")}
      </Button>
      <Separator orientation="vertical" />
      <Button
        form="none"
        variant="outline"
        onClick={showPopUpDelete}
        disabled={formStatus === StatusEdit.create}
      >
        {t("actions.delete")}
      </Button>
    </FooterForm>
  );
};

export { FooterForm, FooterFormAction, FormState };
