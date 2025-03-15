import {
  Alerts,
  CardGrid,
  CardGridSkeleton,
  GridDashboard,
  useToastContext,
} from "ux-ui";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { getStatic } from "orchestrator_remote/service/Statics";
import { IModuleRoot } from "./Header";
import { useEffect, useState } from "react";

import { Suspense } from "react";
import CatchErrorLoadElement from "../../utils/CatchErrorLoadElement";
import { useTranslation } from "react-i18next";
import * as Temp from "./Demo";

import { AppGestor } from "./Demo";

import { Button as MiB } from "@radix-ui/themes";

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
const Card = ({
  index,
  indexMenu,
  title,
  description,
  iconName,
}: {
  index: number;
  indexMenu: string;
  title: string;
  description: string;
  iconName: string;
}) => {
  const { showToast } = useToastContext();
  const [data, setData] = useState([]);

  const executeFindStatics = async (indexMenu: string) => {
    const dataStatic = await getStatic(indexMenu);

    if (dataStatic?.error) {
      showToast(
        dataStatic.error + " (" + dataStatic.status + ") ",
        dataStatic.statusDescription || "",
        Alerts.error
      );
      setData([]);
    } else {
      setData(dataStatic);
    }
  };

  useEffect(() => {
    executeFindStatics(indexMenu);
    if (!indexMenu) {
      console.error("useEffect -> indexMenu is empty");
    }
  }, [index]);

  return (
    <CardGrid
      key={index}
      title={title}
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

  const [flag, setFlag] = useState(false);
  const [contenidoName, setContenidoName] = useState("Button");

  const getCustomComponent = (name: string) => {
    const MiComponent = Temp[name as keyof typeof Temp];
    return MiComponent ? <MiComponent /> : <Temp.Button />;
  };

  const handleSwitch = () => {
    setFlag(!flag);
    setContenidoName(flag ? "Button" : "Footer");
  };

  return (
    <>
      <>
        {!loading && (
          <GridDashboard>
            {Array.isArray(dataModuleSelect.menus) &&
              dataModuleSelect.menus.map((item, index) => (
                <Card
                  index={index}
                  indexMenu={item.index}
                  title={item.name}
                  description={"pendiente"}
                  iconName={item.icon}
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
          {getCustomComponent(contenidoName)}
        </Suspense>
      </CatchErrorLoadElement>

      <MiB onClick={handleSwitch}>Button</MiB>

      <CatchErrorLoadElement titleName="gestor">
        <Suspense fallback={t("messages.loading")}>
          <AppGestor structure={{ element: "Error" }} />
        </Suspense>
      </CatchErrorLoadElement>
    </>
  );
};

export default Body;
