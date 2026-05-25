export function Banner({ title, subtitle, children }) {
  return (
    <div className="banner">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
}
