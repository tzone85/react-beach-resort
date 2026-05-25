export function Hero({ hero = "defaultHero", children }) {
  return <header className={hero}>{children}</header>;
}
