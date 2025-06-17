import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Shield, 
  Award,
  Image,
  MessageCircle,
  Send,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from '../../components/common/StarRating';
import { mockProviders, mockReviews } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function ProviderProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  const provider = mockProviders.find(p => p.id === id);
  const providerReviews = mockReviews.filter(r => r.providerId === id && r.verificationStatus === 'approved');

  if (!provider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fornecedor não encontrado</h2>
          <Link to="/providers" className="text-blue-600 hover:text-blue-700">
            Voltar para fornecedores
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === provider.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? provider.gallery.length - 1 : prev - 1
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the lead to the backend
    alert('Mensagem enviada com sucesso! O fornecedor entrará em contato em breve.');
    setContactMessage('');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {provider.companyName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{provider.companyName}</h1>
                  {provider.verified && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Verificado
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <StarRating rating={provider.rating} size="sm" />
                    <span className="ml-2 text-sm">
                      {provider.rating} ({provider.reviewCount} avaliações)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{provider.serviceAreas.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg"
              >
                Solicitar Orçamento
              </button>
              {provider.website && (
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Visão Geral' },
              { id: 'gallery', label: 'Portfólio' },
              { id: 'reviews', label: 'Avaliações' },
              { id: 'contact', label: 'Contato' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre a Empresa</h2>
                  <p className="text-gray-600 leading-relaxed">{provider.description}</p>
                </div>

                {/* Services */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Serviços</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {provider.services.map((service) => (
                      <div
                        key={service.id}
                        className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {service.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Marcas Parceiras</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {provider.brands.map((brand) => (
                      <div
                        key={brand.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center"
                      >
                        <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                        <div className="text-xs text-gray-500 capitalize">{brand.category}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Certificações</h2>
                  <div className="space-y-3">
                    {provider.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Award className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{cert.name}</div>
                            <div className="text-sm text-gray-600">{cert.issuer}</div>
                          </div>
                        </div>
                        {cert.verified && (
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Verificado
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfólio de Projetos</h2>
                
                {provider.gallery.length > 0 ? (
                  <div className="space-y-6">
                    {/* Main Image */}
                    <div className="relative">
                      <img
                        src={provider.gallery[currentImageIndex].url}
                        alt={provider.gallery[currentImageIndex].title}
                        className="w-full h-96 object-cover rounded-lg"
                      />
                      
                      {provider.gallery.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Image Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {provider.gallery[currentImageIndex].title}
                      </h3>
                      {provider.gallery[currentImageIndex].description && (
                        <p className="text-gray-600 mb-2">
                          {provider.gallery[currentImageIndex].description}
                        </p>
                      )}
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {provider.gallery[currentImageIndex].projectType}
                      </span>
                    </div>

                    {/* Thumbnails */}
                    {provider.gallery.length > 1 && (
                      <div className="flex space-x-3 overflow-x-auto pb-2">
                        {provider.gallery.map((item, index) => (
                          <button
                            key={item.id}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                              index === currentImageIndex
                                ? 'border-blue-500'
                                : 'border-gray-200'
                            }`}
                          >
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Image className="w-12 h-12 mx-auto mb-4" />
                    <p>Nenhuma imagem disponível no portfólio</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {providerReviews.length > 0 ? (
                  providerReviews.map((review) => (
                    <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-sm">
                              {review.consumerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{review.consumerName}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" />
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                      <p className="text-gray-600 mb-4">{review.content}</p>
                      
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
                      
                      <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                        {review.projectType}
                      </div>
                      
                      {review.providerResponse && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <MessageCircle className="w-4 h-4 text-gray-600" />
                            <span className="font-medium text-gray-900">Resposta da empresa:</span>
                          </div>
                          <p className="text-gray-600">{review.providerResponse}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhuma avaliação ainda
                    </h3>
                    <p className="text-gray-600">
                      Seja o primeiro a avaliar este fornecedor!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Entre em Contato</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900">{provider.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-900">{provider.contactInfo.email}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div className="text-gray-900">
                        <div>{provider.contactInfo.address}</div>
                        <div>{provider.contactInfo.city}, {provider.contactInfo.state}</div>
                        <div>{provider.contactInfo.zipCode}</div>
                      </div>
                    </div>
                    {provider.website && (
                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-blue-600" />
                        <a
                          href={provider.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {provider.website}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all shadow-lg"
                    >
                      Solicitar Orçamento
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Rápidas</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Avaliação Média</div>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={provider.rating} size="sm" />
                    <span className="font-semibold">{provider.rating}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total de Avaliações</div>
                  <div className="font-semibold">{provider.reviewCount}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Áreas de Atendimento</div>
                  <div className="flex flex-wrap gap-2">
                    {provider.serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Plano</div>
                  <div className="font-semibold capitalize">{provider.planType}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600 mb-1">Membro desde</div>
                  <div className="font-semibold">
                    {new Date(provider.createdAt).toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Solicitar Orçamento - {provider.companyName}
            </h3>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Projeto
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecione</option>
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descreva seu projeto e necessidades..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}