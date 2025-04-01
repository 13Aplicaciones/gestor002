import { Suspense } from "react";
import { MenuWrap } from "gestor_remote/Wrap";
import CatchErrorLoadElement from "../utils/CatchErrorLoadElement";
import { useTranslation } from "react-i18next";

/*
    {getTranslation("title")}
    {getTranslation("description")}
*/
const Page = () => {
    const [t]= useTranslation("global");
    return (
        <CatchErrorLoadElement titleName="gestor">
            <Suspense fallback={t("messages.loading")}>
                <MenuWrap name={"GS-ER-001"} />
            </Suspense>
        </CatchErrorLoadElement>
    );
}
export default Page;