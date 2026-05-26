import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import { setAppointment, useAppointment } from "@/lib/schedule";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agendamento — SangueAmigo" },
      { name: "description", content: "Reserve o seu horário em um hemocentro próximo." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    unit: typeof s.unit === "string" ? s.unit : undefined,
  }),
  component: AgendaPage,
});

const dayDefs = [
  { dow: "SEG", date: new Date(2026, 6, 27), enabled: true },
  { dow: "TER", date: new Date(2026, 6, 28), enabled: true },
  { dow: "QUA", date: new Date(2026, 6, 29), enabled: true },
  { dow: "QUI", date: new Date(2026, 6, 30), enabled: true },
  { dow: "SEX", date: new Date(2026, 6, 31), enabled: true },
  { dow: "SAB", date: new Date(2026, 7, 1), enabled: false },
  { dow: "DOM", date: new Date(2026, 7, 2), enabled: false },
] as const;

const times = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30"];

const units: Record<string, { label: string; address: string }> = {
  "Hemocentro de Franca": {
    label: "Hemocentro de Franca",
    address: "Rua Cel. Flauzino Barbosa Sandoval, 100 - Franca, SP",
  },
  "Hospital do Coração — Franca": {
    label: "Hospital do Coração — Franca",
    address: "Av. Dr. Hélio Palermo, 2900 - Franca, SP",
  },
  "Santa Casa de Misericórdia de Franca": {
    label: "Santa Casa de Misericórdia de Franca",
    address: "Rua Cel. Flauzino Barbosa Sandoval, 121 - Franca, SP",
  },
};

