import {
  format,
  formatDistanceToNow,
  formatRelative,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";
import { FormatMaskISO } from "../ConstantsPresentation";

const formatDateMask = (dateString: string, mask: FormatMaskISO): string => {
  const date = parseISO(dateString);
  return format(date, mask);
};

const formatDateSocialNetwork = (dateString: string): string => {
  const date = parseISO(dateString);
  const resultado = formatDistanceToNow(date, { locale: es });
  return resultado;
};

const formatDateSerius = (dateString: string): string => {
  const date = parseISO(dateString);
  const resultado = formatRelative(date, new Date(), { locale: es });
  return resultado;
};

export { formatDateMask, formatDateSocialNetwork, formatDateSerius };
