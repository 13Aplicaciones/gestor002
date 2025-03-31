/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatRelative,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { FormatMaskISO, TextFormat } from "../ConstantsPresentation";

/**
 *
 * Function to format a date string to a mask
 *
 * @param dateString
 * @param mask
 * @returns
 */
const formatDateMask = (dateString: string, mask: FormatMaskISO): string => {
  if (!dateString) {
    return "";
  }

  try {
    const date = parseISO(dateString);
    return format(date, mask);
  } catch (error) {
    console.error("formatDateMask -> Error:", error);
    return dateString;
  }
};

/**
 * Function to format a date string to a social network format
 *
 * @param dateString
 * @returns
 */
const formatDateSocialNetwork = (dateString: string): string => {
  if (!dateString) {
    return "";
  }
  try {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { locale: es });
  } catch (error) {
    console.error("formatDateSocialNetwork -> Error:", error);
    return dateString;
  }
};

/**
 * Function to format a date string to a social network format
 *
 * @param dateString
 * @returns
 */
const formatDateSocialNetworkDinamic = (dateString: string): string => {
  if (!dateString) {
    return "";
  }
  try {
    const date = parseISO(dateString);
    return formatDistanceToNowStrict(date, { locale: es });
  } catch (error) {
    console.error("formatDateSocialNetworkDinamic -> Error:", error);
    return dateString;
  }
};

/**
 * Function to format a date string to a serious format
 *
 * @param dateString
 * @returns
 */
const formatDateSerius = (dateString: string): string => {
  if (!dateString) {
    return "";
  }
  try {
    const date = parseISO(dateString);
    return formatRelative(date, new Date(), { locale: es });
  } catch (error) {
    console.error("formatDateSerius -> Error:", error);
    return dateString;
  }
};

/**
   * Funcion para format el contenido de la celda en base a la presentation.
   *
   * @param row Fila de la tabla.
   * @param valor Valor de la celda.
   * @param index Indice de la celda.
   *
   * @returns
   */
const formatFromTextFormat = (format: TextFormat, value: any): string => {
  const response = value;
  try {
    switch (format) {
      case TextFormat.none:
        return response || "- - - -";
      case TextFormat.decimal2:
        return response.toFixed(2);
      case TextFormat.date:
        return formatDateMask(response, FormatMaskISO.date);
      case TextFormat.dateHour:
        return formatDateMask(response, FormatMaskISO.dateHour);
      case TextFormat.dateHourZone:
        return formatDateMask(response, FormatMaskISO.dateHourZone);
      case TextFormat.dateHourZoneMiliseconds:
        return formatDateMask(
          response,
          FormatMaskISO.dateHourZoneMiliseconds
        );
      case TextFormat.hour:
        return formatDateMask(response, FormatMaskISO.hour);
      case TextFormat.dateSocialNetwork:
        return formatDateSocialNetwork(response);
      case TextFormat.dateSocialNetworkDinamic:
        return formatDateSocialNetworkDinamic(response);
      case TextFormat.action:
        return response;
      //TODO: Agregar mas formats de text.
      default:
        return response;
    }
  } catch {
    return response;
  }
};


export {
  formatFromTextFormat,
  formatDateMask,
  formatDateSerius,
  formatDateSocialNetwork,
  formatDateSocialNetworkDinamic,
};
