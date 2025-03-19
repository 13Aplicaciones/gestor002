import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatRelative,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { FormatMaskISO } from "../ConstantsPresentation";

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

export {
  formatDateMask,
  formatDateSocialNetwork,
  formatDateSocialNetworkDinamic,
  formatDateSerius,
};
