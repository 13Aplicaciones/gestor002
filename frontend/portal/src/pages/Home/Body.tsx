import { CardGrid, CardGridSkeleton, GridDashboard } from "ux-ui";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { IModuleRoot } from "./Header";
import { useEffect, useState } from "react";

/**
 * Cuerpo de la pagina principal
 * 
 * @author omargo33
 * @since 2025-03-02
 * 
*/

/**
 * Funcion que renderiza el cuerpo de la pagina principal
 * 
 * @param refreshModule refresh module
 * @returns 
 */
const Body = ({ refreshModule }: { refreshModule: number }) => {
  const [dataModuleSelect, setDataModuleSelect] = useState<Record<string, IModuleRoot>>({});
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
      {!loading &&
        <GridDashboard >
          {Array.isArray(dataModuleSelect.menus) && dataModuleSelect.menus.map((item, index) => {
            return (
              <CardGrid
                key={index}
                title={item.name}
                description={item.index}
                iconName={item.icon}
                firtsColor={ index===0 }
                data={[]} />
            );
          })}
        </GridDashboard>
      }
      {
        loading &&
        <GridDashboard>
          {[...Array(4)].map((_, index) => (
            <CardGridSkeleton key={index} />
          ))}
        </GridDashboard>
      }
    </>
  );
}

export default Body;
