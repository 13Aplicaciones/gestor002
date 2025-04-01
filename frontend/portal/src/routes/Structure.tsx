/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTranslation as getTranslationGestor } from "gestor_remote/Translation";


export interface IBannerRoot {
    title: string;
    subTitle: string;
    description: string;
    iconName: string;
}

export const getBannerInfo = (banner: any): IBannerRoot => {
    switch (banner.indexModule) {
        case "GS_001_00":
            return {
                title: getTranslationGestor("title"),
                subTitle: getTranslationGestor("subTitle"),
                description: getTranslationGestor("description"),
                iconName: getTranslationGestor("icon"),
            } as IBannerRoot;
        case "MV_001_00":
            return {
                title: "title",
                subTitle: "subTitle",
                description: "description",
                iconName: "icon",
            } as IBannerRoot;
        default:
            return {
                title: "title",
                subTitle: "subTitle",
                description: "description",
                iconName: "icon",
            } as IBannerRoot;
    }
}

export interface IModuleRoot {
    title: string;
}

export const getMneus = (): IModuleRoot => {
    return {
        title: "title"
    };
}
