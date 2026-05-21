import { Link, useLocation } from "@tanstack/react-router";
import { Icon } from "./Icon";

const ITEMS = [
  { to: "/", label: "Início", icon: "home" },
  { to: "/agenda", label: "Agenda", icon: "calendar_today" },
  { to: "/historico", label: "Histórico", icon: "history" },
  { to: "/perfil", label: "Perfil", icon: "person" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-white/95 backdrop-blur-md flex justify-around items-center px-4 border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
      {ITEMS.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={
              "flex flex-col items-center justify-center rounded-xl px-4 py-1.5 active:scale-90 duration-150 tap-highlight-none " +
              (active ? "text-primary bg-primary-fixed/40" : "text-slate-400 hover:text-primary transition-colors")
            }
          >
            <Icon name={item.icon} fill={active} />
            <span className="font-headline-md text-[11px] font-bold uppercase tracking-widest mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}