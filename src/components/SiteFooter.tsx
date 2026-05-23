import logo from "@/assets/logo-sangueamigo.png";

export function SiteFooter() {
  return (
    <footer className="bg-white border-t border-slate-100 py-lg mt-xl">
      <div className="max-w-7xl mx-auto px-md flex flex-col md:flex-row justify-between items-center gap-md">
        <img src={logo} alt="SangueAmigo" className="h-[72px] w-auto" />
        <p className="text-on-surface-variant text-sm">© 2026 SangueAmigo — Salve vidas, doe sangue.</p>
        <nav className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
          <a href="#" className="hover:text-primary transition-colors">Termos</a>
          <a href="#" className="hover:text-primary transition-colors">Ajuda</a>
        </nav>
      </div>
    </footer>
  );
}