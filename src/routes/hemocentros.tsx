import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/hemocentros")({
  head: () => ({ meta: [{ title: "Hemocentros — SangueAmigo" }, { name: "description", content: "Encontre hemocentros e veja estoques de sangue." }] }),
  component: HemocentrosPage,
});

const stock = [
  { type: "A+", level: "Alto", note: "Disponível em 4 centros", bags: 2000, cls: "bg-secondary-container text-on-secondary-container" },
  { type: "O-", level: "Baixo", note: "Apenas Hemocentro Central", bags: 112, cls: "bg-error text-white", critical: true },
  { type: "O+", level: "Alto", note: "Disponível em todos os centros", bags: 2500, cls: "bg-secondary-container text-on-secondary-container" },
  { type: "AB+", level: "Crítico", note: "Doações urgentes necessárias", bags: 80, cls: "bg-white text-error", urgent: true },
  { type: "B+", level: "Médio", note: "Disponível em 2 centros", bags: 500, cls: "bg-primary-fixed-dim text-on-primary-fixed-variant" },
];

function HemocentrosPage() {
  return (
    <AppLayout>
      <section className="bg-surface-container-low py-12 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="font-display-lg text-display-lg mb-6 max-w-2xl">
            Encontre hemocentros em todo o Brasil e ajude a salvar vidas
          </h1>
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-primary text-white h-12 px-8 rounded-xl font-headline-md flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-all">
              <Icon name="search" /> Buscar Hemocentros
            </button>
            <button className="bg-white border-2 border-primary text-primary h-12 px-8 rounded-xl font-headline-md flex items-center gap-2 hover:bg-primary-fixed transition-all">
              <Icon name="map" /> Ver no Mapa
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 py-xl">
        <div className="flex items-center gap-4 mb-lg">
          <div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center text-primary">
            <Icon name="bloodtype" fill className="text-3xl" />
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md">Estoque de Sangue</h2>
            <p className="text-body-sm text-tertiary">Visão geral dos estoques em hemocentros de Franca por tipo sanguíneo.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7">
            <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant/30">
              <h3 className="font-title-sm mb-md">Estoque atual por tipos</h3>
              <div className="space-y-3">
                {stock.map((s) => (
                  <div key={s.type} className={
                    "p-4 rounded-lg flex items-center justify-between border transition-transform hover:-translate-y-0.5 " +
                    (s.urgent ? "bg-error text-white border-error shadow-lg" : s.critical ? "bg-error-container/20 border-2 border-error" : "bg-white border-outline-variant/50")
                  }>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${s.cls}`}>{s.type}</div>
                      <div>
                        <p className={"text-body-sm font-bold " + (s.critical ? "text-error" : "")}>Nível de estoque {s.level}</p>
                        <p className={"text-xs " + (s.urgent ? "opacity-80" : "text-tertiary")}>{s.note}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={"font-headline-md " + (s.critical ? "text-error" : s.urgent ? "text-white" : "")}>{s.bags}</p>
                      <p className="text-[10px] font-label-caps uppercase">Bolsas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl p-md border border-outline-variant h-full flex flex-col">
              <h3 className="font-title-sm mb-lg">Distribuição por Tipos Sanguíneos</h3>
              <div className="flex-1 flex items-center justify-center py-lg">
                <div className="relative w-64 h-64 rounded-full shadow-inner border-[12px] border-white" style={{ background: "conic-gradient(#bc000a 0% 26%, #ba1a1a 26% 27.5%, #006c53 27.5% 60%, #e2241f 60% 61%, #737479 61% 67.5%, #e4e2e4 67.5% 100%)" }}>
                  <div className="absolute inset-0 flex items-center justify-center flex-col bg-white/40 backdrop-blur-[2px] rounded-full m-8">
                    <span className="font-display-lg text-primary">8.5k+</span>
                    <span className="font-label-caps text-tertiary text-[10px]">TOTAL BOLSAS</span>
                  </div>
                </div>
              </div>
              <div className="pt-md border-t border-slate-100">
                <h4 className="font-label-caps text-label-caps text-tertiary mb-4 uppercase">Legenda</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    ["bg-primary","A+ (26%)"],
                    ["bg-error","O- (1.5%)"],
                    ["bg-secondary","O+ (32.5%)"],
                    ["bg-primary-container","AB+ (1%)"],
                    ["bg-tertiary-container","B+ (6.5%)"],
                    ["bg-surface-variant","Outros (32.5%)"],
                  ].map(([c,l]) => (
                    <div key={l} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${c}`} />
                      <span className="text-body-sm">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
