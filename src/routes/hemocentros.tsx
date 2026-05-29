import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/hemocentros")({
  head: () => ({ meta: [{ title: "Hemocentros — SangueAmigo" }, { name: "description", content: "Encontre hemocentros e veja estoques de sangue." }] }),
  component: HemocentrosPage,
});

const francaUnits = [
  {
    name: "Núcleo de Hemoterapia de Franca",
    address: "Rua Cel. Flauzino Barbosa Sandoval, 100 — Franca, SP",
    distance: "1.8 km",
  },
  {
    name: "Santa Casa de Misericórdia de Franca",
    address: "Rua Cel. Flauzino Barbosa Sandoval, 121 — Franca, SP",
    distance: "2.1 km",
  },
  {
    name: "Hospital do Coração — Franca",
    address: "Av. Dr. Hélio Palermo, 2900 — Franca, SP",
    distance: "3.2 km",
  },
];

const postosSaude = [
  { name: "UBS Jardim Aeroporto", bairro: "Jardim Aeroporto", address: "Rua das Hortênsias, 250 — Franca, SP" },
  { name: "UBS Vila Industrial", bairro: "Vila Industrial", address: "Av. Wilson Sábio de Mello, 1100 — Franca, SP" },
  { name: "UBS City Petrópolis", bairro: "City Petrópolis", address: "Rua Petrópolis, 980 — Franca, SP" },
  { name: "UBS São Joaquim", bairro: "São Joaquim", address: "Rua São Joaquim, 432 — Franca, SP" },
  { name: "UBS Jardim Consolação", bairro: "Jardim Consolação", address: "Rua dos Estudantes, 75 — Franca, SP" },
  { name: "UBS Parque Vicente Leporace", bairro: "Parque Vicente Leporace", address: "Av. Champagnat, 1450 — Franca, SP" },
  { name: "UBS Jardim Paulistano", bairro: "Jardim Paulistano", address: "Rua Paulistano, 320 — Franca, SP" },
  { name: "UBS Cidade Nova", bairro: "Cidade Nova", address: "Av. Cidade Nova, 2010 — Franca, SP" },
  { name: "UBS Jardim Petraglia", bairro: "Jardim Petraglia", address: "Rua Petraglia, 410 — Franca, SP" },
  { name: "UBS Jardim Aeroporto II", bairro: "Jardim Aeroporto II", address: "Rua Aeroporto II, 88 — Franca, SP" },
  { name: "UBS Jardim Califórnia", bairro: "Jardim Califórnia", address: "Rua Califórnia, 530 — Franca, SP" },
  { name: "UBS Jardim Tropical", bairro: "Jardim Tropical", address: "Rua Tropical, 145 — Franca, SP" },
  { name: "UBS Jardim Aviação", bairro: "Jardim Aviação", address: "Av. dos Aviadores, 720 — Franca, SP" },
  { name: "UBS Jardim Santa Rita", bairro: "Jardim Santa Rita", address: "Rua Santa Rita, 360 — Franca, SP" },
  { name: "UBS Vila Rezende", bairro: "Vila Rezende", address: "Rua Rezende, 290 — Franca, SP" },
  { name: "UBS Vila Aparecida", bairro: "Vila Aparecida", address: "Rua Aparecida, 175 — Franca, SP" },
  { name: "UBS Jardim Brasilândia", bairro: "Jardim Brasilândia", address: "Rua Brasilândia, 615 — Franca, SP" },
  { name: "UBS Jardim Lima", bairro: "Jardim Lima", address: "Rua Lima, 88 — Franca, SP" },
  { name: "UBS Jardim Noêmia", bairro: "Jardim Noêmia", address: "Av. Noêmia, 1200 — Franca, SP" },
  { name: "UBS Jardim Santana", bairro: "Jardim Santana", address: "Rua Santana, 455 — Franca, SP" },
  { name: "UBS Jardim Bandeirantes", bairro: "Jardim Bandeirantes", address: "Rua Bandeirantes, 980 — Franca, SP" },
  { name: "UBS Jardim Alvorada", bairro: "Jardim Alvorada", address: "Rua Alvorada, 67 — Franca, SP" },
  { name: "UBS Jardim Independência", bairro: "Jardim Independência", address: "Rua Independência, 220 — Franca, SP" },
  { name: "UBS Jardim Luiza", bairro: "Jardim Luiza", address: "Rua Luiza, 305 — Franca, SP" },
  { name: "UBS Jardim Palma", bairro: "Jardim Palma", address: "Rua Palma, 142 — Franca, SP" },
  { name: "UBS Parque do Horto", bairro: "Parque do Horto", address: "Av. do Horto, 1850 — Franca, SP" },
  { name: "UBS Recanto Elimar", bairro: "Recanto Elimar", address: "Rua Elimar, 510 — Franca, SP" },
  { name: "UBS Residencial Baldassari", bairro: "Residencial Baldassari", address: "Rua Baldassari, 270 — Franca, SP" },
  { name: "UBS Núcleo Habitacional Antônio Petraglia", bairro: "Núcleo Petraglia", address: "Rua Petraglia, 999 — Franca, SP" },
  { name: "UBS Jardim Florença", bairro: "Jardim Florença", address: "Rua Florença, 415 — Franca, SP" },
  { name: "UBS Vila Santos Dumont", bairro: "Vila Santos Dumont", address: "Rua Santos Dumont, 120 — Franca, SP" },
  { name: "UBS Vila Monteiro Lobato", bairro: "Vila Monteiro Lobato", address: "Rua Monteiro Lobato, 480 — Franca, SP" },
  { name: "UBS Jardim Samello", bairro: "Jardim Samello", address: "Rua Samello, 312 — Franca, SP" },
  { name: "UBS Vila Imperador", bairro: "Vila Imperador", address: "Rua Imperador, 75 — Franca, SP" },
  { name: "UBS Jardim Veneza", bairro: "Jardim Veneza", address: "Rua Veneza, 640 — Franca, SP" },
  { name: "UBS Vila Scarabucci", bairro: "Vila Scarabucci", address: "Rua Scarabucci, 220 — Franca, SP" },
  { name: "UBS Jardim Antônio Petraglia", bairro: "Jardim Antônio Petraglia", address: "Rua A. Petraglia, 410 — Franca, SP" },
  { name: "UBS Centro", bairro: "Centro", address: "Rua General Carneiro, 100 — Franca, SP" },
];

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
  const [query, setQuery] = useState("");
  const [showPostos, setShowPostos] = useState(false);
  const filteredPostos = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return postosSaude;
    return postosSaude.filter(
      (p) => p.bairro.toLowerCase().includes(q) || p.name.toLowerCase().includes(q),
    );
  }, [query]);

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
          <div className="bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-md mb-8">
            <div className="flex items-center gap-2 mb-md text-primary">
              <Icon name="search" />
              <h2 className="font-title-sm">Hemocentros disponíveis em Franca</h2>
            </div>
            <p className="text-body-sm text-tertiary mb-md">Selecione uma unidade para agendar sua doação agora mesmo.</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {francaUnits.map((u) => (
                <li key={u.name}>
                  <Link
                    to="/agenda"
                    search={{ unit: u.name }}
                    className="block h-full p-4 border border-outline-variant/50 rounded-xl hover:border-primary hover:bg-red-50/40 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Icon name="bloodtype" fill className="text-primary" />
                      <span className="text-[10px] font-label-caps uppercase tracking-widest text-tertiary">{u.distance}</span>
                    </div>
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{u.name}</p>
                    <p className="text-xs text-tertiary mt-1">{u.address}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-primary text-body-sm font-bold">
                      Agendar aqui <Icon name="arrow_forward" className="text-sm" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-white border border-primary/20 rounded-2xl shadow-sm p-md mb-8">
            <div className="flex items-start gap-3 mb-md">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <Icon name="campaign" fill />
              </div>
              <div>
                <span className="inline-block text-[10px] font-label-caps uppercase tracking-widest text-primary bg-white border border-primary/20 rounded-full px-2 py-0.5 mb-1">Novidade</span>
                <h2 className="font-title-sm text-on-surface">
                  Agora você pode doar sangue bem pertinho da sua casa nos postos de saúde!
                </h2>
                <p className="text-body-sm text-tertiary mt-1">
                  Busque pelo seu bairro em Franca e agende em uma UBS próxima a você.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPostos((v) => !v)}
              className="inline-flex items-center gap-2 bg-primary text-white font-bold rounded-xl px-5 py-3 hover:brightness-90 active:scale-95 transition-all"
            >
              <Icon name={showPostos ? "expand_less" : "expand_more"} />
              {showPostos ? "Ocultar postos" : "Ver postos"}
            </button>

            <div
              className={
                "grid transition-all duration-500 ease-in-out " +
                (showPostos ? "grid-rows-[1fr] opacity-100 mt-md" : "grid-rows-[0fr] opacity-0")
              }
            >
              <div className="overflow-hidden">
                <div className="relative mb-md">
                  <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por bairro (ex: Jardim Aeroporto, Cidade Nova...)"
                    className="w-full h-12 pl-10 pr-4 bg-white border border-outline-variant/60 rounded-xl text-on-surface placeholder-tertiary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>

                {filteredPostos.length === 0 ? (
                  <p className="text-body-sm text-tertiary text-center py-6">
                    Nenhum posto encontrado para "{query}".
                  </p>
                ) : (
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[520px] overflow-y-auto pr-1">
                    {filteredPostos.map((p) => (
                      <li
                        key={p.name}
                        className="bg-white p-4 border border-outline-variant/40 rounded-xl flex flex-col animate-fade-in"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <Icon name="local_hospital" className="text-primary" />
                          <div>
                            <p className="font-bold text-on-surface text-sm">{p.name}</p>
                            <p className="text-xs text-tertiary">{p.bairro}</p>
                          </div>
                        </div>
                        <p className="text-xs text-tertiary flex-1">{p.address}</p>
                        <Link
                          to="/agenda"
                          search={{ unit: p.name }}
                          className="mt-3 inline-flex items-center justify-center gap-1 bg-primary text-white text-body-sm font-bold rounded-lg px-3 py-2 hover:brightness-90 active:scale-95 transition-all"
                        >
                          Agendar <Icon name="arrow_forward" className="text-sm" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
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
