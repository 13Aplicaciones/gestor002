import { getStatic } from "orchestrator_remote/service/Statics";
import { useEffect, useState } from "react";
import { CardGrid } from "ux-ui";

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
const CardPanel = ({
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

  export default CardPanel;
  