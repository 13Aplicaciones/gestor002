/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alertas, FormatoTexto, OrdenarColumna } from '../../ConstantesPresentacion';
import { blackA } from "@radix-ui/colors";
import { CaretDownIcon, CaretSortIcon, CaretUpIcon } from '@radix-ui/react-icons';
import { DropdownMenu, Flex, IconButton, Link, Skeleton, Table, Text } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { BannerInformacion } from '../callout/Informar';

/**
 * Componente de tabla paginada.
 * 
 * @author @omargo33
 * @since 2025-01-20
*
*/

/*
 * Tabla configurable con presentacion de columnas y datos.
 * 
 * @param presentacion Json para la presentacion de la tabla.
 * @param data Json con los datos a mostrar en la tabla.
 * @param isEncabezado si se muestra el encabezado de la tabla.
 * @param isNumeroLinea si se muestra el numero de linea (Agrea un 5vw) para esta columna.
 * @param isBanda si se muestra la banda de colores en las filas.
 * 
 * @returns 
 */
const TableConfigurable = ({ presentacion, data, isEncabezado, isNumeroLinea, isBanda }:
    { presentacion: any, data: any, isEncabezado?: boolean, isNumeroLinea?: boolean, isBanda?: boolean }) => {

    const encabezado = Array.isArray(presentacion) ? presentacion.map((campo: any) => campo.titulo) : [];
    const [t] = useTranslation("global");

    /**
     * Funcion para justificar el contenido de la celda en base a la presentacion.
     * 
     * @param index 
     * @returns 
     */
    const justificar = (index: number): "center" | "start" | "end" => {
        try {
            return presentacion[index].justificacion;
        } catch {
            return "start";
        }
    };

    /**
     * Funcion para formatear el contenido de la celda en base a la presentacion.
     * 
     * @param row Fila de la tabla. 
     * @param valor Valor de la celda.
     * @param index Indice de la celda.
     * 
     * @returns 
     */
    const formatear = (row: any, valor: any, index: number): string => {
        const respuesta = row[valor];
        try {
            const formatoTexto = presentacion[index].formato;
            switch (formatoTexto) {
                case FormatoTexto.none:
                    return respuesta || "- - - -";
                case FormatoTexto.decimal2:
                    return respuesta.toFixed(2);
                case FormatoTexto.date:
                    return new Date(respuesta).toLocaleDateString();
                //TODO: Agregar mas formatos de texto.                    
                default:
                    return respuesta;
            }
        } catch {
            return respuesta;
        }
        return respuesta;
    }

    /**
     * Funcion para mostrar el orden de la columna.
     * 
     * @param texto Texto a mostrar.
     * @param index Indice de la columna.
     * 
     * @returns 
     */
    const iconOrden = (texto: string, index: number) => {
        const nombre = presentacion[index].nombre;

        return (
            (presentacion[index].orden === undefined || !presentacion[index].orden)
                ? <Text size="2" weight="bold">
                    {texto}
                </Text>
                :
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton
                            size="1"
                            variant="ghost"
                            style={{ cursor: 'pointer' }}>
                            {presentacion[index].orden === OrdenarColumna.ascendente &&
                                <CaretUpIcon />
                            }
                            {presentacion[index].orden === OrdenarColumna.descendente &&
                                <CaretDownIcon />
                            }
                            {presentacion[index].orden === OrdenarColumna.neutro &&
                                <CaretSortIcon />
                            }
                            <Text size="2" weight="bold">
                                {texto}
                            </Text>
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item
                            onClick={() => {
                                presentacion[index].accionOrden({
                                    index: index,
                                    nombre: nombre,
                                    orden: OrdenarColumna.ascendente
                                });
                            }}>
                            <CaretUpIcon />{t('tabla.ordenAsc')}
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            onClick={() => {
                                presentacion[index].accionOrden({
                                    index: index,
                                    nombre: nombre,
                                    orden: OrdenarColumna.descendente
                                });
                            }}>
                            <CaretDownIcon />{t('tabla.ordenDesc')}</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            onClick={() => {
                                presentacion[index].accionOrden({
                                    index: index,
                                    nombre: nombre,
                                    orden: OrdenarColumna.neutro
                                });
                            }}>
                            <CaretSortIcon />{t('tabla.sinOrdenar')}</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
        );
    };

    /**
     * Funcion para generar el encabezado de la tabla.
     * 
     * @returns 
     */
    const encabezadoTabla = () => {
        return (
            isEncabezado === false ? <></> :
                <Table.Header >
                    <Table.Row>
                        {(isNumeroLinea) && (
                            <Table.ColumnHeaderCell justify='center'>
                                #
                            </Table.ColumnHeaderCell>
                        )}
                        {encabezado.map((col: any, index: number) => (
                            <Table.ColumnHeaderCell
                                key={index}
                                width={presentacion[index].width}
                                justify={justificar(index)}
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
     * @param campo Campo de la tabla.
     * @param cellIndex Indice de la celda.
     * 
     * @returns 
     */
    const crearCell = (row: any, campo: any, cellIndex: number) => {
        return (
            <Table.Cell
                key={cellIndex}
                width={presentacion[cellIndex].width}
                maxWidth={presentacion[cellIndex].width}
                justify={justificar(cellIndex)}>
                <Flex
                    gap="2"
                    justify={justificar(cellIndex)}>
                    {presentacion[cellIndex].componente?.(row)}
                    {
                        (presentacion[cellIndex].accion) && (
                            <Link onClick={() => presentacion[cellIndex].accion(row)} style={{ cursor: "pointer" }}>
                                <Text weight="regular" truncate>{formatear(row, campo.nombre, cellIndex)}</Text>
                            </Link>
                        ) || (
                            <Text truncate>{formatear(row, campo.nombre, cellIndex)}</Text>
                        )
                    }
                </Flex>
            </Table.Cell>
        );
    }

    return (
        <>
            {(!data || data.length === 0) ? (
                <BannerInformacion mensaje={t('tabla.noDataSearch')} alerta={Alertas.info} />
            ) : (
                <Table.Root size="1" variant='surface' layout="auto">
                    {encabezadoTabla()}
                    <Table.Body>
                        {data.map((row: any, rowIndex: number) => (
                            <Table.Row
                                key={rowIndex}
                                style={{ backgroundColor: (isBanda && rowIndex % 2 !== 0) ? blackA.blackA2 : "none" }}>
                                {(isNumeroLinea) && (
                                    <Table.Cell justify='end' align='center' width="5vw">
                                        {rowIndex + 1}
                                    </Table.Cell>
                                )}
                                {presentacion.map((campo: any, cellIndex: number) => (
                                    crearCell(row, campo, cellIndex)
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
 * @param columnas Numero de columnas.
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
