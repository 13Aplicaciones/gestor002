/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusEdit } from "../../ConstantsPresentation";

/**
 * Interfaz para el Query.
 */
interface IQueryProps {
    onEditRow: (row: any) => void;
    onSeeRow: (row: any) => void;
    onCreateRow: () => void;
}

/**
 * Interfaz para el Preview.
 */
interface IPreviewProps {
    row: any;
    onBack: () => void;
}

/**
 * Interfaz para el FormEdit.
 */
interface IFormProps {
    status: StatusEdit;
    row: any;
    onBack: () => void;
}

export type { IQueryProps, IFormProps, IPreviewProps };
