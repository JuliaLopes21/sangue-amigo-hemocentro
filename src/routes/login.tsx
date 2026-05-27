import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/logo-sangueamigo.png";
import heroImage from "@/assets/login-hero-pro.jpg";
import { useState } from "react";

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
    <div
      className="min-h-screen w-full bg-slate-50 flex flex-col lg:flex-row"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      {/* LEFT — Form */}
      <div className="w-full lg:w-[38%] xl:w-[35%] bg-white flex flex-col px-6 sm:px-10 md:px-14 py-10 lg:py-12 min-h-screen">
        <Link to="/" aria-label="SangueAmigo - Início" className="inline-flex shrink-0">
          <img src={logo} alt="SangueAmigo" className="h-12 w-auto" />
        </Link>

        <div className="flex-1 flex flex-col justify-center w-full max-w-[440px] mx-auto py-10">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Faça seu login
          </h1>
          <p className="text-slate-500 text-sm md:text-base mb-8">
            Bem-vindo de volta! Acesse sua conta para gerenciar suas doações.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C40018]/20 focus:border-[#C40018] focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Senha
                </label>
                <a href="#" className="text-xs font-semibold text-[#C40018] hover:text-[#8a0010]">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-12 pl-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C40018]/20 focus:border-[#C40018] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2 text-xs text-[#C40018] font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#C40018] text-white font-bold tracking-wide text-base shadow-lg shadow-[#C40018]/25 hover:bg-[#8a0010] active:scale-[0.99] transition-all"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Entrar
            </button>

            <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-[11px] text-slate-500 text-center">
              <span className="font-bold text-slate-700">Conta teste:</span> jessica.silva@email.com / jessica123
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Não possui conta?{" "}
            <Link to="/cadastro" className="font-bold text-[#C40018] hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT — Banner */}
      <div className="hidden lg:block lg:w-[62%] xl:w-[65%] relative overflow-hidden">
        <img
          src={heroImage}
          alt="Profissional de saúde segurando coração vermelho com gota de sangue"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C40018]/15 via-transparent to-slate-900/30" aria-hidden="true" />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 320" preserveAspectRatio="none" className="block w-full h-[260px]" aria-hidden="true">
            <defs>
              <linearGradient id="loginWave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e21420" />
                <stop offset="100%" stopColor="#8a0010" />
              </linearGradient>
            </defs>
            <path
              d="M0,160 C220,40 480,260 720,160 C900,90 1050,150 1200,90 L1200,320 L0,320 Z"
              fill="url(#loginWave)"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 px-12 pb-12 flex items-end justify-between gap-8 text-white">
            <p
              className="text-2xl xl:text-3xl font-extrabold leading-tight max-w-xl drop-shadow"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              "Cada gota de solidariedade<br />faz a vida continuar."
            </p>
            <svg className="w-16 h-16 opacity-90 shrink-0" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M32 54s-18-11-18-26a10 10 0 0118-6 10 10 0 0118 6c0 15-18 26-18 26z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}