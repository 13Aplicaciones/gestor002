import { CardGridSkeleton, GridDashboard } from "ux-ui";
import { getSelectModule } from "orchestrator_remote/service/Structure";
import { getTranslation } from "gestor_remote/Translation";
import { IModuleRoot } from "./Header";
import { MenuWrap, SubTitleWrap, TitleWrap } from "gestor_remote/Wrap";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CatchErrorLoadElement from "../../utils/CatchErrorLoadElement";
import Banner from "../../components/Banner";
import CardPanel from "../../components/Card";

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
      <Banner title="title01" subTitle="subTitle01" description="description01" iconName="RocketIcon" />
      <>
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
      </>

      <CatchErrorLoadElement titleName="gestor">
        <Suspense fallback={t("messages.loading")}>
          <MenuWrap name={"GS-ER-001"} />
        </Suspense>
      </CatchErrorLoadElement>

      <CatchErrorLoadElement titleName="gestor">
        <Suspense fallback={t("messages.loading")}>
          <TitleWrap />
          <SubTitleWrap nameMenu={"GS-ER-001"} />
          {getTranslation("title")}
          {getTranslation("description")}
        </Suspense>
      </CatchErrorLoadElement>
    </>
  );
};



export default Body;
