import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Icon } from "@/components/Icon";
import jessicaAvatar from "@/assets/jessica-avatar.jpg";
import susCard from "@/assets/sus-card.jpg";
import { setAppointment } from "@/lib/schedule";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Meu Perfil — SangueAmigo" }, { name: "description", content: "Suas informações pessoais e dados de saúde." }] }),
  component: PerfilPage,
});

type PersonalKey = "nome" | "cpf" | "nascimento" | "sexo" | "telefone" | "email" | "senha" | "peso" | "estado" | "cidade";
const initialData: Record<PersonalKey, string> = {
  nome: "Jessica Santos Silva",
  cpf: "412.785.369-22",
  nascimento: "15/03/1995",
  sexo: "Feminino",
  telefone: "(16) 99812-4470",
  email: "jessica.silva@email.com",
  senha: "••••••••••",
  peso: "62",
  estado: "São Paulo (SP)",
  cidade: "Franca",
};
const labels: Record<PersonalKey, string> = {
  nome: "NOME COMPLETO",
  cpf: "CPF",
  nascimento: "DATA DE NASCIMENTO",
  sexo: "SEXO",
  telefone: "TELEFONE",
  email: "E-MAIL",
  senha: "SENHA",
  peso: "PESO (kg)",
  estado: "ESTADO",
  cidade: "CIDADE",
};
const editableKeys: PersonalKey[] = ["nome", "telefone", "email", "senha", "peso", "estado", "cidade"];

function PerfilPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(initialData);
  const [editOpen, setEditOpen] = useState(false);
  const [draft, setDraft] = useState(initialData);
  const [avatarSrc, setAvatarSrc] = useState<string>(jessicaAvatar);
  const [viewPhotoOpen, setViewPhotoOpen] = useState(false);
  const [photoMenuOpen, setPhotoMenuOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogout = () => {
    setAppointment(null);
    navigate({ to: "/login" });
  };

  const openEdit = () => { setDraft(data); setEditOpen(true); };
  const saveEdit = () => { setData(draft); setEditOpen(false); };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(String(ev.target?.result || ""));
    reader.readAsDataURL(f);
  };

  const personalList: [string, string][] = [
    [labels.nome, data.nome],
    [labels.cpf, data.cpf],
    [labels.nascimento, data.nascimento],
    [labels.sexo, data.sexo],
    [labels.telefone, data.telefone],
    [labels.email, data.email],
    [labels.senha, data.senha],
  ];

  return (
    <AppLayout>
      <main className="pt-8 pb-12 px-4 md:px-12 max-w-6xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-display-lg text-display-lg text-on-background mb-2">Meu Perfil</h1>
            <p className="text-body-lg text-slate-500">Gerencie suas informações pessoais e dados de saúde.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={openEdit} className="flex items-center gap-2 px-6 py-2 border-2 border-primary text-primary font-bold rounded-xl hover:bg-red-50 transition-colors">
              <Icon name="edit" className="text-sm" /> Editar Dados
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:brightness-90 transition-all active:scale-95">
              <Icon name="logout" className="text-sm" /> Sair
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white border border-outline-variant rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container bg-gradient-to-br from-primary to-red-900">
                  <img src={avatarSrc} alt="Foto de perfil de Jessica" className="w-full h-full object-cover" width={512} height={512} loading="lazy" />
                </div>
                <Popover open={photoMenuOpen} onOpenChange={setPhotoMenuOpen}>
                  <PopoverTrigger asChild>
                    <button aria-label="Opções de foto" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Icon name="photo_camera" className="text-sm" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-52 p-2">
                    <button
                      onClick={() => { setPhotoMenuOpen(false); fileRef.current?.click(); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container text-left text-sm font-medium"
                    >
                      <Icon name="cloud_upload" className="text-primary" /> Trocar foto
                    </button>
                    <button
                      onClick={() => { setPhotoMenuOpen(false); setViewPhotoOpen(true); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container text-left text-sm font-medium"
                    >
                      <Icon name="visibility" className="text-primary" /> Visualizar foto
                    </button>
                  </PopoverContent>
                </Popover>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>
              <h2 className="font-headline-md text-headline-md mb-1">{data.nome.split(" ")[0]} {data.nome.split(" ").slice(-1)[0]}</h2>
              <span className="bg-red-100 text-primary px-3 py-1 rounded-full font-label-caps uppercase text-xs tracking-wider mb-4">Doador Ativo</span>
              <div className="w-full flex justify-between px-4 py-4 bg-surface-container-low rounded-lg mt-4">
                {[["TIPO","A+"],["DOAÇÕES","2"],["VIDAS","8"]].map(([l,v],i) => (
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
                  <span className="text-body-sm font-bold">28 Abr 2026</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-body-sm text-slate-600">Apto para Doar</span>
                  <span className="text-secondary font-bold flex items-center gap-1">
                    <Icon name="check_circle" className="text-xs" /> Sim
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
              <h3 className="font-title-sm text-title-sm mb-4 flex items-center gap-2">
                <Icon name="badge" className="text-primary" /> Cartão do SUS
              </h3>
              <img src={susCard} alt="Cartão Nacional de Saúde de Jessica" className="w-full rounded-lg shadow-sm" loading="lazy" />
            </div>
          </section>

          <section className="lg:col-span-8">
            <div className="bg-white border border-outline-variant rounded-xl p-8 shadow-sm">
              <div className="mb-8">
                <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container pb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {personalList.map(([l, v]) => (
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
                  <div className="space-y-1"><label className="font-label-caps text-label-caps text-slate-400 block">ESTADO</label><p className="text-body-lg font-medium">{data.estado}</p></div>
                  <div className="space-y-1"><label className="font-label-caps text-label-caps text-slate-400 block">CIDADE</label><p className="text-body-lg font-medium">{data.cidade}</p></div>
                </div>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md mb-6 border-b border-surface-container pb-4">Dados Fisiológicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-1">
                    <label className="font-label-caps text-label-caps text-slate-400 block">TIPO SANGUÍNEO</label>
                    <div className="flex items-center gap-2">
                      <p className="text-body-lg font-bold text-xl text-primary">A Positivo (A+)</p>
                      <Icon name="water_drop" fill className="text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-label-caps text-label-caps text-slate-400 block">PESO</label>
                    <p className="text-body-lg font-medium">{data.peso} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar informações pessoais</DialogTitle>
              <DialogDescription>Atualize seus dados. Campos como CPF, data de nascimento e sexo não podem ser alterados.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              {editableKeys.map((k) => (
                <div key={k} className="space-y-1">
                  <label className="font-label-caps text-xs text-slate-500 uppercase tracking-wider">{labels[k]}</label>
                  <input
                    type={k === "senha" ? "password" : k === "email" ? "email" : "text"}
                    value={draft[k]}
                    onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
                    className="w-full h-11 px-3 border border-outline rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <button onClick={() => setEditOpen(false)} className="px-5 py-2 border border-outline rounded-lg font-semibold hover:bg-surface-container">Cancelar</button>
              <button onClick={saveEdit} className="px-5 py-2 bg-primary text-white rounded-lg font-bold hover:brightness-90">Salvar alterações</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={viewPhotoOpen} onOpenChange={setViewPhotoOpen}>
          <DialogContent className="max-w-md p-2 bg-black/95 border-none">
            <DialogHeader className="sr-only">
              <DialogTitle>Foto de perfil</DialogTitle>
            </DialogHeader>
            <img src={avatarSrc} alt="Foto de perfil" className="w-full h-auto rounded-lg" />
          </DialogContent>
        </Dialog>
      </main>
    </AppLayout>
  );
}
