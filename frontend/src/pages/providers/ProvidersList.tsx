import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Filter, Star, Shield, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import StarRating from '../../components/common/StarRating';
import { mockProviders, mockServices, mockBrands } from '../../data/mockData';

export default function ProvidersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  // Filter providers based on current filters
  const filteredProviders = useMemo(() => {
    let filtered = mockProviders.filter(provider => {
      // Search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (!provider.companyName.toLowerCase().includes(searchLower) &&
            !provider.description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Location filter
      if (location) {
        const locationLower = location.toLowerCase();
        if (!provider.serviceAreas.some(area => 
          area.toLowerCase().includes(locationLower)
        )) {
          return false;
        }
      }

      // Services filter
      if (selectedServices.length > 0) {
        const providerServiceIds = provider.services.map(s => s.id);
        if (!selectedServices.some(serviceId => 
          providerServiceIds.includes(serviceId)
        )) {
          return false;
        }
      }

      // Brands filter
      if (selectedBrands.length > 0) {
        const providerBrandIds = provider.brands.map(b => b.id);
        if (!selectedBrands.some(brandId => 
          providerBrandIds.includes(brandId)
        )) {
          return false;
        }
      }

      // Rating filter
      if (provider.rating < minRating) {
        return false;
      }

      // Verified filter
      if (onlyVerified && !provider.verified) {
        return false;
      }

      return true;
    });

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'name':
          return a.companyName.localeCompare(b.companyName);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, location, selectedServices, selectedBrands, minRating, onlyVerified, sortBy]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocation('');
    setSelectedServices([]);
    setSelectedBrands([]);
    setMinRating(0);
    setOnlyVerified(false);
    setSortBy('rating');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar fornecedores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Location */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Localização"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtros
              <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Services Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Serviços</h3>
                  <div className="space-y-2">
                    {mockServices.slice(0, 4).map((service) => (
                      <label key={service.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedServices.includes(service.id)}
                          onChange={() => handleServiceToggle(service.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{service.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Marcas</h3>
                  <div className="space-y-2">
                    {mockBrands.slice(0, 4).map((brand) => (
                      <label key={brand.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.id)}
                          onChange={() => handleBrandToggle(brand.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Avaliação Mínima</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="minRating"
                          value={rating}
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <div className="ml-2 flex items-center">
                          <StarRating rating={rating} size="sm" />
                          <span className="ml-1 text-sm text-gray-700">& acima</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Other Filters */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Outros</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={onlyVerified}
                        onChange={(e) => setOnlyVerified(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 flex items-center">
                        <Shield className="w-4 h-4 text-green-600 mr-1" />
                        Apenas verificados
                      </span>
                    </label>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Limpar filtros
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Fornecedores de Energia Solar
            </h1>
            <p className="text-gray-600 mt-1">
              {filteredProviders.length} fornecedores encontrados
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">Melhor avaliação</option>
              <option value="reviews">Mais avaliações</option>
              <option value="name">Nome A-Z</option>
              <option value="newest">Mais recentes</option>
            </select>
          </div>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          {provider.companyName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {provider.companyName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <StarRating rating={provider.rating} size="sm" />
                          <span className="text-sm text-gray-600">
                            ({provider.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                    {provider.verified && (
                      <div className="bg-green-100 text-green-800 p-1 rounded-full">
                        <Shield className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {provider.description}
                  </p>

                  {/* Service Areas */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.serviceAreas.slice(0, 2).map((area) => (
                      <span
                        key={area}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {area}
                      </span>
                    ))}
                    {provider.serviceAreas.length > 2 && (
                      <span className="text-gray-500 text-xs">
                        +{provider.serviceAreas.length - 2} mais
                      </span>
                    )}
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {provider.services.slice(0, 3).map((service) => (
                      <span
                        key={service.id}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {service.name}
                      </span>
                    ))}
                    {provider.services.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{provider.services.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      Membro desde {new Date(provider.createdAt).toLocaleDateString('pt-BR', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <Link
                      to={`/providers/${provider.id}`}
                      className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-teal-700 transition-all"
                    >
                      Ver Perfil
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm p-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Nenhum fornecedor encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar seus filtros ou termos de busca
              </p>
              <button
                onClick={clearFilters}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}