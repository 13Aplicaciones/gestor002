/**
 * Modulo principal de modulos de gestor
 */
declare module "gestor_remote/Wrap" {
  const MenuWrap: React.ComponentType<{ name: string }>;
  const TitleWrap: React.ComponentType;
  const SubTitleWrap: React.ComponentType<{ nameMenu?: string }>;
  export { MenuWrap, TitleWrap, SubTitleWrap };
}

/**
 * Modulo de traducciones de gestor
 */
declare module "gestor_remote/Translation" {
  export function getTranslationWithLangAndNS(lang: string,ns: string): string;
  export function getTranslation(lang: string): string;
}
