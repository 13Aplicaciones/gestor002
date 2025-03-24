import { CardGrid, CardGridSkeleton, GridDashboard } from "ux-ui";
import { Button as MiB } from "@radix-ui/themes";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { getStatic } from "orchestrator_remote/service/Statics";
import { IModuleRoot } from "./Header";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CatchErrorLoadElement from "../../utils/CatchErrorLoadElement";
import { WrapOrigin } from "gestor_remote/Wrap";

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
  const handleSwitch = () => {
    setFlag(!flag);
  };

  return (
    <>
      {
        <CatchErrorLoadElement titleName="gestor">
          <Suspense fallback={t("messages.loading")}>
            <WrapOrigin name={"GS-ER-001"} />
          </Suspense>
        </CatchErrorLoadElement>
      }
      <>
        {!loading && (
          <GridDashboard>
            {Array.isArray(dataModuleSelect.menus) &&
              dataModuleSelect.menus.map((item, index) => (
                <Card
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

      <MiB onClick={handleSwitch}>Button</MiB>
    </>
  );
};

export default Body;
