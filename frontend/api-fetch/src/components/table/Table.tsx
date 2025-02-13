/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alerts, TextFormat, OrdenarColumna } from '../../ConstantsPresentation';
import { blackA } from "@radix-ui/colors";
import { CaretDownIcon, CaretSortIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { DropdownMenu, Flex, IconButton, Link, Skeleton, Table, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BannerInformation } from '../callout/Information';

/**
 * Componente de tabla paginada.
 * 
 * @author @omargo33
 * @since 2025-01-20
*
*/

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
const TableConfigurable = ({ presentation, data, isHeader, isLineNumber, isBand }:
    { presentation: any, data: any, isHeader?: boolean, isLineNumber?: boolean, isBand?: boolean }) => {

    const header = Array.isArray(presentation) ? presentation.map((field: any) => field.title) : [];
    const [t] = useTranslation("global");

    /**
     * Funcion para justify el contenido de la celda en base a la presentation.
     * 
     * @param index 
     * @returns 
     */
    const justify = (index: number): "center" | "start" | "end" => {
        try {
            return presentation[index].justification;
        } catch {
            return "start";
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
    const format = (row: any, valor: any, index: number): string => {
        const response = row[valor];
        try {
            const format = presentation[index].format;
            switch (format) {
                case TextFormat.none:
                    return response || "- - - -";
                case TextFormat.decimal2:
                    return response.toFixed(2);
                case TextFormat.date:
                    return new Date(response).toLocaleDateString();
                //TODO: Agregar mas formats de text.                    
                default:
                    return response;
            }
        } catch {
            return response;
        }
        return response;
    }

    /**
     * Funcion para mostrar el order de la columna.
     * 
     * @param text Text a mostrar.
     * @param index Indice de la columna.
     * 
     * @returns 
     */
    const iconOrden = (text: string, index: number) => {
        const name = presentation[index].name;

        return (
            (presentation[index].order === undefined || !presentation[index].order)
                ? <Text size="2" weight="bold">
                    {text}
                </Text>
                :
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton
                            size="1"
                            variant="ghost"
                            style={{ cursor: 'pointer' }}>
                            {presentation[index].order === OrdenarColumna.ascendente &&
                                <CaretUpIcon />
                            }
                            {presentation[index].order === OrdenarColumna.descendente &&
                                <CaretDownIcon />
                            }
                            {presentation[index].order === OrdenarColumna.neutro &&
                                <CaretSortIcon />
                            }
                            <Text size="2" weight="bold">
                                {text}
                            </Text>
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item
                            onClick={() => {
                                presentation[index].actionOrder({
                                    index: index,
                                    name: name,
                                    order: OrdenarColumna.ascendente
                                });
                            }}>
                            <CaretUpIcon />{t('tabla.orderAsc')}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            onClick={() => {
                                presentation[index].actionOrder({
                                    index: index,
                                    name: name,
                                    order: OrdenarColumna.descendente
                                });
                            }}>
                            <CaretDownIcon />{t('tabla.orderDesc')}</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            onClick={() => {
                                presentation[index].actionOrder({
                                    index: index,
                                    name: name,
                                    order: OrdenarColumna.neutro
                                });
                            }}>
                            <CaretSortIcon />{t('tabla.unordered')}</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
        );
    };

    /**
     * Funcion para generar el header de la tabla.
     * 
     * @returns 
     */
    const headerTable = () => {
        return (
            isHeader === false ? <></> :
                <Table.Header >
                    <Table.Row>
                        {(isLineNumber) && (
                            <Table.ColumnHeaderCell justify='center'>
                                #
                            </Table.ColumnHeaderCell>
                        )}
                        {header.map((col: any, index: number) => (
                            <Table.ColumnHeaderCell
                                key={index}
                                width={presentation[index].width}
                                justify={justify(index)}
                                align='center'>
                                {iconOrden(col, index)}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
        );
    }

    /**
     * Funcion para crear una celda de la tabla.
     * 
     * @param row Filas de la tabla.
     * @param field Campo de la tabla.
     * @param cellIndex Indice de la celda.
     * 
     * @returns 
     */
    const createCell = (row: any, field: any, cellIndex: number) => {
        return (
            <Table.Cell
                key={cellIndex}
                width={presentation[cellIndex].width}
                maxWidth={presentation[cellIndex].width}
                justify={justify(cellIndex)}>
                <Flex
                    gap="2"
                    justify={justify(cellIndex)}>
                    {presentation[cellIndex].componente?.(row)}
                    {
                        (presentation[cellIndex].accion) && (
                            <Link truncate onClick={() => presentation[cellIndex].accion(row)} style={{ cursor: "pointer" }}>
                                <Text weight="regular" >{format(row, field.name, cellIndex)}</Text>
                            </Link>
                        ) || (
                            <Text truncate>{format(row, field.name, cellIndex)}</Text>
                        )
                    }
                </Flex>
            </Table.Cell>
        );
    }

    return (
        <>
            {(!data || data.length === 0) ? (
                <BannerInformation message={t('tabla.noDataSearch')} alert={Alerts.info} />
            ) : (
                <Table.Root size="1" variant='surface' layout="auto">
                    {headerTable()}
                    <Table.Body>
                        {data.map((row: any, rowIndex: number) => (
                            <Table.Row
                                key={rowIndex}
                                style={{ backgroundColor: (isBand && rowIndex % 2 !== 0) ? blackA.blackA2 : "none" }}>
                                {(isLineNumber) && (
                                    <Table.Cell justify='end' align='center' width="5vw">
                                        {rowIndex + 1}
                                    </Table.Cell>
                                )}
                                {presentation.map((field: any, cellIndex: number) => (
                                    createCell(row, field, cellIndex)
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </>
    );
}

/**
 * Muestra un esqueleto de la tabla paginada.
 * 
 * @param columns Numero de columns.
 *  
 * @returns 
 */
const TableSkeleton = ({ column }: { column: number }) => {
    return (
        <Flex gap="4" p="2" direction="column" >
            {Array.from({ length: column }).map((_, index) => (
                <Flex key={index} gap="4" align="center" direction="row">
                    <Skeleton width="10vw">
                        <Text>#</Text>
                    </Skeleton>
                    <Skeleton key={index} width={index % 2 !== 0 ? "40%" : Math.abs(70 - (index * 10)) + "%"}>
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
}

export { TableConfigurable, TableSkeleton };