function AgendaPage() {
  const navigate = useNavigate();
  const existing = useAppointment();
  const { unit: unitFromUrl } = Route.useSearch();
  const [city, setCity] = useState("Franca, SP");
  const initialUnit = (unitFromUrl && (Object.keys(units) as Array<keyof typeof units>).find((k) => k === unitFromUrl)) || "Hemocentro de Franca";
  const [unitKey, setUnitKey] = useState<keyof typeof units>(initialUnit as keyof typeof units);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [friendCode, setFriendCode] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const canConfirm = !!selectedDate && !!time && !!unitKey;

  const handleConfirm = () => {
    if (!canConfirm || !selectedDate || !time) return;
    const u = units[unitKey];
    setAppointment({
      date: selectedDate.toISOString(),
      time,
      unit: u.label,
      address: u.address,
      city,
      rewardPoints: 500,
    });
    navigate({ to: "/" });
  };

  const summary = useMemo(() => {
    if (!selectedDate || !time) return null;
    return `${selectedDate.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}, às ${time}`;
  }, [selectedDate, time]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

  return (
    <AppLayout>
      <main className="pt-8 pb-12 px-4 md:px-12 max-w-5xl mx-auto">
        <div className="mb-lg">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Agendamento de Doação</h1>
          <p className="text-tertiary text-body-lg">
            Siga os passos abaixo para reservar o seu horário e ajudar a salvar vidas.
          </p>
        </div>

        {existing && (
          <div className="mb-md bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <Icon name="event_available" className="text-green-700" />
            <div className="flex-1">
              <p className="font-bold text-green-800">Você já tem um agendamento ativo</p>
              <p className="text-body-sm text-green-700">{existing.unit} — {new Date(existing.date).toLocaleDateString("pt-BR")} às {existing.time}</p>
            </div>
            <button onClick={() => setAppointment(null)} className="text-sm text-green-700 underline">Cancelar</button>
          </div>
        )}

        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="p-lg space-y-xl">
            <section className="space-y-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">1</div>
                <h2 className="font-headline-md text-headline-md">Escolha a Unidade</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">CIDADE</label>
                  <div className="relative">
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full h-12 px-md bg-surface-container-lowest border border-outline rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      <option>Franca, SP</option>
                      <option>Ribeirão Preto, SP</option>
                      <option>Batatais, SP</option>
                    </select>
                    <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                  </div>
                </div>
                <div>
                  <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">UNIDADE</label>
                  <div className="relative">
                    <select value={unitKey} onChange={(e) => setUnitKey(e.target.value as keyof typeof units)} className="w-full h-12 px-md bg-surface-container-lowest border border-outline rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                      {Object.keys(units).map((k) => <option key={k} value={k}>{k}</option>)}
                    </select>
                    <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-md">
              <div className="flex items-center justify-between gap-sm flex-wrap">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">2</div>
                  <h2 className="font-headline-md text-headline-md">Selecione o Dia</h2>
                </div>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 border border-outline px-4 py-2 rounded-lg text-sm font-semibold hover:border-primary hover:text-primary transition-colors">
                      <Icon name="calendar_month" className="text-base" />
                      Escolher outra data
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="end">
                    <Calendar
                      mode="single"
                      selected={selectedDate ?? undefined}
                      onSelect={(d) => { if (d) { setSelectedDate(d); setCalendarOpen(false); } }}
                      disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-sm">
                {dayDefs.map((d) => {
                  const isSelected = !!selectedDate && isSameDay(selectedDate, d.date);
                  return (
                    <button
                      key={d.date.toISOString()}
                      disabled={!d.enabled}
                      onClick={() => setSelectedDate(d.date)}
                      className={
                        "flex flex-col items-center justify-center py-md rounded-xl border transition-all " +
                        (isSelected
                          ? "bg-primary text-white border-primary"
                          : d.enabled
                          ? "border-outline-variant hover:bg-surface-container-high hover:border-primary"
                          : "border-outline-variant opacity-50 cursor-not-allowed")
                      }
                    >
                      <span className={"text-xs font-bold uppercase " + (isSelected ? "text-white/80" : "text-outline-variant")}>{d.dow}</span>
                      <span className="text-lg font-bold">{d.date.getDate()}</span>
                    </button>
                  );
                })}
              </div>
              {selectedDate && !dayDefs.some((d) => isSameDay(d.date, selectedDate)) && (
                <div className="bg-red-50 text-primary px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2">
                  <Icon name="event" className="text-base" />
                  Data escolhida: {selectedDate.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
              )}
            </section>

            <section className="space-y-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">3</div>
                <h2 className="font-headline-md text-headline-md">Selecione o Horário</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-sm">
                {times.map((t) => {
                  const disabled = t === "14:30";
                  const isSelected = time === t;
                  return (
                    <button
                      key={t}
                      disabled={disabled}
                      onClick={() => setTime(t)}
                      className={
                        "py-sm rounded-lg border font-semibold transition-all " +
                        (isSelected
                          ? "bg-primary text-white border-primary"
                          : disabled
                          ? "border-outline opacity-40 cursor-not-allowed"
                          : "border-outline hover:border-primary hover:text-primary")
                      }
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                  <Icon name="group_add" className="text-base" />
                </div>
                <h2 className="font-headline-md text-headline-md">Veio por indicação de um amigo?</h2>
              </div>
              <p className="text-body-sm text-on-surface-variant -mt-2">
                Informe o código de indicação para que seu amigo ganhe +200 pontos quando você confirmar a doação. Opcional.
              </p>
              <div className="relative max-w-md">
                <Icon name="confirmation_number" className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  value={friendCode}
                  onChange={(e) => setFriendCode(e.target.value.toUpperCase())}
                  placeholder="EX: AMIGO-7K2P"
                  className="w-full h-12 pl-10 pr-4 bg-surface-container-lowest border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary uppercase tracking-widest"
                />
              </div>
            </section>

            {summary && (
              <section>
                <div className="bg-red-50 border border-red-100 rounded-xl p-md flex items-center gap-3">
                  <Icon name="stars" fill className="text-primary" />
                  <p className="text-body-sm">
                    Confirmando este horário você ganhará <strong className="text-primary">+500 pontos</strong> referentes à sua <strong>3ª doação</strong> em {summary}.
                  </p>
                </div>
              </section>
            )}

            <section>
              <div className="bg-surface-container-high border-l-4 border-primary p-md rounded-r-lg flex items-start gap-md">
                <Icon name="error" className="text-primary text-3xl shrink-0" />
                <div>
                  <h4 className="font-bold text-on-surface">ATENÇÃO!!</h4>
                  <p className="text-body-lg">Você deve estar de jejum de 8h para este exame.</p>
                  <p className="text-sm mt-1 text-on-surface-variant">
                    Lembre-se de trazer um documento oficial com foto e estar bem hidratado.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="p-lg bg-surface-container border-t border-outline-variant/30 flex justify-end">
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className="bg-primary text-white px-xl py-4 rounded-xl font-bold flex items-center gap-sm hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirmar agendamento
              <Icon name="arrow_forward" />
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" role="dialog" aria-modal="true">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="p-4 border-b border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Icon name="check_circle" fill className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-headline-md text-base text-on-surface">Agendamento confirmado!</h3>
                  <p className="text-xs text-on-surface-variant">Confira o que levar no dia da doação.</p>
                </div>
              </div>
              <div className="p-4 space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-on-surface mb-1.5 text-xs">Documento oficial com foto:</h4>
                  <p className="text-on-surface-variant">RG, CNH, Carteira de trabalho, Passaporte ou carteira digital oficial com foto.</p>
                </div>
                <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                  <p className="font-bold text-on-surface mb-1">O documento deve estar:</p>
                  <p className="text-on-surface-variant">Dentro da validade, em bom estado e com foto que permita identificação.</p>
                </div>
                <div>
                  <p className="font-bold text-on-surface mb-1">Alguns hemocentros também podem pedir:</p>
                  <p className="text-on-surface-variant">CPF, Cartão do SUS e comprovante de agendamento.</p>
                </div>
              </div>
              <div className="p-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => { setShowConfirm(false); navigate({ to: "/" }); }}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-all"
                >
                  Entendi, ir para o início
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  );
}
