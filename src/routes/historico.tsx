import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/historico")({
  head: () => ({ meta: [{ title: "Histórico — SangueAmigo" }, { name: "description", content: "Acompanhe sua jornada salvando vidas." }] }),
  component: HistoricoPage,
});

const rows = [
  ["Posto de Coleta Móvel", "10 de maio de 2026"],
  ["Hospital das Clínicas", "10 de março de 2026"],
  ["Hemocentro Regional", "10 de janeiro de 2026"],
];

function HistoricoPage() {
  return (
    <AppLayout>
      <main className="pt-8 pb-12 px-4 md:px-12 max-w-7xl mx-auto">
        <header className="mb-lg">
          <h1 className="font-display-lg text-display-lg text-on-background mb-2">Meu Histórico de Doações</h1>
          <p className="text-body-lg text-tertiary">Acompanhe sua jornada salvando vidas e veja o impacto real da sua solidariedade.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-lg">
          {[
            ["favorite", "Total de Doações", "6 vezes"],
            ["water_drop", "Litros Doados", "2,7 L"],
            ["groups", "Vidas Ajudadas", "12 Pessoas"],
          ].map(([icon, label, val]) => (
            <div key={label} className="bg-surface-container-lowest border border-slate-200 rounded-xl p-md flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Icon name={icon} fill className="text-primary" />
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-tertiary uppercase">{label}</p>
                <p className="font-headline-md text-headline-md">{val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-md mb-lg">
          <div className="lg:col-span-7 bg-surface-container-lowest border border-slate-200 rounded-xl p-md shadow-sm">
            <h2 className="font-title-sm text-title-sm mb-4">Impacto Estimado</h2>
            <div className="mb-6">
              <span className="font-display-lg text-display-lg text-primary">16 Pessoas</span>
              <p className="text-body-sm text-tertiary">ajudadas com suas doações</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
              <div className="bg-primary h-full rounded-full" style={{ width: "80%" }} />
            </div>
            <p className="text-xs text-tertiary text-right">Rumo à marca de 30 vidas</p>
            <div className="mt-6 italic text-body-sm text-tertiary border-l-2 border-primary pl-4">
              "Cada gota conta, cada doação é um novo começo para alguém."
            </div>
          </div>
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-md flex items-center justify-between shadow-sm">
            <div>
              <p className="text-body-sm text-tertiary">Tipo Sanguíneo</p>
              <p className="font-display-lg text-display-lg">O+</p>
            </div>
            <div className="bg-red-50 text-primary px-4 py-2 rounded-xl font-bold">Doador Universal</div>
          </div>
        </div>

        <section className="bg-surface-container-lowest border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="font-headline-md text-headline-md">Histórico de Doações</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 font-label-caps text-label-caps text-tertiary">LOCALIZAÇÃO</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-tertiary">DATA</th>
                  <th className="px-6 py-4 font-label-caps text-label-caps text-tertiary">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map(([loc, date]) => (
                  <tr key={loc} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-body-lg">{loc}</td>
                    <td className="px-6 py-4 text-body-lg text-tertiary">{date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-medium text-sm">
                        <Icon name="check_circle" fill className="text-sm" />
                        Concluído
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
