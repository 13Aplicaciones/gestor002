import { IModuleRoot } from "./Header";
import { useTranslation } from "react-i18next";
import { WrapOrigin } from "gestor_remote/Wrap";
import { Suspense, useEffect, useState } from "react";
import { getStatic } from "orchestrator_remote/service/Statics";
import { CardGrid, CardGridSkeleton, GridDashboard } from "ux-ui";
import CatchErrorLoadElement from "../../utils/CatchErrorLoadElement";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { Box, Card, Flex, Heading, Inset, Strong, Text } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";

import { jade } from "@radix-ui/colors";

/**
 * Cuerpo de la pagina principal
 *
 * @author omargo33
 * @since 2025-03-02
 *
 */

/**
 * Funcion que renderiza una tarjeta
 *
 * @param index index of the card
 * @param indexMenu index of the menu
 * @param title title of the card
 * @param description description of the card
 * @param iconName icon name of the card
 * @returns
 */
const Card001 = ({
  index,
  indexMenu,
  title,
  description,
  iconName = "TransparencyGridIcon",
}: {
  index: number;
  indexMenu: string;
  title: string;
  description: string;
  iconName?: string;
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const executeFindStatics = async (indexMenu: string) => {
      const dataStatic = await getStatic(indexMenu);
      if (dataStatic?.error) {
        console.error(dataStatic.error + " (" + dataStatic.status + ") ");
        console.error(dataStatic.statusDescription || "");

        setData([]);
      } else {
        setData(dataStatic);
      }
    };

    executeFindStatics(indexMenu);

    if (!indexMenu) {
      console.error("useEffect -> indexMenu is empty");
    }
  }, [index, indexMenu]);

  return (
    <CardGrid
      key={index}
      title={title + " hola " + index}
      description={description}
      iconName={iconName}
      firtsColor={index === 0}
      data={data}
    />
  );
};

/**
 * Funcion que renderiza el cuerpo de la pagina principal y carga los modulos
 *
 * @param refreshModule refresh module
 * @returns
 */
const Body = ({ refreshModule }: { refreshModule: number }) => {
  const [dataModuleSelect, setDataModuleSelect] = useState<
    Record<string, IModuleRoot>
  >({});
  const [loading, setLoading] = useState(true);
  const [t] = useTranslation("global");

  const fetchData = async () => {
    const moduleSelect = await getSelectModule();
    if (moduleSelect) {
      setDataModuleSelect(moduleSelect);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchData();
    }, 666);
    return () => clearTimeout(timer);
  }, [refreshModule]);

  return (
    <>
      <Banner />
      <>
        {!loading && (
          <GridDashboard>
            {Array.isArray(dataModuleSelect.menus) &&
              dataModuleSelect.menus.map((item, index) => (
                <Card001
                  key={item.indexMenu} // Asignar una clave única basada en item.indexMenu
                  index={index}
                  indexMenu={item.indexMenu}
                  title={item.name}
                  description={index === 0 ? "description" : "description"}
                  iconName={/*item.icon*/ "TransparencyGridIcon"}
                />
              ))}
          </GridDashboard>
        )}
        {loading && (
          <GridDashboard>
            {[...Array(4)].map((_, index) => (
              <CardGridSkeleton key={index} />
            ))}
          </GridDashboard>
        )}
      </>

      <CatchErrorLoadElement titleName="Button">
        <Suspense fallback={t("messages.loading")}>
          {/*getCustomComponent(contenidoName)?*/}
        </Suspense>
      </CatchErrorLoadElement>
      {
        <CatchErrorLoadElement titleName="gestor">
          <Suspense fallback={t("messages.loading")}>



            <WrapOrigin name={"GS-ER-001"} />


          </Suspense>
        </CatchErrorLoadElement>
      }


    </>
  );
};



const Banner = () => {
  return (
    <Box maxWidth="100%">
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">

          <Flex
            height="230px"
            position="relative"
            style={{
              background: "linear-gradient(270deg, hsla(164, 64%, 62%, 1) 0%, hsla(164, 64%, 42%, 1) 50%, hsla(164, 64%, 22%, 1) 100%)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          </Flex>

        </Inset>
        <Text as="p" size="3">
          <Strong>Typography</Strong> is the art and technique of arranging type to
          make written language legible, readable and appealing when displayed.
        </Text>

        <Box
          position="absolute"
          top="-150px"
          right="-100px"
          style={{
            opacity: 0.43,
            fontSize: "100px",
            lineHeight: "1",
          }}
        >
          <Text as="span" >
            <GearIcon width="390" height="390" />
          </Text>
        </Box>



        <Box
          position="absolute"
          top="75px"
        >
          <Flex direction="column" align="start" justify="center">
            <Heading size="9" >
              GESTOR de APLicativos
            </Heading>
            <Heading size="7" weight="bold" >
              Los gestores de datos
            </Heading>
          </Flex>
        </Box>



      </Card>
    </Box>

  );
};


export default Body;
