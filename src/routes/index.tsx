import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import { useAppointment } from "@/lib/schedule";
import bloodBg from "@/assets/blood-molecules-bg.jpg";

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
  const appt = useAppointment();
  const apptDate = appt ? new Date(appt.date) : null;
  const monthLabel = apptDate ? apptDate.toLocaleString("pt-BR", { month: "short" }).replace(".", "").toUpperCase() : "";
  const dayLabel = apptDate ? String(apptDate.getDate()).padStart(2, "0") : "";
  const nextAvailableDate = apptDate ? new Date(apptDate.getTime()) : null;
  if (nextAvailableDate && apptDate) nextAvailableDate.setMonth(nextAvailableDate.getMonth() + 3);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalDays = 90;
  const daysRemaining = nextAvailableDate
    ? Math.max(0, Math.ceil((nextAvailableDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const progressPct = nextAvailableDate
    ? Math.min(100, Math.max(0, ((totalDays - daysRemaining) / totalDays) * 100))
    : 0;
  const nextAvailableLabel = nextAvailableDate
    ? nextAvailableDate.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
    : "";
  return (
    <AppLayout>
      <main className="pt-8 px-4 md:px-12 max-w-screen-2xl mx-auto">
        <section className="bg-primary-container rounded-3xl p-8 md:p-16 mb-10 overflow-hidden relative shadow-lg">
          <img
            src={bloodBg}
            alt=""
            aria-hidden="true"
            width={1536}
            height={896}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/85 to-primary-container/40 pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <h1 className="font-headline-md text-4xl md:text-6xl text-on-primary-container mb-6 leading-tight">
              Obrigada Jessica, suas doações já salvaram 8 vidas.
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
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute left-1/4 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <h3 className="font-title-sm text-on-surface mb-4">Próxima Disponibilidade</h3>
              {appt && nextAvailableDate ? (
                <div className="py-2">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                      <Icon name="schedule" fill className="text-primary text-2xl" />
                    </div>
                    <div>
                      <p className="text-body-sm font-bold text-on-surface">Você irá doar novamente em</p>
                      <p className="text-xs text-slate-500">{nextAvailableLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="font-headline-md text-3xl text-primary leading-none">{daysRemaining}</span>
                    <span className="text-xs text-slate-500">dias restantes</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-red-400 rounded-full transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">Intervalo mínimo de 3 meses entre doações.</p>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-slate-50 flex items-center justify-center mb-3">
                    <Icon name="schedule" className="text-slate-300 text-3xl" />
                  </div>
                  <p className="text-body-sm text-slate-500">Sem informações no momento.</p>
                  <p className="text-xs text-slate-400 mt-1">Agende sua próxima doação para ver a previsão aqui.</p>
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex-1">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-title-sm text-on-surface">Histórico Recente</h3>
                <Link to="/historico" className="text-primary font-label-caps hover:underline">Ver tudo</Link>
              </div>
              <div className="space-y-6">
                {[
                  ["Hemocentro de Franca", "22 de Janeiro de 2026 • 450ml"],
                  ["Hospital do Coração — Franca", "28 de Abril de 2026 • 450ml"],
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
                {appt ? (
                  <>
                    <h2 className="font-headline-md text-2xl mb-1">{appt.unit}</h2>
                    <div className="flex items-center gap-2 text-on-surface-variant mb-6">
                      <Icon name="location_on" className="text-base" />
                      <span className="text-body-sm">{appt.address}</span>
                    </div>
                    <div className="flex items-center gap-6 p-4 bg-white/60 rounded-2xl border border-white/80">
                      <div className="flex flex-col items-center border-r border-slate-200 pr-6">
                        <span className="font-label-caps text-slate-500">{monthLabel}</span>
                        <span className="font-headline-md text-3xl">{dayLabel}</span>
                      </div>
                      <div>
                        <span className="font-label-caps text-slate-500">HORÁRIO</span>
                        <p className="font-headline-md text-xl">{appt.time}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-10 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-white/60 flex items-center justify-center mb-3">
                      <Icon name="event_busy" className="text-slate-400 text-3xl" />
                    </div>
                    <p className="text-body-sm text-on-surface-variant mb-4">Nenhum agendamento ativo no momento.</p>
                    <Link to="/agenda" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-red-700 transition-all">
                      <Icon name="add" className="text-sm" /> Agendar agora
                    </Link>
                  </div>
                )}
              </div>
              <Icon name="event_available" className="absolute -right-4 -bottom-4 text-primary/5 text-9xl" />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm flex-1 flex flex-col">
              <div className="h-48 relative bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-8 overflow-hidden">
                <div className="relative z-10 flex flex-col items-center text-center text-white">
                  <div className="mb-3 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                    <Icon name="bloodtype" fill className="text-4xl" />
                  </div>
                  <h4 className="font-headline-md text-xl">OAB FRANCA PELA VIDA</h4>
                  <p className="text-xs font-label-caps text-white/80 tracking-widest">URGÊNCIA EM FRANCA</p>
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
                <h3 className="font-title-sm text-on-surface mb-2">Campanha OAB Franca pela Vida</h3>
                <p className="text-body-sm text-slate-500 mb-6 flex-1">
                  O Núcleo de Hemoterapia de Franca está com estoque crítico de O-, A- e B-. Participe da campanha local até 30 de Maio e ajude a salvar vidas em Franca.
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
                  title="Mapa de hemocentros em Franca-SP"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-47.4200%2C-20.5600%2C-47.3700%2C-20.5200&layer=mapnik"
                />
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    { top: "47%", left: "39%", label: "Hemocentro de Franca" },
                    { top: "67%", left: "57%", label: "Hospital do Coração" },
                    { top: "72%", left: "63%", label: "Santa Casa de Franca" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="absolute -translate-x-1/2 -translate-y-full"
                      style={{ top: m.top, left: m.left }}
                      title={m.label}
                    >
                      <div className="relative flex flex-col items-center">
                        <span className="absolute inset-0 w-5 h-5 rounded-full bg-primary/40 animate-ping" />
                        <span className="w-5 h-5 rounded-full bg-primary border-2 border-white shadow-md" />
                        <span className="w-1.5 h-2 bg-primary -mt-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/40 to-transparent" />
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-slate-50">
                  <Icon name="bloodtype" fill className="text-primary" />
                  <div>
                    <p className="text-body-sm font-bold">Hemocentro de Franca</p>
                    <p className="text-[12px] text-slate-500">Santa Casa • 1.8 km</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-surface rounded-xl transition-colors">
                  <Icon name="bloodtype" fill className="text-slate-400" />
                  <div>
                    <p className="text-body-sm font-bold">Hospital do Coração</p>
                    <p className="text-[12px] text-slate-500">Franca, SP • 3.2 km</p>
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
