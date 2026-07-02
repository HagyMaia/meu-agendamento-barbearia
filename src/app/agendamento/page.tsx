"use client";
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function Agendamento() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // Estado alinhado com as colunas reais: 'start_time' em vez de 'date'
  const [formData, setFormData] = useState({ name: '', service_id: '', start_time: '' });

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase.from('services').select('id, name, price');
      if (error) {
        console.error("Erro ao buscar serviços:", error);
      } else {
        setServices(data || []);
      }
    }
    fetchServices();
  }, []);

  const handleAgendar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mapeamento exato para as colunas existentes na sua tabela 'appointments'
    const novoAgendamento = {
      client_name: formData.name,      
      service_id: formData.service_id, 
      start_time: formData.start_time
    };

    const { error } = await supabase.from('appointments').insert([novoAgendamento]);

    if (error) {
      console.error("Erro ao inserir no Supabase:", error);
      alert("Erro ao agendar: " + error.message);
    } else {
      alert("Agendado com sucesso!");
      // Limpeza do formulário usando o estado correto
      setFormData({ name: '', service_id: '', start_time: '' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100 text-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Agende seu corte</h1>
      <form onSubmit={handleAgendar} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">Seu Nome</label>
          <input 
            required
            className="w-full mt-1 p-3 border rounded-lg" 
            placeholder="Ex: João Silva"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Serviço</label>
          <select 
            required
            className="w-full mt-1 p-3 border rounded-lg" 
            onChange={(e) => setFormData({...formData, service_id: e.target.value})}
            value={formData.service_id}
          >
            <option value="">Selecione um serviço</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.name} - R${s.price}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Data e Hora</label>
          <input 
            required
            type="datetime-local" 
            className="w-full mt-1 p-3 border rounded-lg" 
            value={formData.start_time}
            onChange={(e) => setFormData({...formData, start_time: e.target.value})} 
          />
        </div>
        <button 
          disabled={loading} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition-all"
        >
          {loading ? "Processando..." : "Confirmar Agendamento"}
        </button>
      </form>
    </div>
  );
}