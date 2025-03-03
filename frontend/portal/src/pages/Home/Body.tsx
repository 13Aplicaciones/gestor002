import { Alerts, CardGrid, CardGridSkeleton, GridDashboard, useToastContext } from "ux-ui";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { getStatic } from "orchestrator_remote/service/Statics";
import { IModuleRoot } from "./Header";
import { useEffect, useState } from "react";

/**
 * Cuerpo de la pagina principal
 * 
 * @author omargo33
 * @since 2025-03-02
 * 
*/

const Card = (
  {key, indexMenu, title, description, iconName }:
  {key: number, indexMenu:string, title: string, description: string, iconName: string }
) => {
  const { showToast } = useToastContext();
  const [data, setData] = useState([]);

  const executeFindStatics = async (indexMenu: string) => {
    const dataStatic = await getStatic( indexMenu )

    setData(dataStatic);
    
    if (dataStatic?.error) {
      showToast(
        dataStatic.error,
        dataStatic.statusDescription,
        Alerts.error,
      );
      return [];
    }
    return dataStatic;
    
  }

  useEffect(() => { 
    executeFindStatics(indexMenu);
    if(key === 0){  
      console.log("key", key);
    }
  }, [key]);
  
  return (
    <CardGrid
      key={key}
      title={title}
      description={description}
      iconName={iconName}
      firtsColor={key === 0}
      data={data} />   
  );
}

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
          {Array.isArray(dataModuleSelect.menus) && dataModuleSelect.menus.map((item, index) => (
            <Card 
              key={index}
              indexMenu={item.index}
              title={item.name}
              description={"pendiente"}
              iconName={item.icon}
            />
          ))}
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
