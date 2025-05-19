/* eslint-disable react-refresh/only-export-components */

/**
 *
 * Exportar elementos de la libreria
 *
 * @author @omargo33
 * @since 2025-01-10
 *
 * @see https://dlcastillop.com/blog/libreria-hooks-react
 */
// Exportar elementos de la libreria UI
export {
  alertIcon,
  alertIconSize,
  alertColor,
  alertColorBackground,
  alertVariant,
  mapStatusToAlert,
} from "./components/IconosColoresAlerts";
export {
  Alerts,
  BandPresentation,
  Direction,
  TextFormat,
  JustificationText,
  SortColumn,
  StatusEdit,
  FormatMaskISO,
} from "./ConstantsPresentation.tsx";
export {
  BannerInformation,
  InformationPanelRegistration,
} from "./components/callout/Information";
export { DialogForm, DialogAlerts } from "./components/dialog/DialogState";
export { DialogDelete } from "./components/crud/DialogDelete";
export { PageCrud } from "./components/crud/PageCrud";

export { GridDashboard } from "./components/grid/GridDynamic";
export {
  BadgeCard,
  CardGrid,
  CardGridSkeleton,
  ValueDescriptionCard,
} from "./components/grid/Card";
export { IconComponent } from "./components/icon/IconDynamic";
export {
  ButtonCreateRecordFloating,
  ButtonBackFloating,
} from "./components/button/Button";
export {
  AreaField,
  InputField,
  InputSelect,
  InputFieldDate,
  InputSearchDynamic,
  InputSecretField,
  InputSubmit,
} from "./components/input/Input";
export type { IPresentationInputSelect } from "./components/input/Input";

// Exportar elementos de la libreria para formularios
export { FormState, FooterForm } from "./components/form/Form.tsx";
export { GenericCrudForm } from "./components/form/GenericCrudForm";
export { GenericPreview } from "./components/form/GenericPreview";
export { GenericQuery } from "./components/form/GenericQuery";
export { GenericQueryForm } from "./components/form/GenericQueryForm";
export type { GenericCrudFormProps } from "./components/form/GenericCrudForm";
export type { GenericPreviewProps } from "./components/form/GenericPreview";
export type { GenericQueryFormProps } from "./components/form/GenericQueryForm";
export type { GenericQueryProps } from "./components/form/GenericQuery";

// Exportar elementos Tipos de datos
export type { DataItemBadge } from "./components/grid/Card";

// Exportar elementos Tipos de Tablas
export type { IPresentationTable } from "./components/table/Table";
export type { IParametersQuery } from "./components/table/TableSearch";
export type {
  IQueryProps,
  IFormProps,
  IPreviewProps,
} from "./components/crud/Types";
export type { IPresentationDataList } from "./components/dataList/DataList";

// Exportar elementos de la libreria Para DataList
export {
  DataListConfigurable,
  DataListSkeleton,
} from "./components/dataList/DataList";

// Exportar elementos de la libreria para tabla
export { TableConfigurable } from "./components/table/Table";
export { TableSearch } from "./components/table/TableSearch";
export { TableSearchOrder } from "./components/table/TableSearchOrder";

// Exportar elementos de la libreria para Toast
export { ToastContextProvider } from "./components/toast/ToastContextProvider";
export { useToastContext } from "./components/toast/useToastContext";

// Exportar elementos formatos de fecha
export {
  formatDateMask,
  formatDateSocialNetwork,
  formatDateSocialNetworkDinamic,
} from "./utils/FormatMask";

// Exportar elementos de la libreria Pages basicas
export { NotFound } from "./pages/NotFound";

// Exportar elementos de i18n
import global_ux_en from "./locales/en/global_ux.json";
export { global_ux_en };

import global_ux_es from "./locales/es/global_ux.json";
export { global_ux_es };
