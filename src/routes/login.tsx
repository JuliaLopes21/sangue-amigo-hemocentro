import { createFileRoute, Link } from "@tanstack/react-router";
import logo from "@/assets/logo-sangueamigo.png";

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
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white" style={{ fontFamily: "Manrope, sans-serif" }}>
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-20 xl:p-24">
        <div className="mb-16 shrink-0">
          <Link to="/" aria-label="SangueAmigo - Início" className="inline-flex">
            <img src={logo} alt="SangueAmigo" className="h-16 w-auto" />
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto my-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              FAÇA SEU LOGIN
            </h1>
            <p className="text-gray-500 text-lg">
              Bem-vindo de volta! Acesse sua conta para gerenciar suas doações.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px] ml-1" htmlFor="email">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#bc000a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input id="email" type="email" placeholder="seu@email.com"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc000a]/10 focus:border-[#bc000a] focus:bg-white transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[2px] ml-1" htmlFor="password">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[#bc000a] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input id="password" type="password" placeholder="••••••••"
                  className="block w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#bc000a]/10 focus:border-[#bc000a] focus:bg-white transition-all" />
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <a href="#" className="text-sm font-semibold text-[#bc000a] hover:text-[#7a0007] transition-colors">Esqueceu a senha?</a>
              </div>
            </div>

            <button type="submit"
              className="w-full flex items-center justify-center gap-2 bg-[#bc000a] text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-[#bc000a]/20 hover:bg-[#7a0007] hover:shadow-2xl hover:shadow-[#bc000a]/30 active:scale-[0.98] transition-all">
              Login
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500">
              Não tem uma conta?{" "}
              <Link to="/cadastro" className="text-[#bc000a] font-bold hover:underline">Cadastre-se agora</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Hero */}
      <div className="hidden lg:flex w-1/2 bg-[#fef2f2] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-40 blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#bc000a]/5 to-transparent" />

        <div className="relative z-10 flex flex-col items-center max-w-lg">
          <div className="w-72 h-72 bg-gradient-to-br from-[#bc000a] to-[#7a0007] rounded-[48px] shadow-2xl shadow-[#bc000a]/40 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-700 mb-16">
            <div className="relative">
              <svg className="w-32 h-32 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-1">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M12 8v8m-4-4h8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-5xl xl:text-6xl font-black text-[#bc000a] leading-[1.1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Doe sangue,<br />salve vidas.
            </h2>
            <p className="text-[#7a0007]/60 text-xl font-medium leading-relaxed max-w-sm mx-auto">
              Seu gesto simples pode ser a esperança de alguém hoje.
            </p>
          </div>

          <div className="mt-12 flex gap-4">
            <div className="w-3 h-3 rounded-full bg-[#bc000a]/20 animate-bounce" />
            <div className="w-3 h-3 rounded-full bg-[#bc000a]/20 animate-bounce [animation-delay:0.2s]" />
            <div className="w-3 h-3 rounded-full bg-[#bc000a]/20 animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      </div>
    </div>
  );
}
