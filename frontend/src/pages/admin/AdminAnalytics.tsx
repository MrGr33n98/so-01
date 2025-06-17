import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Building, 
  Star, 
  MessageSquare, 
  DollarSign,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import MetricCard from '../../components/analytics/MetricCard';
import SimpleChart from '../../components/analytics/SimpleChart';
import TopPerformers from '../../components/analytics/TopPerformers';
import RealtimeActivity from '../../components/analytics/RealtimeActivity';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminAnalytics() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h2>
          <p className="text-gray-600">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Simulate export functionality
    alert('Relatório exportado com sucesso!');
  };

  // Mock analytics data
  const metrics = [
    {
      title: 'Usuários Ativos',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'bg-blue-500',
      subtitle: 'Últimos 30 dias'
    },
    {
      title: 'Fornecedores Verificados',
      value: '156',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Building,
      color: 'bg-green-500',
      subtitle: 'Total verificado'
    },
    {
      title: 'Avaliações Aprovadas',
      value: '1,234',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Star,
      color: 'bg-yellow-500',
      subtitle: 'Este mês'
    },
    {
      title: 'Leads Gerados',
      value: '892',
      change: '+22.1%',
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: 'bg-purple-500',
      subtitle: 'Últimos 30 dias'
    },
    {
      title: 'Taxa de Conversão',
      value: '18.5%',
      change: '+2.3%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'bg-teal-500',
      subtitle: 'Lead para contato'
    },
    {
      title: 'Receita Estimada',
      value: 'R$ 45.2K',
      change: '+18.7%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'bg-orange-500',
      subtitle: 'Comissões mensais'
    }
  ];

  const userGrowthData = [
    { label: 'Jan', value: 1200 },
    { label: 'Fev', value: 1450 },
    { label: 'Mar', value: 1680 },
    { label: 'Abr', value: 1920 },
    { label: 'Mai', value: 2150 },
    { label: 'Jun', value: 2380 },
    { label: 'Jul', value: 2650 },
    { label: 'Ago', value: 2847 }
  ];

  const leadsData = [
    { label: 'Residencial', value: 450, color: 'bg-blue-500' },
    { label: 'Comercial', value: 280, color: 'bg-green-500' },
    { label: 'Industrial', value: 120, color: 'bg-yellow-500' },
    { label: 'Rural', value: 42, color: 'bg-purple-500' }
  ];

  const reviewsData = [
    { label: '5 Estrelas', value: 680, color: '#10B981' },
    { label: '4 Estrelas', value: 320, color: '#3B82F6' },
    { label: '3 Estrelas', value: 180, color: '#F59E0B' },
    { label: '2 Estrelas', value: 42, color: '#EF4444' },
    { label: '1 Estrela', value: 12, color: '#6B7280' }
  ];

  const topProviders = [
    {
      id: '1',
      name: 'Solar Solutions Inc',
      metric: 'Avaliação média',
      value: 4.9,
      change: '+0.2',
      badge: 'Verificado'
    },
    {
      id: '2',
      name: 'EcoEnergy Brasil',
      metric: 'Avaliação média',
      value: 4.8,
      change: '+0.1',
      badge: 'Premium'
    },
    {
      id: '3',
      name: 'SunPower Tech',
      metric: 'Avaliação média',
      value: 4.7,
      change: '+0.3',
      badge: 'Verificado'
    },
    {
      id: '4',
      name: 'Green Energy Co',
      metric: 'Avaliação média',
      value: 4.6,
      change: '+0.1',
      badge: 'Básico'
    }
  ];

  const topReviewers = [
    {
      id: '1',
      name: 'João Silva',
      metric: 'Avaliações feitas',
      value: 12,
      change: '+3',
      badge: 'Ativo'
    },
    {
      id: '2',
      name: 'Maria Santos',
      metric: 'Avaliações feitas',
      value: 8,
      change: '+2',
      badge: 'Confiável'
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      metric: 'Avaliações feitas',
      value: 6,
      change: '+1',
      badge: 'Regular'
    }
  ];

  const leadGenerators = [
    {
      id: '1',
      name: 'Ana Costa',
      metric: 'Leads gerados',
      value: 15,
      change: '+5',
      badge: 'Ativo'
    },
    {
      id: '2',
      name: 'Pedro Lima',
      metric: 'Leads gerados',
      value: 12,
      change: '+3',
      badge: 'Regular'
    },
    {
      id: '3',
      name: 'Lucia Oliveira',
      metric: 'Leads gerados',
      value: 9,
      change: '+2',
      badge: 'Novo'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Insights detalhados sobre a performance da plataforma</p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              {/* Time Range Selector */}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7d">Últimos 7 dias</option>
                  <option value="30d">Últimos 30 dias</option>
                  <option value="90d">Últimos 90 dias</option>
                  <option value="1y">Último ano</option>
                </select>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Atualizar
                </button>
                
                <button
                  onClick={handleExport}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SimpleChart
              title="Crescimento de Usuários"
              data={userGrowthData}
              type="line"
              height={300}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SimpleChart
              title="Leads por Tipo de Projeto"
              data={leadsData}
              type="bar"
              height={300}
            />
          </motion.div>
        </div>

        {/* Reviews Distribution */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SimpleChart
              title="Distribuição de Avaliações"
              data={reviewsData}
              type="pie"
              height={400}
            />
          </motion.div>
        </div>

        {/* Top Performers and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TopPerformers
              title="Top Fornecedores"
              performers={topProviders}
              type="providers"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TopPerformers
              title="Usuários Mais Ativos"
              performers={topReviewers}
              type="reviews"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 xl:col-span-1"
          >
            <RealtimeActivity />
          </motion.div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <TopPerformers
              title="Maiores Geradores de Lead"
              performers={leadGenerators}
              type="leads"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Insights Rápidos</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Taxa de Aprovação de Reviews</p>
                  <p className="text-sm text-blue-700">Últimos 30 dias</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">94.2%</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Tempo Médio de Resposta</p>
                  <p className="text-sm text-green-700">Fornecedores para leads</p>
                </div>
                <div className="text-2xl font-bold text-green-600">2.4h</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-900">Satisfação Média</p>
                  <p className="text-sm text-yellow-700">Todas as avaliações</p>
                </div>
                <div className="text-2xl font-bold text-yellow-600">4.6/5</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Crescimento Mensal</p>
                  <p className="text-sm text-purple-700">Novos usuários</p>
                </div>
                <div className="text-2xl font-bold text-purple-600">+28%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}