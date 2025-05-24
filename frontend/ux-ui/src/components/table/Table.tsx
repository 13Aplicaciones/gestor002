/* eslint-disable @typescript-eslint/no-explicit-any */
import { blackA, whiteA } from "@radix-ui/colors";
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
  useThemeContext,
} from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alerts,
  JustificationText,
  SortColumn,
  TextFormat,
} from "../../ConstantsPresentation";
import { formatFromTextFormat } from "../../utils/FormatMask";
import { BannerInformation } from "../callout/Information";
import { IParametersQuery } from "./TableSearchOrder";

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
    cellSelect?: IPresentationCellSelect;
    onAction?: { onAction: (row: any) => void };
    component?: (row: any, children: ReactNode) => ReactNode;
  }>;
}

/**
 * Interfaz para la presentacion de la tabla.
 */
interface IPresentationCellSelect {
  items: Array<{
    group: string;
    codeText: string;
    codeNumber: number;
    name: string;
    description: string;
    order: number;
    status: string;
  }>;
}

/**
 * Funcion para justify el contenido de la celda en base a la presentation.
 *
 * @param justification Justificacion del texto.
 * 
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
 * @param cellIndex Indice de la celda.
 * @param justification Justificacion del texto.
 * @param row Fila de la tabla.
 * @param textFormat Formato del texto.
 * @param value Valor de la celda.
 * @param width Ancho de la celda.
 * @param onAction Funcion para la accion de la celda.
 * @param component Componente a mostrar en la celda.
 *
 * @returns
 */
const Cell = ({
  cellIndex,
  justification,
  row,
  textFormat,
  value,
  cellSelect,
  width,
  onAction,
  component,
}: {
  cellIndex: number;
  justification: JustificationText;
  row: any;
  textFormat: TextFormat;
  value: any;
  cellSelect?: IPresentationCellSelect;
  width: string;
  onAction?: { onAction: (row: any) => void };
  component?: (row: any, children: ReactNode) => ReactNode;
}) => {
  return (
    <Table.Cell
      justify={justify(justification)}
      key={cellIndex}
      maxWidth={width}
      width={width}
    >
      <CellFormatter
        value={value}
        textFormat={textFormat}
        justification={justification}
        cellSelect={cellSelect}
        row={row}
        onAction={onAction}
        component={component}
      />
    </Table.Cell>
  );
};


/**
 * Asignar el valor de la celda en base a la presentation.
 * 
 * @param value 
 * @param textFormat 
 * @param cellSelect 
 * @returns 
 */
const valueOfList = (value: string, textFormat: TextFormat, cellSelect: any) => {
  let textFomatter = value;
  if (cellSelect) {
    try {
      const selectedItem = cellSelect.find((item: any) => {
        return item.codeText === value;
      });
      if (selectedItem) {
        textFomatter = selectedItem.name;
      } else {
        textFomatter = "<No Definido>";
      }
    } catch (error) {
      textFomatter = "<No Encontrado>";
      console.error("Error al filtrar el valor:", error);
    }
  } else {
    textFomatter = formatFromTextFormat(textFormat, value);
  }

  return textFomatter;
}

/**
 * Funcion para formatear el texto de la celda.
 * 
 * @param param0 
 * @returns 
 */
const CellFormatter = (
  {
    value,
    textFormat,
    justification,
    row,
    cellSelect,
    onAction,
    component
  }: {
    value: string;
    textFormat: TextFormat;
    justification: JustificationText;
    row: any;
    cellSelect?: any;
    onAction?: { onAction: (row: any) => void };
    component?: (row: any, children: ReactNode) => ReactNode;
  }
) => {
  const textFomatter = valueOfList(value, textFormat, cellSelect);

  return (
    <Flex gap="2" justify={justify(justification)}>
      {component?.(row, null)}
      {(onAction && (
        <Link
          onClick={() => onAction?.onAction(row)}
          style={{ cursor: "pointer" }}
          truncate
          underline="hover"
          weight="medium"
        >{textFomatter}</Link>
      )) ||
        <Text truncate>{textFomatter}</Text>
      }
    </Flex>
  )
}

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
    <Flex>
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
                <Text size="2" weight="regular">
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
    </Flex>
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
  data,
  isHeader,
  isLineNumber,
  isBand,
  presentationSorts,
  onOrderChange,
}: {
  presentationTable: IPresentationTable;
  data: any;
  isHeader?: boolean;
  isLineNumber?: boolean;
  isBand?: boolean;
  presentationSorts?: IParametersQuery;
  onOrderChange?: {
    onOrderChange: (title: string, direction: SortColumn) => void;
  };
}) => {

  const [presentation, setPresentation] = useState<IPresentationTable>(presentationTable);
  const [sorts, setSorts] = useState<IParametersQuery>({} as IParametersQuery);
  const [t] = useTranslation("global_ux");
  const theme = useThemeContext();

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
              align="center"
              justify={justify(item.justification)}
              key={index}
              width={item.width}
            >
              <Title
                name={item.name}
                onOrderChange={onOrderChange}
                sort={sorts[item.name]}
                text={item.title}
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
                    isBand && rowIndex % 2 !== 0 ? theme.appearance === 'light' ? blackA.blackA1 : whiteA.whiteA1 : "none",
                }}
              >
                {isLineNumber && (
                  <Table.Cell justify="end" align="center" width="5vw">
                    {rowIndex + 1}
                  </Table.Cell>
                )}
                {presentation.items.map((field: any, cellIndex: number) => (
                  <Cell
                    cellIndex={cellIndex}
                    component={presentation.items[cellIndex].component}
                    justification={presentation.items[cellIndex].justification}
                    key={cellIndex}
                    onAction={presentation.items[cellIndex].onAction}
                    row={row}
                    textFormat={presentation.items[cellIndex].format}
                    value={row[field.name]}
                    width={presentation.items[cellIndex].width}
                    cellSelect={presentation.items[cellIndex].cellSelect}
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

