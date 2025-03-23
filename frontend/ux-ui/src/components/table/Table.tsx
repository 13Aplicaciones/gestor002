/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alerts,
  TextFormat,
  SortColumn,
  JustificationText,
  FormatMaskISO,
} from "../../ConstantsPresentation";
import { blackA, /*whiteA*/ } from "@radix-ui/colors";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  Flex,
  IconButton,
  Link,
  Skeleton,
  Table,
  Text,
  //useThemeContext,
} from "@radix-ui/themes";
import { useTranslation } from "react-i18next";
import { BannerInformation } from "../callout/Information";
import { ReactNode, useEffect, useState } from "react";
import { IParametersQuery } from "./TableSearch";
import {
  formatDateMask,
  formatDateSocialNetwork,
  formatDateSocialNetworkDinamic,
} from "../../utils/FormatMask";

/**
 * Componente de tabla paginada.
 *
 * @author @omargo33
 * @since 2025-01-20
 *
 */

/**
 * Interfaz para la presentacion de la tabla.
 */
interface IPresentationTable {
  banding: boolean;
  headers: boolean;
  numberLinea: boolean;
  skeletonWidth: string;
  items: Array<{
    format: TextFormat;
    justification: JustificationText;
    name: string;
    title: string;
    width: string;
    order?: SortColumn;
    orderNameColumn?: string;
    onAction?: { onAction: (row: any) => void };
    component?: (row: any, children: ReactNode) => ReactNode;
  }>;
}

/**
 * Funcion para justify el contenido de la celda en base a la presentation.
 *
 * @param index
 * @returns
 */
const justify = (justification: JustificationText) => {
  try {
    return justification;
  } catch {
    return "start";
  }
};

/**
 * Funcion para crear una celda de la tabla.
 *
 * @param row Filas de la tabla.
 * @param field Campo de la tabla.
 * @param cellIndex Indice de la celda.
 *
 * @returns
 */
const Cell = ({
  value,
  cellIndex,
  row,
  width,
  justification,
  textFormat,
  onAction,
  component,
}: {
  value: any;
  cellIndex: number;
  row: any;
  width: string;
  justification: JustificationText;
  textFormat: TextFormat;
  onAction?: { onAction: (row: any) => void };
  component?: (row: any, children: ReactNode) => ReactNode;
}) => {
  /**
   * Funcion para format el contenido de la celda en base a la presentation.
   *
   * @param row Fila de la tabla.
   * @param valor Valor de la celda.
   * @param index Indice de la celda.
   *
   * @returns
   */
  const format = (format: TextFormat, value: any): string => {
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
    return response;
  };

  return (
    <Table.Cell
      justify={justify(justification)}
      key={cellIndex}
      maxWidth={width}
      width={width}
    >
      <Flex gap="2" justify={justify(justification)}>
        {component?.(row, null)}
        {(onAction && (
          <Link
            truncate
            onClick={() => onAction?.onAction(row)}
            style={{ cursor: "pointer" }}
          >
            <Text weight="regular">{format(textFormat, value)}</Text>
          </Link>
        )) || <Text truncate>{format(textFormat, value)}</Text>}
      </Flex>
    </Table.Cell>
  );
};

/**
 * Funcion para mostrar el <Title>.
 *
 * @param text Text a mostrar.
 * @param index Indice de la columna.
 *
 * @returns
 */
