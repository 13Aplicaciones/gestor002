import { Flex } from "@radix-ui/themes"
import { BannerInformation } from "../componentes/callout/Information"
import { Alerts } from "../ConstantesPresentacion"

/**
 * Metodo que muestra los diferentes tipos de banners
 * 
 * @author @omargo33
 * @returns 
 */
const MiBaners = () => {
    return (
        <Flex direction="column" align="start" width="80vw" gap="3" >
            <BannerInformation message="hola" alert={Alerts.success} />
            <BannerInformation message="hola" alert={Alerts.error} />
            <BannerInformation message="hola" alert={Alerts.info} />
            <BannerInformation message="hola" alert={Alerts.warning} />
        </Flex>
    )
}

export { MiBaners }
