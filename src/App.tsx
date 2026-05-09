/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Mail, LayoutDashboard, Briefcase, Globe, FileText, 
  CheckCircle2, ArrowRight, ArrowLeft, Upload, Shield, Clock, 
  Search, LogOut, Settings, MessageSquare, CreditCard, Bell, 
  Plus, File, Trash2, ExternalLink, Info, 
  MapPin, Check, ChevronDown, Monitor, Home, Users, HelpCircle,
  Zap, AlertTriangle, Star
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types & Constants ---

const WILAYAS = [
  "01 - Adrar", "02 - Chlef", "06 - Béjaïa", "09 - Blida", "16 - Alger", 
  "19 - Sétif", "23 - Annaba", "25 - Constantine", "31 - Oran", "35 - Boumerdès"
];

interface FileGroup {
  id: string;
  name: string;
  files: Array<{ name: string; size: number; id: string; url: string }>;
}

interface TranslationDemand {
  title: string;
  sourceLang: string;
  targetLang: string;
  description: string;
  deadline: string;
  serviceLevel: 'Standard' | 'Express' | 'Urgent';
  deliveryMode: 'digital' | 'physical';
  wilaya?: string;
  commune?: string;
  adresse?: string;
  batiment?: string;
  etage?: string;
  appartement?: string;
  groups: FileGroup[];
}

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className, ...props }: any) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/10",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-slate-500 hover:text-slate-900",
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-xl px-8 py-3.5 font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50",
        variants[variant as keyof typeof variants],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const PageWrapper = ({ children, className }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={cn("w-full max-w-5xl mx-auto", className)}
  >
    {children}
  </motion.div>
);

const SidebarItem = ({ icon: Icon, label, active = false }: any) => (
  <button className={cn(
    "sidebar-link",
    active && "sidebar-link-active"
  )}>
    <Icon size={20} className={active ? "text-primary" : "text-slate-400"} />
    <span className="text-sm">{label}</span>
  </button>
);

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-between py-8 relative max-w-3xl mx-auto mb-10">
    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
    {[
      { step: 1, label: "Détails du document" },
      { step: 2, label: "Télécharger des fichiers" },
      { step: 3, label: "Réviser et soumettre" }
    ].map((item) => (
      <div key={item.step} className="relative z-10 flex flex-col items-center gap-3 bg-[#F8FAFC] px-4">
        <div className={cn(
          "step-bubble",
          currentStep >= item.step ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-slate-200 text-slate-400"
        )}>
          {currentStep > item.step ? <Check size={18} /> : item.step}
        </div>
        <span className={cn(
          "text-[10px] font-bold text-center transition-colors max-w-[100px]",
          currentStep === item.step ? "text-slate-900" : "text-slate-400"
        )}>
          {item.label}
        </span>
      </div>
    ))}
  </div>
);

// --- Content Components ---

