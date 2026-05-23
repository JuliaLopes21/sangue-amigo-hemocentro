import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import cover from "@/assets/campanhas-cover.png";

export const Route = createFileRoute("/campanhas")({
  head: () => ({ meta: [{ title: "Campanhas — SangueAmigo" }, { name: "description", content: "Campanhas de doação ativas e urgentes." }] }),
  component: CampanhasPage,
});

const cards = [
  {
    tag: "Urgente",
    tagColor: "bg-red-50 text-primary",
    title: "Campanha OAB Franca pela Vida",
    date: "18 de Abril a 30 de Maio de 2026",
    loc: "Núcleo de Hemoterapia de Franca",
    addr: "Rua Cel. Flauzino Barbosa Sandoval, 100 — Franca, SP",
    types: ["O-", "O+", "A-", "B-", "AB-"],
    unit: "Hemocentro de Franca",
  },
  {
    tag: "Sazonal",
    tagColor: "bg-green-50 text-secondary",
    title: "Junho Vermelho — Santa Casa de Franca",
    date: "01 a 30 de Junho de 2026",
    loc: "Santa Casa de Misericórdia de Franca",
    addr: "Rua Cel. Flauzino Barbosa Sandoval, 121 — Franca, SP",
    types: ["Todos os Tipos"],
    unit: "Santa Casa de Misericórdia de Franca",
  },
  {
    tag: "Hospitalar",
    tagColor: "bg-red-50 text-primary",
    title: "Doe pelo Hospital do Coração de Franca",
    date: "Permanente — agendamento contínuo",
    loc: "Hospital do Coração de Franca",
    addr: "Av. Dr. Hélio Palermo, 2900 — Franca, SP",
    types: ["O-", "AB-", "B-"],
    unit: "Hospital do Coração — Franca",
  },
  {
    tag: "Solidária",
    tagColor: "bg-green-50 text-secondary",
    title: "Franca + Vida — Hospital do Câncer",
    date: "10 de Maio a 30 de Julho de 2026",
    loc: "Hospital do Câncer de Franca",
    addr: "Av. Dr. Hélio Palermo, 3265 — Franca, SP",
    types: ["A+", "O+", "B+"],
    unit: "Hospital do Coração — Franca",
  },
];

function CampanhasPage() {
  return (
    <AppLayout>
      <main className="pt-8 pb-12">
        <section className="bg-primary px-md text-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <img
              src={cover}
              alt="Gotas que salvam vidas — participe das campanhas locais"
              className="w-full h-auto object-contain block"
              loading="eager"
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-md mt-md">
          <div className="bg-white p-md rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-md items-end">
            <div className="flex-1 w-full space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
                <Icon name="location_on" className="text-[16px]" /> Cidade
              </label>
              <select className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary">
                <option>Franca, SP</option><option>Ribeirão Preto, SP</option><option>Batatais, SP</option>
              </select>
            </div>
            <button className="bg-primary text-white h-12 px-lg rounded-xl font-bold hover:bg-primary-container transition-all active:scale-95">Filtrar</button>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-md py-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {cards.map((c) => (
              <div key={c.title} className="bg-white border border-slate-100 rounded-3xl p-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
                <div className="space-y-md">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${c.tagColor}`}>{c.tag}</span>
                    <Icon name="campaign" className="text-slate-300" />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-primary">{c.title}</h3>
                    <p className="text-on-surface-variant mt-2 font-medium flex items-center gap-2">
                      <Icon name="event" className="text-sm" /> {c.date}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="location_on" className="text-primary" />
                      <div>
                        <p className="font-bold text-on-surface">{c.loc}</p>
                        <p className="text-sm text-on-surface-variant">{c.addr}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="bloodtype" className="text-primary" />
                      <div className="flex gap-2 flex-wrap">
                        {c.types.map(t => (
                          <span key={t} className="px-3 py-1 rounded-lg bg-red-50 text-primary text-xs font-bold">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-lg flex gap-3">
                  <Link
                    to="/agenda"
                    search={{ unit: c.unit }}
                    className="flex-1 text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-colors"
                  >
                    Participe
                  </Link>
                  <button className="flex-1 border border-primary text-primary py-3 rounded-xl font-bold hover:bg-red-50 transition-colors">Saiba Mais</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-md mb-xl">
          <div className="bg-surface-container rounded-3xl p-lg flex flex-col md:flex-row items-center gap-lg border border-outline-variant">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="font-headline-md text-headline-md text-on-surface">Quer receber alertas de campanhas?</h2>
              <p className="text-on-surface-variant">Avisamos você quando houver uma campanha de urgência para o seu tipo sanguíneo na sua região.</p>
            </div>
            <div className="flex-1 w-full flex gap-3">
              <input type="email" placeholder="Seu melhor e-mail" className="flex-1 h-12 bg-white border border-outline rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary" />
              <button className="bg-secondary text-white px-8 rounded-xl font-bold hover:opacity-90 transition-opacity">Cadastrar</button>
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
