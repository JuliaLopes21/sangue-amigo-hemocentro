import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@/components/Icon";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro — SangueAmigo" },
      { name: "description", content: "Cadastre-se para começar a salvar vidas e acumular benefícios." },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-white border-b border-slate-100 fixed top-0 w-full z-50">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 w-full max-w-screen-2xl mx-auto">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tighter font-headline-md">
            SangueAmigo
          </Link>
          <Link to="/login" className="font-label-caps text-primary hover:underline">JÁ TENHO CONTA</Link>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-32 px-4 md:px-xl">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <div className="mb-10 text-center md:text-left">
                <h1 className="font-headline-md text-headline-md text-primary mb-2">CADASTRO DOADORES DE SANGUE</h1>
                <p className="text-body-sm text-on-surface-variant">
                  Preencha seus dados para começar a salvar vidas e acumular benefícios.
                </p>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-6">
                  {[
                    ["NOME COMPLETO", "text", "Digite seu nome"],
                    ["DATA DE NASCIMENTO", "date", ""],
                    ["CPF", "text", "000.000.000-00"],
                    ["TELEFONE", "tel", "(00) 00000-0000"],
                    ["E-MAIL", "email", "seu@email.com"],
                    ["SENHA", "password", "********"],
                  ].map(([label, type, ph]) => (
                    <div key={label} className="flex flex-col">
                      <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">{label}</label>
                      <input type={type} placeholder={ph} className="h-12 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 text-body-lg outline-none transition-all" />
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">CIDADE</label>
                    <input type="text" placeholder="Sua cidade" className="h-12 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 text-body-lg outline-none" />
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">ESTADO</label>
                    <select className="h-12 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 text-body-lg outline-none">
                      <option value="">Selecione seu estado</option>
                      <option>São Paulo</option>
                      <option>Rio de Janeiro</option>
                      <option>Minas Gerais</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">TIPO SANGUÍNEO</label>
                      <select className="h-12 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 text-body-lg outline-none">
                        <option value="">--</option>
                        {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">PESO (KG)</label>
                      <input type="number" placeholder="00" className="h-12 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary px-4 text-body-lg outline-none" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">SEXO</label>
                    <div className="flex space-x-4">
                      {["Masculino","Feminino"].map((s, i) => (
                        <label key={s} className="flex-1 flex items-center justify-center h-12 border border-outline-variant rounded-xl cursor-pointer hover:bg-slate-50 transition-colors has-[:checked]:bg-primary-fixed has-[:checked]:border-primary">
                          <input className="hidden" name="sexo" type="radio" defaultChecked={i === 0} />
                          <span className="text-body-lg">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 ml-1">FOTO CARTÃO SUS</label>
                    <div className="group relative flex flex-col items-center justify-center h-48 border-2 border-dashed border-outline-variant rounded-2xl bg-slate-50 hover:border-primary hover:bg-red-50 transition-all cursor-pointer">
                      <Icon name="cloud_upload" className="text-4xl text-slate-400 group-hover:text-primary mb-2" />
                      <p className="text-body-sm text-slate-500 group-hover:text-primary">Clique ou arraste a foto aqui</p>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start space-x-3">
                    <input type="checkbox" className="mt-1 rounded border-outline-variant text-primary focus:ring-primary h-5 w-5" />
                    <p className="text-sm text-on-surface-variant max-w-sm">
                      Ao me cadastrar, aceito os Termos de Uso e a Política de Privacidade do SangueAmigo.
                    </p>
                  </div>
                  <button type="submit" className="w-full md:w-auto px-12 h-14 bg-primary text-white font-headline-md text-headline-md rounded-2xl hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-200">
                    FINALIZAR CADASTRO
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-red-50 rounded-[32px] flex flex-col md:flex-row items-center gap-12 border border-red-100 p-6 md:p-8">
            <div className="flex-1 space-y-4">
              <h2 className="text-primary leading-tight text-headline-md font-headline-md">
                Doe sangue e ganhe exames de rotina gratuitos
              </h2>
              <p className="text-on-surface-variant">
                Doadores frequentes recebem benefícios extras, incluindo check-ups gratuitos no SUS.
              </p>
            </div>
            <div className="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center">
              <Icon name="redeem" className="text-primary text-6xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
