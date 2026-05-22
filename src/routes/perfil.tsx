import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Meu Perfil — SangueAmigo" }, { name: "description", content: "Suas informações pessoais e dados de saúde." }] }),
  component: PerfilPage,
});

const personal: [string, string][] = [
  ["NOME COMPLETO", "João Augusto da Silva"],
  ["CPF", "123.456.789-00"],
  ["DATA DE NASCIMENTO", "12/05/1988"],
  ["GÊNERO", "Masculino"],
  ["TELEFONE", "(11) 98765-4321"],
  ["E-MAIL", "joao.silva@email.com"],
];

function PerfilPage() {
  return (
    <AppLayout>
      <main className="pt-8 pb-12 px-4 md:px-12 max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-background mb-2">Meu Perfil</h1>
            <p className="text-body-lg text-slate-500">Gerencie suas informações pessoais e dados de saúde.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 border-2 border-primary text-primary font-bold rounded-xl hover:bg-red-50 transition-colors">
            <Icon name="edit" className="text-sm" /> Editar Dados
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-outline-variant rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative group cursor-pointer mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container bg-gradient-to-br from-primary to-red-900 flex items-center justify-center">
                  <span className="text-white text-5xl font-extrabold">JS</span>
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  <Icon name="photo_camera" className="text-sm" />
                </div>
              </div>
              <h2 className="font-headline-md text-headline-md mb-1">João Silva</h2>
              <span className="bg-red-100 text-primary px-3 py-1 rounded-full font-label-caps uppercase text-xs tracking-wider mb-4">Doador Ativo</span>
              <div className="w-full flex justify-between px-4 py-4 bg-surface-container-low rounded-lg mt-4">
                {[["TIPO","O+"],["DOAÇÕES","3"],["VIDAS","12"]].map(([l,v],i) => (
                  <div key={l} className={"text-center flex-1 " + (i > 0 ? "border-l border-outline-variant" : "")}>
                    <p className="font-label-caps text-label-caps text-slate-400">{l}</p>
                    <p className="font-display-lg text-primary text-xl">{v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="font-title-sm text-title-sm mb-4 flex items-center gap-2">
                <Icon name="verified" className="text-primary" /> Status de Saúde
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-slate-600">Último Exame</span>
                  <span className="text-body-sm font-bold">15 Ago 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-slate-600">Apto para Doar</span>
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <Icon name="check_circle" className="text-xs" /> Sim
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="lg:col-span-8">
            <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
              <div className="mb-8">
                <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container pb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {personal.map(([l, v]) => (
                    <div key={l} className="space-y-1">
                      <label className="font-label-caps text-label-caps text-slate-400 block">{l}</label>
                      <p className="text-body-lg font-medium">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container pb-4">Localização</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-1"><label className="font-label-caps text-label-caps text-slate-400 block">ESTADO</label><p className="text-body-lg font-medium">São Paulo</p></div>
                  <div className="space-y-1"><label className="font-label-caps text-label-caps text-slate-400 block">CIDADE</label><p className="text-body-lg font-medium">São Paulo</p></div>
                </div>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container pb-4">Dados Fisiológicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-1">
                    <label className="font-label-caps text-label-caps text-slate-400 block">TIPO SANGUÍNEO</label>
                    <div className="flex items-center gap-2">
                      <p className="text-body-lg font-bold text-xl text-primary">O Positivo (O+)</p>
                      <Icon name="water_drop" fill className="text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-caps text-label-caps text-slate-400 block">PESO</label>
                    <p className="text-body-lg font-medium">82.5 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppLayout>
  );
}
