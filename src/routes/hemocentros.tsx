import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/hemocentros")({
  head: () => ({ meta: [{ title: "Hemocentros — SangueAmigo" }, { name: "description", content: "Encontre hemocentros e veja estoques de sangue." }] }),
  component: HemocentrosPage,
});

// Dados aproximados do Núcleo de Hemoterapia de Franca / Santa Casa de Franca
// (estoque historicamente baixo desde abril/2025, processamento centralizado em Ribeirão Preto desde 2026).
const stock = [
  { type: "O-", level: "Crítico", note: "Doador universal — urgência máxima em Franca", bags: 18, cls: "bg-white text-error", urgent: true },
  { type: "O+", level: "Baixo", note: "Núcleo de Hemoterapia de Franca", bags: 64, cls: "bg-error-container/20 text-error", critical: true },
  { type: "A-", level: "Baixo", note: "Santa Casa de Franca", bags: 22, cls: "bg-error-container/20 text-error", critical: true },
  { type: "A+", level: "Médio", note: "Disponível em 2 unidades de Franca", bags: 96, cls: "bg-primary-fixed-dim text-on-primary-fixed-variant" },
  { type: "B+", level: "Médio", note: "Hemonúcleo Franca + Hospital do Coração", bags: 48, cls: "bg-primary-fixed-dim text-on-primary-fixed-variant" },
  { type: "B-", level: "Crítico", note: "Necessidade urgente de doadores", bags: 9, cls: "bg-white text-error", urgent: true },
  { type: "AB+", level: "Baixo", note: "Disponível somente no Hemocentro de Franca", bags: 14, cls: "bg-error-container/20 text-error", critical: true },
  { type: "AB-", level: "Crítico", note: "Tipo raro — campanha ativa", bags: 4, cls: "bg-white text-error", urgent: true },
];

function HemocentrosPage() {
  return (
    <AppLayout>
      <section className="bg-surface-container-low py-12 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="font-display-lg text-display-lg mb-2 max-w-3xl">
            Estoque de sangue em Franca, SP
          </h1>
          <p className="text-body-lg text-tertiary max-w-3xl mb-6">
            Núcleo de Hemoterapia de Franca, Santa Casa de Misericórdia e Hospital do Coração. Dados aproximados — estoques vêm baixos desde 2025.
          </p>
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
            <p className="text-body-sm text-tertiary">Visão geral consolidada das 3 unidades de coleta de Franca por tipo sanguíneo.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-7">
            <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant/30">
              <h3 className="font-title-sm mb-md">Estoque atual em Franca por tipos</h3>
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
              <h3 className="font-title-sm mb-lg">Distribuição em Franca por tipo</h3>
              <div className="flex-1 flex items-center justify-center py-lg">
                <div className="relative w-64 h-64 rounded-full shadow-inner border-[12px] border-white" style={{ background: "conic-gradient(#bc000a 0% 6%, #ba1a1a 6% 28%, #e2241f 28% 36%, #006c53 36% 69%, #737479 69% 86%, #e4e2e4 86% 91%, #c9a84c 91% 96%, #2d2d2d 96% 100%)" }}>
                  <div className="absolute inset-0 flex items-center justify-center flex-col bg-white/40 backdrop-blur-[2px] rounded-full m-8">
                    <span className="font-display-lg text-primary">275</span>
                    <span className="font-label-caps text-tertiary text-[10px]">TOTAL BOLSAS</span>
                  </div>
                </div>
              </div>
              <div className="pt-md border-t border-slate-100">
                <h4 className="font-label-caps text-label-caps text-tertiary mb-4 uppercase">Legenda — Franca</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    ["bg-error","O- (6%)"],
                    ["bg-primary","O+ (22%)"],
                    ["bg-secondary","A- (8%)"],
                    ["bg-tertiary-container","A+ (33%)"],
                    ["bg-primary-container","B+ (17%)"],
                    ["bg-surface-variant","B- (5%)"],
                    ["bg-error-container","AB+ (5%)"],
                    ["bg-on-surface","AB- (4%)"],
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
