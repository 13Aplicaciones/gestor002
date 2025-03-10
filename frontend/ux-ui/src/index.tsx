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
export { alertIcon, alertIconSize, alertColor, alertColorBackground, alertVariant, mapStatusToAlert } from './components/IconosColoresAlerts';
export { Alerts, BandPresentation, Direction, TextFormat, JustificationText, SortColumn, StatusEdit } from './ConstantsPresentation.tsx';
export { BannerInformation, InformationPanelRegistration } from './components/callout/Information';
export { DialogForm, DialogAlerts } from './components/dialog/Dialog';
export { GridDashboard } from './components/grid/GridDynamic';
export { BadgeCard, CardGrid, CardGridSkeleton, ValueDescriptionCard } from './components/grid/Card';
export { getIconComponent } from './components/icon/IconDynamic';
export { ButtonCreateRecordFloating } from './components/button/Button';
export { AreaField, InputField } from './components/input/Input';
export { FormState, FooterForm } from './components/form/Form';
// Exportar elementos Tipos de datos
export type { DataItemBadge } from './components/grid/Card';

// Exportar elementos Tipos de Tablas
export type { IPresentationTable } from './components/table/Table';
export type { IParameters } from './components/table/TableSearch';

// Exportar elementos de la libreria para tabla
export { TableConfigurable } from './components/table/Table';
export { CreateSearchField } from './components/table/TableSearch';

// Exportar elementos de la libreria para Toast
export { ToastContextProvider  } from './components/toast/ToastContextProvider';
export { useToastContext } from './components/toast/useToastContext';

// Exportar elementos de la libreria Pages basicas
export { NotFound } from './pages/NotFound';

// Exportar elementos de i18n
import global_ux_en from './locales/en/global_ux.json';
export {global_ux_en}

import global_ux_es from './locales/es/global_ux.json';
export {global_ux_es}
