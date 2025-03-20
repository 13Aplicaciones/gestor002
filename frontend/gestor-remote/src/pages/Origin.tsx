/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Heading, Text } from "@radix-ui/themes";
import { getIconComponent } from "ux-ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {Page as PageError} from "./Error/Page";
import Information from "./Information";
import Module from "./Module";
import User from "./User";

type OriginProps = {
  id?: number | 0;
  name?: string;
  description?: string;
  element?: string | "Base";
  refreshToken?: number | 0;
  [key: string]: any;
};

/**
 * Funcion para mostrar el titulo de la aplicacion.
 * 
 * @returns 
 */
const Title = () => {
  const [t] = useTranslation("global_gestor");

  return (
      <>
        <Flex direction="row" gap="2" align="center">
          {getIconComponent(t("GearIcon"), "36", "36")}
          <Flex direction="column">
            <Heading>{t("title")}</Heading>
            <Text>{t("description")}</Text>
          </Flex>
        </Flex>
      </>
    );
  };

/**
 * Funcion para mostrar el subtitulo de la aplicacion.
 * 
 * @param param0 
 * @returns 
 */
const SubTitle = ({ element }: { element?: string }) => {
  const [t] = useTranslation("global_gestor");
  const icon = t("modules." + element + ".icon");
  const ifFound:boolean = !(icon === "modules."+element + ".icon");

  return (
    <>
      {ifFound && (
        <Flex direction="row" gap="2" align="center">
          {getIconComponent(icon, "36", "36")}
          <Flex direction="column">
            <Heading>{t("modules."+element+".title")}</Heading>
            <Text>{t("modules."+element+".description")}</Text>
          </Flex>
        </Flex>
      )}
    </>
  );
}


const Origin = ({ structure }: { structure?: OriginProps }) => {
  const flow = (structure: any) => {
    switch (structure?.element) {
      case "error":
        return <PageError structure={structure} />;
      case "information":
        return <Information structure={structure} />;
      case "module":
        return <Module structure={structure} />;
      case "user":
        return <User structure={structure} />;
    }
  };

  useEffect(() => {}, [structure?.refreshToken]);

  return (
    <>
      <Title />
      <SubTitle element={structure?.element} />
      {flow(structure)}
    </>
  );
};

export { Origin, Title, SubTitle };
export type { OriginProps };
