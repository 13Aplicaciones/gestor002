import { CardGridSkeleton, GridDashboard } from "ux-ui";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { IModuleRoot } from "./Header";
import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import CardPanel from "../../components/Card";
import Page from "../../routes/Page";
import { getBannerInfo } from "../../routes/Structure";

/**
 * Cuerpo de la pagina principal
 *
 * @author omargo33
 * @since 2025-03-02
 *
 */

/**
 * Funcion que renderiza el cuerpo de la pagina principal y carga los modulos
 *
 * @param refreshModule refresh module
 * @returns
 */
const Body = ({ refreshModule }: { refreshModule: number }) => {
  const [dataModuleSelect, setDataModuleSelect] =
    useState<Record<string, IModuleRoot>>({});
  const [loading, setLoading] = useState(true);
  
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
      <Banner banner={getBannerInfo(dataModuleSelect)} />    
        {!loading && (
          <GridDashboard>
            {Array.isArray(dataModuleSelect.menus) &&
              dataModuleSelect.menus.map((item, index) => (
                <CardPanel
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
      <Page />
    </>
  );
};



export default Body;
