import React, { useState } from 'react';
import { 
  Users, 
  Building, 
  Star, 
  MessageSquare, 
  TrendingUp, 
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from '../../components/common/StarRating';
import { mockProviders, mockReviews } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [reviewFilter, setReviewFilter] = useState('pending');

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

  const stats = [
    {
      label: 'Fornecedores Ativos',
      value: mockProviders.length,
      icon: Building,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      label: 'Total de Usuários',
      value: '1,234',
      icon: Users,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      label: 'Avaliações Pendentes',
      value: mockReviews.filter(r => r.verificationStatus === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+3',
    },
    {
      label: 'Avaliações Aprovadas',
      value: mockReviews.filter(r => r.verificationStatus === 'approved').length,
      icon: CheckCircle,
      color: 'bg-teal-500',
      change: '+15',
    },
  ];

  const filteredReviews = mockReviews.filter(review => {
    if (reviewFilter === 'all') return true;
    return review.verificationStatus === reviewFilter;
  });

  const handleReviewAction = (reviewId: string, action: 'approve' | 'reject') => {
    // In a real app, this would make an API call to update the review status
    alert(`Review ${action === 'approve' ? 'aprovada' : 'rejeitada'} com sucesso!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600 mt-1">Gerencie fornecedores, usuários e avaliações</p>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'reviews', label: 'Moderação de Avaliações' },
              { id: 'providers', label: 'Fornecedores' },
              { id: 'users', label: 'Usuários' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Providers */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Fornecedores Recentes
                </h3>
                <div className="space-y-4">
                  {mockProviders.slice(0, 3).map((provider) => (
                    <div key={provider.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {provider.companyName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{provider.companyName}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(provider.createdAt).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {provider.verified && (
                          <Shield className="w-4 h-4 text-green-600" />
                        )}
                        <StarRating rating={provider.rating} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Reviews */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Avaliações Pendentes
                </h3>
                <div className="space-y-4">
                  {mockReviews
                    .filter(r => r.verificationStatus === 'pending')
                    .slice(0, 3)
                    .map((review) => (
                    <div key={review.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{review.consumerName}</p>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Pendente
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{review.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600 mb-6">
                Visualize métricas detalhadas, gráficos interativos e insights em tempo real sobre a performance da plataforma.
              </p>
              <button
                onClick={() => window.open('/admin/analytics', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg"
              >
                Abrir Analytics Completo
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Moderação de Avaliações</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Filtrar por status:</span>
                  <select
                    value={reviewFilter}
                    onChange={(e) => setReviewFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">Todas</option>
                    <option value="pending">Pendentes</option>
                    <option value="approved">Aprovadas</option>
                    <option value="rejected">Rejeitadas</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {review.consumerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{review.consumerName}</h3>
                        <div className="flex items-center space-x-2">
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-sm text-gray-600">
                            {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        review.verificationStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : review.verificationStatus === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {review.verificationStatus === 'pending' && 'Pendente'}
                        {review.verificationStatus === 'approved' && 'Aprovada'}
                        {review.verificationStatus === 'rejected' && 'Rejeitada'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
                    <p className="text-gray-600">{review.content}</p>
                  </div>

                  {review.photos.length > 0 && (
                    <div className="flex space-x-3 mb-4">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt="Foto da avaliação"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      Projeto: <span className="font-medium">{review.projectType}</span>
                    </div>
                    
                    {review.verificationStatus === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReviewAction(review.id, 'reject')}
                          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors flex items-center"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Rejeitar
                        </button>
                        <button
                          onClick={() => handleReviewAction(review.id, 'approve')}
                          className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aprovar
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'providers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Fornecedores</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Empresa</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Avaliação</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Plano</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProviders.map((provider) => (
                      <tr key={provider.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {provider.companyName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{provider.companyName}</p>
                              <p className="text-sm text-gray-600">{provider.contactInfo.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <StarRating rating={provider.rating} size="sm" />
                            <span className="text-sm text-gray-600">({provider.reviewCount})</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            provider.verified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {provider.verified ? 'Verificado' : 'Pendente'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="capitalize text-sm text-gray-900 font-medium">
                            {provider.planType}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 p-1">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700 p-1">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-1">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Usuários</h2>
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4" />
              <p>Funcionalidade de gerenciamento de usuários em desenvolvimento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}