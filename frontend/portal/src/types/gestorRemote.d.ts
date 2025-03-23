declare module "gestor_remote/Wrap" {
  const WrapOrigin: React.ComponentType<{ name: string }>; // Corregido para que acepte el parámetro { name: string }
  export { WrapOrigin };
}
/*
declare module "gestor_remote/Origin" {
  const Title: React.ComponentType; // Corregido para que sea un componente React válido
  const SubTitle: React.ComponentType<{ nameMenu?: string }>; // Corregido para que acepte los parámetros { nameMenu }
  const Origin: React.ComponentType<{ name: string }>;

  export { Title, SubTitle, Origin };
}
*/
declare module "gestor_remote/Translation" {
  export function getTranslationWithLangAndNS(
    lang: string,
    ns: string
  ): Promise<string>;
  export function getTranslation(lang: string): Promise<string>;
}
