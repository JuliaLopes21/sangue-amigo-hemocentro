import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo-sangueamigo.png";
import heroImage from "@/assets/login-hero-pro.jpg";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — SangueAmigo" },
      { name: "description", content: "Acesse sua conta SangueAmigo para gerenciar suas doações." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === "jessica.silva@email.com" && password === "jessica123") {
      setError(null);
      navigate({ to: "/" });
    } else {
      setError("E-mail ou senha incorretos. Use jessica.silva@email.com / jessica123");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex items-center justify-center p-3 sm:p-6" style={{ fontFamily: "Manrope, sans-serif" }}>
      <div className="relative w-full max-w-[1200px] aspect-auto lg:aspect-[16/9] min-h-[640px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        {/* Background hero image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        {/* Soft gradient over image to lighten the left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:via-white/60" aria-hidden="true" />

        {/* Red wave bottom-right */}
        <svg
          className="absolute bottom-0 right-0 w-full h-[42%] pointer-events-none"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d10915" />
              <stop offset="100%" stopColor="#8a0008" />
            </linearGradient>
          </defs>
          <path
            d="M0,260 C220,140 460,360 720,260 C900,190 1050,240 1200,180 L1200,400 L0,400 Z"
            fill="url(#waveGrad)"
          />
        </svg>

        {/* Top centered logo */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <Link to="/" aria-label="SangueAmigo - Início" className="inline-flex">
            <img src={logo} alt="SangueAmigo" className="h-16 md:h-20 w-auto drop-shadow-sm" />
          </Link>
        </div>

        {/* Decorative dots bottom-left */}
        <div className="absolute bottom-6 left-6 z-10 grid grid-cols-8 gap-1.5 opacity-40" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-[#bc000a]" />
          ))}
        </div>

        {/* Tagline bottom-right over wave */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-4 text-white">
          <svg className="w-14 h-14 opacity-90" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M32 54s-18-11-18-26a10 10 0 0118-6 10 10 0 0118 6c0 15-18 26-18 26z" />
          </svg>
          <p className="text-sm md:text-base leading-tight font-light">
            Cada gota<br />de solidariedade<br />
            <span className="font-bold">faz a vida continuar.</span>
          </p>
        </div>

        {/* Login card */}
        <div className="relative z-20 flex items-center min-h-[640px] lg:min-h-0 lg:h-full px-6 md:px-14 lg:px-20 pt-32 pb-40 lg:py-0">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10">
            <h1
              className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              FAÇA SEU LOGIN
            </h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-bold text-slate-800">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full h-11 px-4 bg-white border border-slate-300 rounded-full text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bc000a]/20 focus:border-[#bc000a] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-sm font-bold text-slate-800">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full h-11 pl-4 pr-12 bg-white border border-slate-300 rounded-full text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bc000a]/20 focus:border-[#bc000a] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-xs text-[#bc000a] font-medium">
                  {error}
                </div>
              )}

              <div className="text-center text-xs text-slate-500 pt-1">
                Faça seu cadastro{" "}
                <Link to="/cadastro" className="font-bold text-slate-800 hover:text-[#bc000a]">
                  Cadastrar
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-b from-[#e21420] to-[#bc000a] text-white font-extrabold tracking-wide text-base shadow-lg shadow-[#bc000a]/30 hover:from-[#bc000a] hover:to-[#7a0007] active:scale-[0.98] transition-all"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                LOGIN
              </button>

              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-[11px] text-slate-500 text-center">
                <span className="font-bold text-slate-700">Teste:</span> jessica.silva@email.com / jessica123
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
