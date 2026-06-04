import "./logo.css";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <img
      src="/images/logo.png"
      alt="Nogal — Fabricamos tus ideas"
      className={`logo ${className}`.trim()}
      decoding="async"
    />
  );
}
