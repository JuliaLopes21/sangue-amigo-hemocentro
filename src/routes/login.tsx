import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";

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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-white border-b border-slate-100 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tighter font-headline-md">
            SangueAmigo
          </Link>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all active:scale-95">
            <Icon name="help_outline" />
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 md:px-0 min-h-screen pt-16">
        <div className="w-full flex flex-col md:flex-row items-stretch min-h-[720px] max-w-7xl mx-auto rounded-3xl overflow-hidden bg-white shadow-2xl my-12">
          <div className="w-full md:w-5/12 p-10 md:p-20 flex flex-col justify-center bg-white">
            <div className="mb-10">
              <h1 className="font-display-lg text-display-lg text-on-surface mb-2 tracking-tight">FAÇA SEU LOGIN</h1>
              <p className="text-on-surface-variant text-body-sm">
                Bem-vindo de volta! Acesse sua conta para gerenciar suas doações.
              </p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="email">E-mail</label>
                <div className="relative">
                  <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input id="email" type="email" placeholder="seu@email.com" className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" htmlFor="password">Senha</label>
                <div className="relative">
                  <Icon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input id="password" type="password" placeholder="••••••••" className="w-full pl-12 pr-12 py-4 rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-lg" />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors">
                    <Icon name="visibility" />
                  </button>
                </div>
                <div className="flex justify-end">
                  <a href="#" className="text-primary font-label-caps hover:underline">Esqueceu a senha?</a>
                </div>
              </div>
              <button type="submit" className="w-full h-14 bg-primary text-on-primary font-bold rounded-2xl hover:bg-surface-tint active:scale-95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                <span>Login</span>
                <Icon name="arrow_forward" />
              </button>
              <div className="relative py-4 flex items-center">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="mx-4 text-outline font-label-caps">OU</span>
                <div className="flex-grow border-t border-outline-variant" />
              </div>
              <p className="text-center text-on-surface-variant text-body-sm">
                Não tem uma conta?{" "}
                <Link to="/cadastro" className="text-primary font-bold hover:underline">Cadastre-se agora</Link>
              </p>
            </form>
          </div>

          <div className="hidden md:flex w-7/12 bg-surface-container relative items-center justify-center overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/3 -translate-x-1/4" />
            <div className="relative z-10 text-center px-12">
              <div className="mb-12 flex justify-center">
                <div className="w-80 h-80 rounded-3xl bg-gradient-to-br from-primary to-red-900 shadow-2xl flex items-center justify-center">
                  <Icon name="bloodtype" fill className="text-white text-[160px]" />
                </div>
              </div>
              <h2 className="font-display-lg text-display-lg text-primary leading-tight mb-6">
                Doe sangue,<br />salve vidas.
              </h2>
              <p className="text-on-surface-variant text-body-lg max-w-md mx-auto">
                Seu gesto simples pode ser a esperança de alguém hoje. Conectamos heróis como você a quem mais precisa.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-on-surface-variant font-label-caps opacity-60">
        © 2026 SangueAmigo. Todos os direitos reservados.
      </footer>
    </div>
  );
}
