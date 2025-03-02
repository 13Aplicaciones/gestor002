import { CardGrid, CardGridSkeleton, GridDashboard } from "ux-ui";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { IModuleRoot } from "./Header";
import { useEffect, useState } from "react";

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
                title={item.index}
                description={item.name}
                iconName={item.icon}
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
