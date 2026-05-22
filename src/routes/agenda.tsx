import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import { setAppointment, useAppointment } from "@/lib/schedule";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agendamento — SangueAmigo" },
      { name: "description", content: "Reserve o seu horário em um hemocentro próximo." },
    ],
  }),
  component: AgendaPage,
});

const dayDefs = [
  { dow: "SEG", day: 27, enabled: true },
  { dow: "TER", day: 28, enabled: true },
  { dow: "QUA", day: 29, enabled: true },
  { dow: "QUI", day: 30, enabled: true },
  { dow: "SEX", day: 31, enabled: true },
  { dow: "SAB", day: 1, enabled: false },
  { dow: "DOM", day: 2, enabled: false },
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
  const [city, setCity] = useState("Franca, SP");
  const [unitKey, setUnitKey] = useState<keyof typeof units>("Hemocentro de Franca");
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const canConfirm = !!day && !!time && !!unitKey;

  const handleConfirm = () => {
    if (!canConfirm || !day || !time) return;
    const year = 2026;
    const monthIdx = day >= 27 ? 6 : 7; // July=6, Aug=7
    const iso = new Date(year, monthIdx, day).toISOString();
    const u = units[unitKey];
    setAppointment({
      date: iso,
      time,
      unit: u.label,
      address: u.address,
      city,
      rewardPoints: 500,
    });
    navigate({ to: "/" });
  };

  const summary = useMemo(() => {
    if (!day || !time) return null;
    const monthLabel = day >= 27 ? "Julho" : "Agosto";
    return `${day} de ${monthLabel} de 2026, às ${time}`;
  }, [day, time]);

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
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">2</div>
                <h2 className="font-headline-md text-headline-md">Selecione o Dia</h2>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-sm">
                {dayDefs.map((d) => {
                  const isSelected = day === d.day;
                  return (
                    <button
                      key={d.day}
                      disabled={!d.enabled}
                      onClick={() => setDay(d.day)}
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
                      <span className="text-lg font-bold">{d.day}</span>
                    </button>
                  );
                })}
              </div>
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
      </main>
    </AppLayout>
  );
}
