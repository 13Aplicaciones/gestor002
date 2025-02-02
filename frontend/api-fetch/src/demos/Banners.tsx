import { Flex } from "@radix-ui/themes"
import { BannerInformacion } from "../componentes/callout/Informar"
import { Alertas } from "../ConstantesPresentacion"

/**
 * Metodo que muestra los diferentes tipos de banners
 * 
 * @author @omargo33
 * @returns 
 */
const MiBaners = () => {
    return (
        <Flex direction="column" align="start" width="80vw" gap="3" >
            <BannerInformacion mensaje="hola" alerta={Alertas.success} />
            <BannerInformacion mensaje="hola" alerta={Alertas.error} />
            <BannerInformacion mensaje="hola" alerta={Alertas.info} />
            <BannerInformacion mensaje="hola" alerta={Alertas.warning} />
        </Flex>
    )
}

export { MiBaners }