const SuccessModal = ({ onDashboard, onRequests }: { onDashboard: () => void; onRequests: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
  >
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] w-full max-w-md p-10 text-center shadow-2xl"
    >
      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
        >
          <Check size={32} />
        </motion.div>
      </div>
      
      <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
        Demande envoyée avec succès !
      </h2>
      <p className="text-slate-500 mb-8 text-sm leading-relaxed">
        Votre demande a été transmise à <strong>Amine Rahmani</strong>. Vous recevrez une confirmation par e-mail sous peu.
      </p>
      
      <div className="bg-slate-50 rounded-xl px-4 py-3 mb-8 border border-slate-100 inline-block font-mono text-xs text-slate-500 font-bold tracking-widest">
        Réf. WG-{new Date().getFullYear()}-{Math.floor(10000 + Math.random() * 90000)}
      </div>
      
      <div className="space-y-3">
        <Button onClick={onDashboard} className="w-full">
          Retour au tableau de bord <ArrowRight size={16} className="ml-2 inline" />
        </Button>
        <button onClick={onRequests} className="w-full text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest py-2">
          Voir mes demandes
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const DocumentGroup = ({ group, onUpdate, onRemove }: { group: FileGroup; onUpdate: (g: FileGroup) => void; onRemove: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const addFilesToGroup = (newFiles: File[]) => {
    const validFiles = newFiles.filter(f => f.size <= 15 * 1024 * 1024);
    const mapped = validFiles.map(f => ({
      name: f.name,
      size: Math.round(f.size / 1024),
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(f)
    }));
    onUpdate({ ...group, files: [...group.files, ...mapped] });
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-[1.5rem] p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
            <Plus size={20} />
          </div>
          <input 
            value={group.name} 
            onChange={(e) => onUpdate({ ...group, name: e.target.value })}
            className="text-base font-bold text-slate-800 bg-transparent border-none outline-none focus:ring-0 px-0 w-full"
            placeholder="Nom du groupe..."
          />
        </div>
        <button onClick={onRemove} className="text-slate-300 hover:text-red-500 transition-colors">
          <Trash2 size={18} />
        </button>
      </div>

      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-slate-100 rounded-2xl p-8 mb-4 hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
      >
         <Upload size={24} className="text-slate-400" />
         <p className="text-sm font-bold text-slate-800">Déposez vos fichiers ici ou parcourir</p>
         <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">PDF, JPG, PNG, DOCX MAX 15MB</p>
         <input ref={inputRef} type="file" multiple hidden onChange={(e) => e.target.files && addFilesToGroup(Array.from(e.target.files))} />
      </div>

      <div className="space-y-2">
        {group.files.map((file) => (
          <div key={file.id} 
            onClick={() => window.open(file.url, '_blank')}
            className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl hover:bg-slate-50 cursor-pointer transition-all border border-transparent hover:border-slate-100 group/file"
          >
            <div className="flex items-center gap-3">
              <FileText size={16} className="text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-700">{file.name}</p>
                <p className="text-[10px] font-medium text-slate-400">{file.size} Ko</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ExternalLink size={14} className="text-slate-300 group-hover/file:text-primary transition-colors" />
              <button onClick={(e) => { e.stopPropagation(); onUpdate({ ...group, files: group.files.filter(f => f.id !== file.id) }); }} className="text-slate-300 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [groups, setGroups] = useState<FileGroup[]>([{ id: '1', name: 'Document 1', files: [] }]);
  const [formData, setFormData] = useState<Partial<TranslationDemand>>({
    serviceLevel: 'Standard',
    deliveryMode: 'digital'
  });

  const updateFormData = (fields: Partial<TranslationDemand>) => setFormData(prev => ({ ...prev, ...fields }));

  const renderStepDetails = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8 bg-white p-10 rounded-[1.5rem] shadow-sm border border-slate-200/60">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Titre du document <span className="text-red-500">*</span></label>
          <input 
            value={formData.title || ''} 
            onChange={e => updateFormData({ title: e.target.value })} 
            className="auth-input" 
            placeholder="Titre du projet" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Langue source <span className="text-red-500">*</span></label>
            <select value={formData.sourceLang || ''} onChange={e => updateFormData({ sourceLang: e.target.value })} className="auth-input">
              <option value="">Sélectionner la langue source</option>
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
              <option value="Arabe">Arabe</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Langue cible <span className="text-red-500">*</span></label>
            <select value={formData.targetLang || ''} onChange={e => updateFormData({ targetLang: e.target.value })} className="auth-input">
              <option value="">Sélectionner la langue cible</option>
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
              <option value="Arabe">Arabe</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700">Description</label>
          <textarea 
            value={formData.description || ''} 
            onChange={e => updateFormData({ description: e.target.value })} 
            className="auth-input min-h-[120px] py-4" 
            placeholder="Entrez la description du projet..." 
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-2 max-w-sm">
            <label className="text-xs font-bold text-slate-700">Date limite</label>
            <input 
              type="date" 
              value={formData.deadline || ''} 
              onChange={e => updateFormData({ deadline: e.target.value })} 
              className="auth-input" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Star size={18} className="text-amber-500 fill-amber-500/20" />
              <label className="text-sm font-black text-slate-900">Niveau de service <span className="text-red-500">*</span></label>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-4">
              {[
                {
                  id: 'Standard',
                  icon: Clock,
                  title: 'Standard',
                  duration: '7-20 jours ouvrés',
                  price: 'Tarif de base',
                  desc: 'Délai d\'exécution standard, meilleur rapport qualité-prix.',
                  color: 'emerald'
                },
                {
                  id: 'Express',
                  icon: Zap,
                  title: 'Express',
                  duration: '3-7 jours ouvrés',
                  price: '+30% du tarif',
                  desc: 'Délai réduit, priorité élevée pour les urgences modérées.',
                  color: 'amber'
                },
                {
                  id: 'Urgent',
                  icon: AlertTriangle,
                  title: 'Urgent',
                  duration: '24-72 heures',
                  price: '+60% du tarif',
                  desc: 'Attention immédiate, traduction prioritaire absolue.',
                  color: 'rose'
                }
              ].map((level) => {
                const Icon = level.icon;
                const isActive = formData.serviceLevel === level.id;
                
                const colorClasses = {
                  emerald: isActive ? 'border-emerald-500 bg-emerald-50/50' : 'hover:border-emerald-200 hover:bg-emerald-50/20 shadow-emerald-500/5',
                  amber: isActive ? 'border-amber-500 bg-amber-50/50' : 'hover:border-amber-200 hover:bg-amber-50/20 shadow-amber-500/5',
                  rose: isActive ? 'border-rose-500 bg-rose-50/50' : 'hover:border-rose-200 hover:bg-rose-50/20 shadow-rose-500/5',
                };

                const iconClasses = {
                  emerald: 'bg-emerald-100 text-emerald-600',
                  amber: 'bg-amber-100 text-amber-600',
                  rose: 'bg-rose-100 text-rose-600',
                };

                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => updateFormData({ serviceLevel: level.id as any })}
                    className={cn(
                      "relative flex flex-col text-left p-6 rounded-2xl border-2 transition-all duration-300 group shadow-sm",
                      colorClasses[level.color as keyof typeof colorClasses],
                      isActive ? "scale-[1.02] shadow-md z-10" : "border-slate-100 bg-white"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                      iconClasses[level.color as keyof typeof iconClasses]
                    )}>
                      <Icon size={20} />
                    </div>
                    
                    <h4 className="text-base font-black text-slate-900 mb-1">{level.title}</h4>
                    <p className="text-[11px] font-bold text-slate-500 mb-0.5">{level.duration}</p>
                    <p className={cn(
                      "text-[11px] font-black uppercase tracking-wider mb-4 pb-4 border-b border-dashed",
                      level.color === 'emerald' ? 'text-emerald-700 border-emerald-100' : 
                      level.color === 'amber' ? 'text-amber-700 border-amber-100' : 'text-rose-700 border-rose-100'
                    )}>
                      {level.price}
                    </p>
                    
                    <p className="text-[10px] leading-relaxed text-slate-400 font-medium">{level.desc}</p>
                    
                    {isActive && (
                      <div className={cn(
                        "absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-white",
                        level.color === 'emerald' ? 'bg-emerald-500' : level.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                      )}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-6">
          <label className="text-xs font-bold text-slate-700">Mode de livraison</label>
          <div className="flex gap-4">
            <button 
              onClick={() => updateFormData({ deliveryMode: 'digital' })}
              className={cn(
                "flex-1 p-4 rounded-xl border flex items-center justify-center gap-3 transition-all",
                formData.deliveryMode === 'digital' ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-400"
              )}
            >
              <Monitor size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Numérique</span>
            </button>
            <button 
              onClick={() => updateFormData({ deliveryMode: 'physical' })}
              className={cn(
                "flex-1 p-4 rounded-xl border flex items-center justify-center gap-3 transition-all",
                formData.deliveryMode === 'physical' ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-400"
              )}
            >
              <MapPin size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Physique</span>
            </button>
          </div>

          <AnimatePresence>
            {formData.deliveryMode === 'physical' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-6 pt-4 border-t border-slate-100">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">Wilaya <span className="text-red-500">*</span></label>
                     <select value={formData.wilaya || ''} onChange={e => updateFormData({ wilaya: e.target.value })} className="auth-input">
                       <option value="">Sélectionner</option>
                       {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">Commune <span className="text-red-500">*</span></label>
                     <input value={formData.commune || ''} onChange={e => updateFormData({ commune: e.target.value })} placeholder="Ex: El Biar" className="auth-input" />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-700">Adresse complète <span className="text-red-500">*</span></label>
                   <input value={formData.adresse || ''} onChange={e => updateFormData({ adresse: e.target.value })} placeholder="N° Rue, Nom du quartier" className="auth-input" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">Bâtiment</label>
                     <input value={formData.batiment || ''} onChange={e => updateFormData({ batiment: e.target.value })} placeholder="Ex: B" className="auth-input" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">Etage</label>
                     <input value={formData.etage || ''} onChange={e => updateFormData({ etage: e.target.value })} placeholder="Ex: 3" className="auth-input" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700">N° d'hébergement</label>
                     <input value={formData.appartement || ''} onChange={e => updateFormData({ appartement: e.target.value })} placeholder="Ex: 12" className="auth-input" />
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-slate-50">
        <Button onClick={() => setStep(2)}>Suivant : Télécharger <ArrowRight size={16} className="ml-2 inline" /></Button>
      </div>
    </motion.div>
  );

  const renderStepDocuments = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <div className="bg-primary/5 rounded-[1.5rem] p-6 mb-8 flex items-start gap-4 border border-primary/10">
        <Info size={24} className="text-primary shrink-0" />
        <div>
          <p className="text-slate-900 font-bold mb-1">Organisez vos fichiers en groupes</p>
          <p className="text-xs text-slate-500 leading-relaxed">Organisez vos fichiers en groupes — ex: 'Contrat', 'Annexes'. Chaque groupe est traduit séparément.</p>
        </div>
      </div>

      {groups.map(g => (
        <DocumentGroup 
          key={g.id} 
          group={g} 
          onUpdate={u => setGroups(prev => prev.map(item => item.id === u.id ? u : item))} 
          onRemove={() => groups.length > 1 && setGroups(prev => prev.filter(item => item.id !== g.id))} 
        />
      ))}

      <button 
        onClick={() => setGroups([...groups, { id: Math.random().toString(36).substr(2, 9), name: `Nouveau groupe`, files: [] }])}
        className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center gap-3 text-slate-400 hover:border-primary-light hover:text-primary transition-all font-bold text-xs uppercase tracking-widest"
      >
        <Plus size={20} /> Ajouter un groupe de documents
      </button>

      <div className="flex justify-between items-center pt-12">
        <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors">
          <ArrowLeft size={16} /> Retour
        </button>
        <Button onClick={() => setStep(3)}>Réviser et confirmer <ArrowRight size={16} className="ml-2 inline" /></Button>
      </div>
    </motion.div>
  );

  const renderStepConfirm = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
       <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200/60 shadow-sm">
             <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full overflow-hidden mb-4 ring-4 ring-primary/5">
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-black">AR</div>
                </div>
                <h3 className="font-black text-slate-900 mb-1">Amine Rahmani</h3>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-4">Traducteur sélectionné</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="bg-primary/5 text-primary text-[10px] font-black uppercase px-2.5 py-1 rounded">Certifié officiel</span>
                  <span className="bg-amber-50 text-amber-600 text-[10px] font-black uppercase px-2.5 py-1 rounded">4.9/5 Rating</span>
                </div>
             </div>
          </div>

          <div className="md:col-span-2 space-y-6">
             <div className="bg-white p-10 rounded-[1.5rem] border border-slate-200/60 shadow-sm">
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
                   <h2 className="text-xl font-black text-slate-900">Récapitulatif de la commande</h2>
                   <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase">{formData.serviceLevel}</div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 mb-10 text-xs">
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1.5">Projet</p>
                     <p className="font-bold text-slate-800">{formData.title}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1.5">Langues</p>
                     <div className="flex items-center gap-2 font-bold text-slate-800">
                       <span>{formData.sourceLang}</span>
                       <ArrowRight size={14} className="text-primary" />
                       <span>{formData.targetLang}</span>
                     </div>
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1.5">Livraison</p>
                     <p className="font-bold text-slate-800">
                       {formData.deliveryMode === 'digital' ? 'Téléchargement numérique' : `Physique — ${formData.wilaya}, ${formData.commune}`}
                     </p>
                     {formData.deliveryMode === 'physical' && (
                       <p className="text-[10px] text-slate-400 mt-0.5">{formData.adresse} • Bât {formData.batiment}, Et {formData.etage}, Apt {formData.appartement}</p>
                     )}
                   </div>
                   <div>
                     <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1.5">Date limite</p>
                     <p className="font-bold text-slate-800">{formData.deadline || 'Non définie'}</p>
                   </div>
                </div>

                <div className="space-y-4 mb-10">
                   <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Documents joints</p>
                   <div className="grid grid-cols-2 gap-3">
                     {groups.map(g => (
                       <div key={g.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                         <Briefcase size={16} className="text-primary" />
                         <span className="text-[11px] font-bold text-slate-700 truncate">{g.name}</span>
                         <span className="ml-auto text-[10px] text-slate-300">{g.files.length} doc</span>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="p-1 bg-[#232323] rounded-2xl flex items-center">
                   <div className="flex-1 px-8 py-3">
                     <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em] mb-0.5">Estimation totale</p>
                     <p className="text-xl font-black text-white tracking-widest">6 000 DA</p>
                   </div>
                   <div className="h-full px-8 py-3 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-r-2xl flex items-center">{formData.serviceLevel}</div>
                </div>
             </div>

             <div className="bg-amber-50 rounded-[1.5rem] p-6 border border-amber-100 flex gap-4">
                <Shield size={20} className="text-amber-500 shrink-0" />
                <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
                  En confirmant, vous autorisez le traducteur à accéder à vos documents. <strong>Le paiement sera requis avant le début.</strong>
                </p>
             </div>
          </div>
       </div>

       <div className="flex justify-between items-center pt-8">
          <button onClick={() => setStep(2)} className="flex items-center gap-2 text-slate-400 font-bold hover:text-slate-900 transition-colors">
            <ArrowLeft size={16} /> Retour
          </button>
          <Button onClick={() => setShowSuccess(true)}>Confirmer la demande <Check size={16} className="ml-2 inline" /></Button>
       </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex text-slate-900">
      {/* Sidebar - Matching screenshot */}
      <aside className="w-72 border-r border-slate-200 bg-white shrink-0 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
               <Globe className="text-primary" size={24} />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">WASSLAGO™</span>
          </div>

          <button className="w-full bg-primary text-white p-4 rounded-xl flex items-center gap-3 font-bold text-sm tracking-tight mb-10 hover:bg-primary-dark transition-all">
             <Plus size={20} />
             <span>Nouvelle traduction</span>
          </button>

          <nav className="space-y-1">
            <SidebarItem icon={Home} label="Tableau de bord" active />
            <SidebarItem icon={Users} label="Traducteurs" />
            <SidebarItem icon={FileText} label="Demandes" />
            <SidebarItem icon={CreditCard} label="Factures" />
            <SidebarItem icon={MessageSquare} label="Messages" />
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-slate-100">
          <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest px-4 mb-4">Support</p>
          <SidebarItem icon={HelpCircle} label="Support" />
          
          <div className="mt-8 p-4 bg-slate-50/80 rounded-2xl flex items-center justify-between">
             <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black shrink-0">C</div>
                <div className="overflow-hidden">
                   <p className="text-xs font-black truncate">CHERAITIA SARA</p>
                   <p className="text-[10px] text-slate-400 font-medium">Client</p>
                </div>
             </div>
             <button className="text-slate-300 hover:text-red-500 transition-colors ml-2">
                <LogOut size={16} />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header - Matching screenshot */}
        <header className="px-10 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between border-b border-slate-200">
           <h2 className="text-xl font-black text-slate-800">Bienvenue <span className="text-primary uppercase">CHERAITIA</span> 👋</h2>
           <div className="flex items-center gap-6">
              <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 border border-slate-200 transition-all shadow-sm">
                <Bell size={18} />
              </button>
              <button className="text-[10px] font-black text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">FR</button>
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white ring-4 ring-orange-500/10 shadow-lg">
                <span className="font-bold text-sm">C</span>
              </div>
           </div>
        </header>

        <div className="p-12 max-w-6xl mx-auto w-full">
           <button className="flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors font-bold text-xs uppercase tracking-widest mb-8">
              <ArrowLeft size={14} /> Back to Profile
           </button>

           <div className="mb-12">
              <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Hire Amine Rahmani</h1>
              <p className="text-slate-400 font-medium tracking-tight">Complete the form below to request translation services</p>
           </div>

           <div className="bg-[#F8FAFC]/50 p-2 rounded-[2rem]">
              <StepIndicator currentStep={step} />
              
              <PageWrapper className="pt-2">
                 <AnimatePresence mode="wait">
                    {step === 1 && renderStepDetails()}
                    {step === 2 && renderStepDocuments()}
                    {step === 3 && renderStepConfirm()}
                 </AnimatePresence>
              </PageWrapper>
           </div>
        </div>
      </main>

      {showSuccess && <SuccessModal onDashboard={() => setShowSuccess(false)} onRequests={() => setShowSuccess(false)} />}
    </div>
  );
}
