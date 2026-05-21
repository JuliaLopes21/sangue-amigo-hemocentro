import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agendamento — SangueAmigo" },
      { name: "description", content: "Reserve o seu horário em um hemocentro próximo." },
    ],
  }),
  component: AgendaPage,
});

const days = [
  ["SEG", 18, true], ["TER", 19, true], ["QUA", 20, true], ["QUI", 21, true],
  ["SEX", 22, true], ["SAB", 23, false], ["DOM", 24, false],
] as const;

const times = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30"];

function AgendaPage() {
  return (
    <AppLayout>
      <main className="pt-8 pb-12 px-4 md:px-12 max-w-5xl mx-auto">
        <div className="mb-lg">
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Agendamento de Doação</h1>
          <p className="text-tertiary text-body-lg">
            Siga os passos abaixo para reservar o seu horário e ajudar a salvar vidas.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="p-lg space-y-xl">
            <section className="space-y-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">1</div>
                <h2 className="font-headline-md text-headline-md">Escolha a Unidade</h2>
              </div>
              <div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-xs">CIDADE</label>
                <div className="relative">
                  <select className="w-full h-12 px-md bg-surface-container-lowest border border-outline rounded-lg appearance-none focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                    <option value="">Selecione sua cidade</option>
                    <option>Franca, SP</option>
                    <option>Ribeirão Preto, SP</option>
                    <option>Batatais, SP</option>
                  </select>
                  <Icon name="expand_more" className="absolute right-md top-1/2 -translate-y-1/2 pointer-events-none text-outline" />
                </div>
              </div>
            </section>

            <section className="space-y-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">2</div>
                <h2 className="font-headline-md text-headline-md">Selecione o Dia</h2>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-sm">
                {days.map(([day, num, enabled]) => (
                  <button
                    key={num}
                    disabled={!enabled}
                    className={
                      "flex flex-col items-center justify-center py-md rounded-xl border border-outline-variant transition-all " +
                      (enabled ? "hover:bg-surface-container-high hover:border-primary" : "opacity-50 cursor-not-allowed")
                    }
                  >
                    <span className="text-xs font-bold text-outline-variant uppercase">{day}</span>
                    <span className="text-lg font-bold">{num}</span>
                  </button>
                ))}
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
                  return (
                    <button
                      key={t}
                      disabled={disabled}
                      className={
                        "py-sm rounded-lg border border-outline font-semibold transition-all " +
                        (disabled ? "opacity-40 cursor-not-allowed" : "hover:border-primary hover:text-primary")
                      }
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </section>

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
            <button className="bg-primary text-white px-xl py-4 rounded-xl font-bold flex items-center gap-sm hover:bg-red-700 transition-all">
              Confirmar agendamento
              <Icon name="arrow_forward" />
            </button>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
