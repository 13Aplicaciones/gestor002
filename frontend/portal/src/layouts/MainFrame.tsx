import { ScrollArea, Flex, Heading, Box, Text, Separator } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/13_512x512.svg';



const MainFrame = ({ children }: { children: ReactNode }) => {
    const [t] = useTranslation("global");

    /**
     * Footer
     * 
     * @returns 
     */
    const footer = () => {
        return (

            <Flex style={{ background: "var(--white-a3)", }} direction="row" justify="between" p="4" align="center">
                <Flex direction="column">
                    <Text size="1">
                        {t('frame.footer.copyright', { year: new Date().getFullYear() })}
                    </Text>
                    <Text size="1">
                        {t('frame.footer.all_rights_reserved')}
                    </Text>
                    <Separator orientation="horizontal" size="4" />
                    <Heading mb="1" size="3">
                        {t('frame.footer.title')}
                    </Heading>
                </Flex>
                <Box>
                    <img src={logo} alt="Logo" width="85vh" />
                </Box>
            </Flex>
        );
    }

    return (
        <Flex direction="column" style={{ background: "var(--gray-a1)" }}>


            <Flex direction="row">

                    <Box style={{ background: "var(--green-a10)" }} width="10%" height="94vh" p="1">
                        <Heading mb="2" size="3">
                            Tabla con api
                        </Heading>
                        <Text>
                            The goal of typography is to relate font size, line height, and line width
                            in a proportional way that maximizes beauty and makes reading easier and
                            more pleasant.
                        </Text>
                    </Box>

                <Flex direction="column" gap="4" width="90%" height="94vh">
                    <ScrollArea type="always" scrollbars="vertical" style={{ background: "white" ,  height: 700 }}>
                        {children}
                    </ScrollArea>
                </Flex>

            </Flex>
            {footer()}
        </Flex >
    );
}

export default MainFrame;