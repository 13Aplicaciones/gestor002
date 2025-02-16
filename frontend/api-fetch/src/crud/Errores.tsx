import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { EstadoEdicion } from "../ConstantsPresentation";
import { useState } from "react";
import ButtonCreateRecordFloating from "../components/button/Button";
import ErrorEdit from "./ErroresEdit";
import Tabla from "./ErroresTabla";
import VistaPrevia, { IRowDataError } from "./ErroresVistaPrevia";

/**
 * CRUD de errores del sistema.
 * 
 * @author @omargo33
 * @since 2025-01-30
 * 
 */
const ErrorPage = () => {
    const [estado, setEstado] = useState(EstadoEdicion.create);
    const [rowSelecionado, setRowSelecionado] = useState<IRowDataError>({
        mensaje: '',
        descripcion: '',
        uuid: '',
        indice: '',
        usuario: '',
        usuarioFecha: '',
        usuarioPrograma: '',
    });

    const onEditarRow = (row: IRowDataError) => {
        setEstado(EstadoEdicion.edit);
        setRowSelecionado(row);
    }

    if (estado === EstadoEdicion.find) {
        return (
            <Flex direction="column" gap="3" p="3">
                <Heading>Listar Errores del sistema</Heading>
                <Text>En esta sección se muestran los errores del sistema y descriptiones que este sitema tiene.</Text>
                <Tabla onEditar={onEditarRow} />
                <VistaPrevia
                    indice="268"
                />
                <ButtonCreateRecordFloating
                    toolTip="Error"
                    onClick={() => {
                        setEstado(EstadoEdicion.create);
                        setRowSelecionado({
                            mensaje: '',
                            descripcion: '',
                            uuid: '',
                            indice: '',
                            usuario: '',
                            usuarioFecha: '',
                            usuarioPrograma: '',
                        });
                    }}
                />
            </Flex>
        )
    }
    else {
        return (
            <Flex direction="row" justify="between" p="3">
                <Flex direction="column" gap="3">
                    <Heading>Error del sistema</Heading>
                    <Text>En esta sección se muestran los errores del sistema y descriptiones que este sitema tiene.</Text>
                    <ErrorEdit estado={estado}
                        row={rowSelecionado}
                        onAtras={() => {
                            setEstado(EstadoEdicion.find)
                        }} />
                </Flex>
                <Flex gap="3">
                    <Button onClick={() => { setEstado(EstadoEdicion.find) }}>
                        <ChevronLeftIcon />Atras</Button>
                </Flex>
            </Flex>
        )
    }
}

export default ErrorPage;
