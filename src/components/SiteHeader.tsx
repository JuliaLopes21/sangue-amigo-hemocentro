import { Link, useLocation } from "@tanstack/react-router";
import { Icon } from "./Icon";

const NAV = [
  { to: "/", label: "Início" },
  { to: "/agenda", label: "Agenda" },
  { to: "/historico", label: "Histórico" },
  { to: "/campanhas", label: "Campanhas" },
  { to: "/hemocentros", label: "Hemocentros" },
  { to: "/pontos", label: "Pontos" },
] as const;

export function SiteHeader() {
  const { pathname } = useLocation();
  return (
    <header className="bg-white border-b border-slate-100 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center h-16 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tighter font-headline-md">
            SangueAmigo
          </Link>
          <nav className="hidden md:flex gap-6 font-headline-md font-medium text-sm tracking-wide">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    active
                      ? "text-primary border-b-2 border-primary pb-1 font-bold"
                      : "text-slate-500 hover:text-primary transition-colors"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-slate-50 rounded-lg active:scale-95 transition-all">
            <Icon name="notifications" className="text-slate-600" />
          </button>
          <Link to="/perfil" className="p-2 hover:bg-slate-50 rounded-lg active:scale-95 transition-all">
            <Icon name="account_circle" className="text-slate-600" />
          </Link>
        </div>
      </div>
    </header>
  );
}