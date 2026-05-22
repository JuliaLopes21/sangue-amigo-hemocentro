import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import aviaoImg from "@/assets/pontos-aviao.png";
import viagemImg from "@/assets/reward-viagem.png";
import farmaciaImg from "@/assets/reward-farmacia.png";
import ipvaImg from "@/assets/reward-ipva.png";
import iptuImg from "@/assets/reward-iptu.png";

export const Route = createFileRoute("/pontos")({
  head: () => ({ meta: [{ title: "Pontos — SangueAmigo" }, { name: "description", content: "Pontos e recompensas pelas suas doações." }] }),
  component: PontosPage,
});

const rewards = [
  { title: "Desconto em passagens", desc: "Ganhe até 20% de desconto em trechos nacionais com a LATAM.", pts: 500, image: viagemImg },
  { title: "Desconto Farmácia", desc: "Até 20% de desconto em qualquer Droga Raia ou Drogasil.", pts: 300, image: farmaciaImg },
  { title: "Isenção taxa IPVA", desc: "Isenção garantida por lei para doadores recorrentes (min. 3x ano).", pts: 1000, image: ipvaImg },
  { title: "Isenção Taxa IPTU", desc: "Isenção garantida por lei para doadores recorrentes (min. 3x ano).", pts: 1500, image: iptuImg },
];

function PontosPage() {
  return (
    <AppLayout>
      <main className="pt-8 pb-lg max-w-7xl mx-auto px-md md:px-xl">
        <section className="mb-lg grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 bg-white p-lg rounded-xl border border-outline-variant/30 flex flex-col justify-center">
            <h1 className="font-display-lg text-display-lg text-primary mb-xs">Você tem 500 pontos</h1>
            <p className="text-body-lg text-on-surface-variant mb-md">
              Continue doando e salvando vidas para subir de nível e desbloquear mais recompensas.
            </p>
            <div className="space-y-sm">
              <div className="flex justify-between items-end">
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Nível Prata</span>
                <span className="font-title-sm text-title-sm text-primary">500/1000</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "50%" }} />
              </div>
              <p className="text-body-sm text-on-surface-variant text-right italic">Faltam 500 pontos para o Nível Ouro</p>
            </div>
          </div>
          <div className="md:col-span-5 h-64 md:h-full min-h-[300px] rounded-xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-md overflow-hidden">
            <img src={aviaoImg} alt="Recompensas SangueAmigo" className="max-h-full max-w-full object-contain drop-shadow-xl" />
          </div>
        </section>

        <section className="mb-lg">
          <div className="flex justify-between items-center mb-md">
            <h2 className="font-headline-md text-headline-md">Recompensas Disponíveis</h2>
            <button className="text-primary font-title-sm flex items-center gap-1 hover:underline">
              Ver todas <Icon name="arrow_forward" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {rewards.map((r) => (
              <div key={r.title} className="bg-white rounded-xl border border-outline-variant/30 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="aspect-video relative bg-gradient-to-br from-red-50 to-red-100 overflow-hidden">
                  <img src={r.image} alt={r.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-sm right-sm bg-primary text-white px-3 py-1 rounded-full text-label-caps font-bold shadow-md">{r.pts} pts</div>
                </div>
                <div className="p-md flex flex-col">
                  <h3 className="font-title-sm mb-xs">{r.title}</h3>
                  <p className="text-body-sm text-on-surface-variant mb-md">{r.desc}</p>
                  <button className="w-full py-3 bg-primary text-white rounded-xl font-title-sm hover:brightness-90 transition-all active:scale-95 mt-auto">Resgatar Agora</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-lg rounded-xl border border-outline-variant/30">
          <h2 className="font-headline-md text-headline-md mb-lg">Histórico de Resgates</h2>
          <div className="space-y-6 relative before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
            {[
              ["Doação Confirmada - Hospital do Coração — Franca", "28 Abr 2026", "+250 pontos acumulados"],
              ["Doação Confirmada - Hemocentro de Franca", "22 Jan 2026", "+250 pontos acumulados"],
            ].map(([title, date, pts]) => (
              <div key={title} className="relative flex gap-md items-start">
                <div className="relative z-10 w-11 h-11 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-sm shrink-0">
                  <Icon name="check_circle" className="text-green-600 text-xl" />
                </div>
                <div className="flex-1 pb-6 border-b border-outline-variant/10">
                  <div className="flex flex-col md:flex-row md:justify-between gap-1">
                    <h4 className="font-title-sm">{title}</h4>
                    <span className="text-body-sm text-on-surface-variant">{date}</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                    <Icon name="stars" className="text-primary text-sm" /> {pts}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
