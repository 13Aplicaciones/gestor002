import { Flex, Heading, Box, Text, Separator } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/13_512x512.svg';

/**
 * Función que retorna el footer de la aplicación.
 * 
 * @returns 
 */
const Footer = () => {
    const [t] = useTranslation("global");

    return (
        <Flex style={{ background: "var(--white-a3)", borderTop: "1px solid var(--gray-a6)" }} direction="row" justify="between" p="4" align="center">
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

/**
 * Frame principal de la aplicación.
 * 
 * @param children 
 * @returns 
 */
const MainFrame = ({ children }: { children: ReactNode }) => {

    /**
     * Footer
     * 
     * @returns 
     */
    return (
        <Flex direction="column" >
            {children}
            <Footer />
        </Flex >
    );
}

/**
 * Frame de trabajo de la aplicación.
 * 
 * @param children 
 * @returns 
 */
const WorkFrame2 = ({ header, children }: { header?: ReactNode, children: ReactNode }) => {
    return (
        <Flex direction="column" >
            {header}
            <Flex direction="column" pl="2" pr="4" pb="3" style={{ minHeight: '85vh' }}>
                {children}
            </Flex>
            <Footer />
        </Flex>
    );
}

export { MainFrame, WorkFrame2 };
