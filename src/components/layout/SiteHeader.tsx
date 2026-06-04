import { Header } from "./Header";
import { TopBar } from "./TopBar";
import "./site-header.css";

export function SiteHeader() {
  return (
    <div className="site-head">
      <TopBar />
      <Header />
    </div>
  );
}
