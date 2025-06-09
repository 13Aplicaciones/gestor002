/* eslint-disable @typescript-eslint/no-explicit-any */
import { blackA, whiteA } from "@radix-ui/colors";
import {
  DataList,
  Flex,
  Link,
  Skeleton,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import { ReactNode, useEffect, useState } from "react";
import {
  BandPresentation,
  Direction,
  JustificationText,
  TextFormat,
} from "../../ConstantsPresentation";
import { formatFromTextFormat } from "../../utils/FormatMask";
import useCalculatePresentation from "../input/Calculations";

/**
 * Interfaz para la presentacion de un data list.
 *
 * @param banding Banding del datalist.
 * @param headers Headers del datalist.
 * @param items Items a mostrar en el datalist.
 * @param items.format Formato del texto.
 * @param items.justification Justificacion del texto.
 * @param items.name Nombre del campo.
 * @param items.title Titulo del campo.
 * @param items.onAction Funcion a ejecutar al hacer click en el campo.
 * @param items.component Componente a mostrar en el campo.
 *
 */
interface IPresentationDataList {
  banding: boolean;
  headers: boolean;
  skeletonWidth: string;
  items?: Array<{
    format: TextFormat;
    justification: JustificationText;
    name: string;
    title: string;
    onAction?: { onAction: (row: any) => void };
    component?: (row: any, children: ReactNode) => ReactNode;
  }>;
}

/**
 * Funcion para crear un datalist configurable.
 *
 * @param presentationDataList Presentacion del datalist.
 * @param data Datos a mostrar en el datalist.
 * @returns
 */
const DataListConfigurable = ({
  presentationDataList,
  data,
}: {
  presentationDataList: IPresentationDataList;
  data: any;
}) => {
  const [presentation, setPresentation] =
    useState<IPresentationDataList>(presentationDataList);

  const theme = useThemeContext();

  /**
   * Hook para inicializar la presentación del datalist
   */
  useEffect(() => {
    setPresentation(presentationDataList);
  }, [presentationDataList]);

  /**
   * Hook para calcular la presentación de los fields de texto
   */
  const presentationCalc = useCalculatePresentation(
    Direction.horizontal,
    BandPresentation.column_6,
    "60vw"
  );

  /**
   * Calcula el color de fondo de una fila en función de su índice.
   *
   * @param index El índice de la fila.
   * @returns El color de fondo de la fila.
   */
  const calculateBackground = (index: number): string => {
    if (presentationCalc.direction !== Direction.vertical) return "transparent";

    const isEven = index % 2 === 0;
    if (isEven) {
      return theme.appearance === "light" ? blackA.blackA3 : whiteA.whiteA3;
    }
    return "transparent";
  };

  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      <DataList.Root
        orientation={
          presentationCalc.direction === Direction.horizontal
            ? "horizontal"
            : "vertical"
        }
      >
        {presentation.items?.map((item: any, index: number) => (
          <DataList.Item
            align="start"
            key={item.name ?? index}
            style={{
              backgroundColor: calculateBackground(index),
            }}
          >
            <DataList.Label
              width="calc(150px * var(--scaling))"
              style={{ justifyContent: presentationCalc.justify }}
            >
              {item.title}
            </DataList.Label>
            <DataList.Value>
              <Flex
                width={"100%"}
                justify={justify(item.justification)}
                gap="2"
              >
                {item.component?.(item, null)}
                {(item.onAction && (
                  <Link
                    onClick={() => item.onAction?.onAction(item)}
                    style={{ cursor: "pointer" }}
                    truncate
                    underline="hover"
                    weight="medium"
                  >
                    {formatFromTextFormat(item.format, data[item.name])}
                  </Link>
                )) ||
                  formatFromTextFormat(item.format, data[item.name])}
              </Flex>
            </DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Flex>
  );
};

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
 * Muestra un esqueleto de la tabla paginada.
 *
 * @param columns Numero de columns.
 *
 * @returns
 */
const DataListSkeleton = ({ column }: { column: number }) => {
  return (
    <Flex direction="column" gap="3" maxWidth={{ md: "50vw", xl: "1400px" }}>
      <DataList.Root>
        {Array.from({ length: column }).map((_, index) => (
          <DataList.Item key={index + ""} align={"start"}>
            <DataList.Label minWidth="12vh">
              <Skeleton width="12vw">
                <Text>#</Text>
              </Skeleton>
            </DataList.Label>
            <DataList.Value>
              <Skeleton width={`${75 - index * 10}%`}>
                <Text>#</Text>
              </Skeleton>
            </DataList.Value>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Flex>
  );
};

export { DataListConfigurable, DataListSkeleton };
export type { IPresentationDataList };
