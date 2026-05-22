import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/campanhas")({
  head: () => ({ meta: [{ title: "Campanhas — SangueAmigo" }, { name: "description", content: "Campanhas de doação ativas e urgentes." }] }),
  component: CampanhasPage,
});

const cards = [
  { tag: "Urgente", tagColor: "bg-red-50 text-primary", title: "Campanha: Salve vidas", date: "05 a 29 de Março", loc: "Santa Casa de Misericórdia", addr: "Rua Dr. Cesário Mota Júnior, 112, São Paulo", types: ["O-","A+","AB-"] },
  { tag: "Sazonal", tagColor: "bg-green-50 text-secondary", title: "Campanha: Junho Vermelho", date: "01 a 30 de Junho", loc: "Hemocentro Regional", addr: "Av. Enéas Carvalho de Aguiar, 155, São Paulo", types: ["Todos os Tipos"] },
];

function CampanhasPage() {
  return (
    <AppLayout>
      <main className="pt-8 pb-12">
        <section className="bg-primary py-xl px-md text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-display-lg text-display-lg text-white mb-2">Campanhas Ativas</h1>
            <p className="text-white/80">Participe e ajude a salvar vidas hoje mesmo.</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-md -mt-8">
          <div className="bg-white p-md rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row gap-md items-end">
            <div className="flex-1 w-full space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
                <Icon name="location_on" className="text-[16px]" /> Cidade
              </label>
              <select className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary">
                <option>São Paulo, SP</option><option>Rio de Janeiro, RJ</option><option>Curitiba, PR</option>
              </select>
            </div>
            <div className="flex-1 w-full space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
                <Icon name="calendar_month" className="text-[16px]" /> Data
              </label>
              <input type="date" className="w-full h-12 bg-surface-container-low border border-outline-variant rounded-xl px-4 outline-none focus:ring-2 focus:ring-primary" />
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
                  <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-colors">Participe</button>
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
