import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Início — SangueAmigo" },
      { name: "description", content: "Acompanhe suas doações, agendamentos e campanhas urgentes." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <AppLayout>
      <main className="pt-8 px-4 md:px-12 max-w-screen-2xl mx-auto">
        <section className="bg-primary-container rounded-3xl p-8 md:p-16 mb-10 overflow-hidden relative shadow-lg">
          <div className="max-w-3xl relative z-10">
            <h1 className="font-headline-md text-4xl md:text-6xl text-on-primary-container mb-6 leading-tight">
              Obrigado, suas doações já salvaram 12 vidas.
            </h1>
            <p className="text-white/90 mb-10 text-lg md:text-xl">
              Sua constância faz a diferença para quem mais precisa. Continue espalhando vida através da sua doação.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/agenda" className="bg-white text-primary font-headline-md px-10 py-4 rounded-2xl hover:bg-surface-container-lowest active:scale-95 transition-all shadow-md">
                Agendar Doação
              </Link>
              <Link to="/campanhas" className="bg-white/20 border border-white/30 text-white font-headline-md px-10 py-4 rounded-2xl backdrop-blur-sm hover:bg-white/30 active:scale-95 transition-all">
                Ver Campanhas
              </Link>
            </div>
          </div>
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
            <Icon name="volunteer_activism" className="text-[320px]" />
          </div>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute left-1/4 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <h3 className="font-title-sm text-on-surface mb-4">Próxima Disponibilidade</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-body-sm text-slate-500">Aguarde para doar novamente</span>
                <span className="font-headline-md text-primary">45 dias</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-4">
                <div className="bg-primary h-full w-2/3 rounded-full" />
              </div>
              <div className="flex items-center gap-2 mt-4 text-primary font-bold">
                <Icon name="favorite" className="text-lg" />
                <span className="text-body-sm">Até 16 vidas ajudadas</span>
              </div>
              <p className="text-body-sm text-slate-500">
                Você poderá doar novamente em <span className="font-bold text-on-surface">10 de Julho, 2026</span>.
              </p>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-sm text-on-surface">Histórico Recente</h3>
                <Link to="/historico" className="text-primary font-label-caps hover:underline">Ver tudo</Link>
              </div>
              <div className="space-y-6">
                {[
                  ["Hemocentro Regional", "10 de Janeiro de 2026 • 450ml"],
                  ["Hospital das Clínicas", "10 de Março de 2026 • 450ml"],
                  ["Posto de Coleta Móvel", "10 de Maio de 2026 • 450ml"],
                ].map(([title, sub]) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                      <Icon name="check" className="text-green-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{title}</p>
                      <p className="text-body-sm text-slate-500">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <span className="font-label-caps text-primary uppercase tracking-widest mb-2 block">Próximo Agendamento</span>
                <h2 className="font-headline-md text-2xl mb-1">Hemocentro Central</h2>
                <div className="flex items-center gap-2 text-on-surface-variant mb-6">
                  <Icon name="location_on" className="text-base" />
                  <span className="text-body-sm">Av. da Saudade, 123 - Centro</span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-white/60 rounded-2xl border border-white/80">
                  <div className="flex flex-col items-center border-r border-slate-200 pr-6">
                    <span className="font-label-caps text-slate-500">JULHO</span>
                    <span className="font-headline-md text-3xl">10</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-slate-500">HORÁRIO</span>
                    <p className="font-headline-md text-xl">09:30 AM</p>
                  </div>
                </div>
              </div>
              <Icon name="event_available" className="absolute -right-4 -bottom-4 text-primary/5 text-9xl" />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="h-48 relative bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-8 overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center text-white">
                  <div className="mb-3 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Icon name="bloodtype" fill className="text-4xl" />
                  </div>
                  <h4 className="font-headline-md text-xl">URGÊNCIA O-</h4>
                  <p className="text-xs font-label-caps text-white/80 tracking-widest">NÍVEL CRÍTICO</p>
                </div>
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-xl" />
                <div className="absolute -left-8 -top-8 w-40 h-40 bg-black/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
                    Campanha
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-title-sm text-on-surface mb-2">Salve Vidas: Estoque de Sangue O-</h3>
                <p className="text-body-sm text-slate-500 mb-6 flex-1">
                  Estamos com níveis críticos para o tipo O Negativo. Se você é doador deste tipo, sua ajuda é urgente para pacientes em cirurgias de emergência.
                </p>
                <Link to="/campanhas" className="w-full text-center py-3 border-2 border-primary text-primary font-headline-md rounded-2xl hover:bg-primary hover:text-white transition-all">
                  Ver Detalhes
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="p-5">
                <h3 className="font-title-sm text-on-surface">Hemocentros próximos</h3>
              </div>
              <div className="relative flex-1 bg-slate-100 min-h-[220px]">
                <iframe
                  title="Mapa de hemocentros próximos"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-46.6588%2C-23.5615%2C-46.6288%2C-23.5415&layer=mapnik&marker=-23.5515%2C-46.6438"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/40 to-transparent" />
                <Link to="/hemocentros" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-slate-100 hover:bg-slate-50 transition-all">
                  <Icon name="map" className="text-primary text-sm" />
                  <span className="font-label-caps text-on-surface">Abrir Mapa</span>
                </Link>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-slate-50">
                  <Icon name="bloodtype" fill className="text-primary" />
                  <div>
                    <p className="text-body-sm font-bold">Hemocentro Central</p>
                    <p className="text-[12px] text-slate-500">2.4 km de distância</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-surface rounded-xl transition-colors">
                  <Icon name="bloodtype" fill className="text-slate-400" />
                  <div>
                    <p className="text-body-sm font-bold">Hospital Sta Casa</p>
                    <p className="text-[12px] text-slate-500">4.1 km de distância</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Link to="/agenda" className="md:hidden fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-all z-40">
        <Icon name="add" className="text-2xl" />
      </Link>
    </AppLayout>
  );
}
