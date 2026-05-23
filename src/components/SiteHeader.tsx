import { Link, useLocation } from "@tanstack/react-router";
import { Icon } from "./Icon";
import jessicaAvatar from "@/assets/jessica-avatar.jpg";
import logo from "@/assets/logo-sangueamigo.png";

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
      <div className="flex justify-between items-center h-20 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center" aria-label="SangueAmigo - Início">
            <img src={logo} alt="SangueAmigo" className="h-[72px] w-auto" />
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
          <Link to="/perfil" className="rounded-full active:scale-95 transition-all ring-2 ring-transparent hover:ring-primary/40">
            <img
              src={jessicaAvatar}
              alt="Perfil de Jessica"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}