const Title = ({
  name,
  text,
  sort,
  onOrderChange,
}: {
  name: string;
  text: string;
  sort?: SortColumn;
  onOrderChange?: {
    onOrderChange: (name: string, direction: SortColumn) => void;
  };
}) => {
  const [t] = useTranslation("global_ux");
  const [sortVisible, setSortVisible] = useState(sort);

  const handleChange = (
    name: string,
    direction: SortColumn,
    onOrderChange: any
  ) => {
    setSortVisible(direction);

    if (onOrderChange) {
      onOrderChange.onOrderChange(name, direction);
    } else {
      console.warn(
        "onOrderChange -> No Setup (name: " +
          name +
          " direction: " +
          direction +
          ")"
      );
    }
  };

  useEffect(() => {
    setSortVisible(sort);
  }, [sort]);

  return (
    <>
      {(!sortVisible && (
        <Text size="2" weight="bold">
          {text}
        </Text>
      )) || (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <IconButton size="1" variant="ghost" style={{ cursor: "pointer" }}>
              {sortVisible === SortColumn.asc && <CaretUpIcon />}
              {sortVisible === SortColumn.desc && <CaretDownIcon />}
              {sortVisible === SortColumn.neutral && <CaretSortIcon />}
              <Text size="2" weight="bold">
                {text}
              </Text>
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              disabled={sortVisible === SortColumn.asc}
              onClick={() => {
                handleChange(name, SortColumn.asc, onOrderChange);
              }}
            >
              <CaretUpIcon />
              {t("tabla.orderAsc")}
            </DropdownMenu.Item>
            <DropdownMenu.Item
              disabled={sortVisible === SortColumn.desc}
              onClick={() => {
                handleChange(name, SortColumn.desc, onOrderChange);
              }}
            >
              <CaretDownIcon />
              {t("tabla.orderDesc")}
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              disabled={sortVisible === SortColumn.neutral}
              onClick={() => {
                handleChange(name, SortColumn.neutral, onOrderChange);
              }}
            >
              <CaretSortIcon />
              {t("tabla.unordered")}
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  );
};

/*
 * Tabla configurable con presentation de columns y datos.
 *
 * @param presentation Json para la presentation de la tabla.
 * @param data Json con los datos a mostrar en la tabla.
 * @param isHeader si se muestra el header de la tabla.
 * @param isLineNumber si se muestra el numero de linea (Agrea un 5vw) para esta columna.
 * @param isBand si se muestra la banda de colores en las filas.
 *
 * @returns
 */
const TableConfigurable = ({
  presentationTable,
  presentationSorts,
  data,
  isHeader,
  isLineNumber,
  isBand,
  onOrderChange,
}: {
  presentationTable: IPresentationTable;
  presentationSorts: IParametersQuery;
  data: any;
  isHeader?: boolean;
  isLineNumber?: boolean;
  isBand?: boolean;
  onOrderChange?: {
    onOrderChange: (title: string, direction: SortColumn) => void;
  };
}) => {
  const [t] = useTranslation("global_ux");
  const [presentation, setPresentation] =
    useState<IPresentationTable>(presentationTable);
  const [sorts, setSorts] = useState<IParametersQuery>({} as IParametersQuery);
  //const theme  = useThemeContext();
   

  /**
   * Funcion para generar el header de la tabla.
   *
   * @returns
   */
  const headerTable = () => {
    return isHeader === false ? (
      <></>
    ) : (
      <Table.Header>
        <Table.Row>
          {isLineNumber && (
            <Table.ColumnHeaderCell justify="center">#</Table.ColumnHeaderCell>
          )}
          {presentation.items.map((item: any, index: number) => (
            <Table.ColumnHeaderCell
              key={index}
              width={item.width}
              justify={justify(item.justification)}
              align="center"
            >
              <Title
                name={item.name}
                text={item.title}
                sort={sorts[item.name]}
                onOrderChange={onOrderChange}
              />
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  };

  /**
   * Efecto para actualizar la presentation de la tabla.
   */
  useEffect(() => {
    setPresentation(presentationTable);
    setSorts(presentationSorts || {});
  }, [presentationTable, presentationSorts]);

  return (
    <>
      {!data || data.length === 0 ? (
        <BannerInformation
          message={t("tabla.noDataSearch")}
          alert={Alerts.info}
        />
      ) : (
        <Table.Root size="1" variant="surface" layout="auto">
          {headerTable()}
          <Table.Body>
            {data.map((row: any, rowIndex: number) => (
              <Table.Row
                key={rowIndex}
                style={{
                  backgroundColor:
                    isBand && rowIndex % 2 !== 0 ? blackA.blackA1 : "none",
                }}
              >
                {isLineNumber && (
                  <Table.Cell justify="end" align="center" width="5vw">
                    {rowIndex + 1}
                  </Table.Cell>
                )}
                {presentation.items.map((field: any, cellIndex: number) => (
                  <Cell
                    key={cellIndex}
                    cellIndex={cellIndex}
                    justification={presentation.items[cellIndex].justification}
                    row={row}
                    textFormat={presentation.items[cellIndex].format}
                    value={row[field.name]}
                    width={presentation.items[cellIndex].width}
                    onAction={presentation.items[cellIndex].onAction}
                    component={presentation.items[cellIndex].component}
                  />
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </>
  );
};

/**
 * Muestra un esqueleto de la tabla paginada.
 *
 * @param columns Numero de columns.
 *
 * @returns
 */
const TableSkeleton = ({ column }: { column: number }) => {
  return (
    <Flex gap="4" p="2" direction="column">
      {Array.from({ length: column }).map((_, index) => (
        <Flex key={index} gap="4" align="center" direction="row">
          <Skeleton width="10vw">
            <Text>#</Text>
          </Skeleton>
          <Skeleton
            key={index}
            width={index % 2 !== 0 ? "40%" : Math.abs(70 - index * 10) + "%"}
          >
            <Text>L.</Text>
          </Skeleton>
        </Flex>
      ))}
      <Skeleton width="23vw">
        <Text>#</Text>
      </Skeleton>
      <Skeleton width="15vw">
        <Text>#</Text>
      </Skeleton>
    </Flex>
  );
};

export { TableConfigurable, TableSkeleton };
export type { IPresentationTable };
