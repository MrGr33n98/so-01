import { Provider, Review, Lead, Service, Brand, Certification } from '../types';

export const mockServices: Service[] = [
  { id: '1', name: 'Instalação Residencial', category: 'installation' },
  { id: '2', name: 'Instalação Comercial', category: 'installation' },
  { id: '3', name: 'Instalação Industrial', category: 'installation' },
  { id: '4', name: 'Manutenção Preventiva', category: 'maintenance' },
  { id: '5', name: 'Consultoria Energética', category: 'consulting' },
  { id: '6', name: 'Financiamento Solar', category: 'financing' },
];

export const mockBrands: Brand[] = [
  { id: '1', name: 'Canadian Solar', category: 'panels' },
  { id: '2', name: 'Trina Solar', category: 'panels' },
  { id: '3', name: 'JinkoSolar', category: 'panels' },
  { id: '4', name: 'SMA', category: 'inverters' },
  { id: '5', name: 'Fronius', category: 'inverters' },
  { id: '6', name: 'WEG', category: 'inverters' },
];

export const mockCertifications: Certification[] = [
  { id: '1', name: 'CRESESB', issuer: 'Centro de Referência em Energia Solar', verified: true },
  { id: '2', name: 'ABGD', issuer: 'Associação Brasileira de Energia Solar', verified: true },
  { id: '3', name: 'INMETRO', issuer: 'Instituto Nacional de Metrologia', verified: true },
];

export const mockProviders: Provider[] = [
  {
    id: '1',
    userId: '2',
    companyName: 'Solar Solutions Inc',
    description: 'Especialistas em energia solar residencial e comercial com mais de 10 anos de experiência. Oferecemos soluções completas desde o projeto até a instalação e manutenção.',
    website: 'https://solarsolutions.com.br',
    serviceAreas: ['São Paulo', 'Campinas', 'Santos'],
    certifications: mockCertifications.slice(0, 2),
    services: mockServices.slice(0, 4),
    brands: mockBrands.slice(0, 4),
    gallery: [
      {
        id: '1',
        type: 'image',
        url: 'https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Instalação Residencial - Casa 150m²',
        description: 'Sistema de 10kWp com 30 painéis Canadian Solar',
        projectType: 'Residencial',
      },
      {
        id: '2',
        type: 'image',
        url: 'https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Projeto Comercial - Empresa de TI',
        description: 'Sistema de 50kWp para redução de 90% na conta de luz',
        projectType: 'Comercial',
      },
    ],
    contactInfo: {
      email: 'contato@solarsolutions.com.br',
      phone: '(11) 99999-9999',
      address: 'Rua das Palmeiras, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      coordinates: { lat: -23.5505, lng: -46.6333 },
    },
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    planType: 'premium',
    createdAt: new Date('2022-01-15'),
  },
  {
    id: '2',
    userId: '4',
    companyName: 'EcoEnergy Brasil',
    description: 'Pioneiros em energia renovável no Brasil. Focamos em soluções sustentáveis e tecnologia de ponta para maximizar a economia dos nossos clientes.',
    website: 'https://ecoenergy.com.br',
    serviceAreas: ['Rio de Janeiro', 'Niterói', 'Petrópolis'],
    certifications: mockCertifications,
    services: mockServices,
    brands: mockBrands.slice(2, 6),
    gallery: [
      {
        id: '3',
        type: 'image',
        url: 'https://images.pexels.com/photos/9875424/pexels-photo-9875424.jpeg?auto=compress&cs=tinysrgb&w=800',
        title: 'Fazenda Solar - 500kWp',
        description: 'Maior projeto rural da região, economia de R$ 50.000/mês',
        projectType: 'Rural',
      },
    ],
    contactInfo: {
      email: 'vendas@ecoenergy.com.br',
      phone: '(21) 88888-8888',
      address: 'Av. Atlântica, 456',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22021-001',
      coordinates: { lat: -22.9068, lng: -43.1729 },
    },
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    planType: 'enterprise',
    createdAt: new Date('2021-03-10'),
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    providerId: '1',
    consumerId: '3',
    consumerName: 'João Silva',
    rating: 5,
    title: 'Excelente serviço, superou expectativas!',
    content: 'A equipe da Solar Solutions foi muito profissional. A instalação foi rápida e limpa, e o sistema está gerando mais energia do que prometido. Recomendo!',
    photos: [
      'https://images.pexels.com/photos/9875425/pexels-photo-9875425.jpeg?auto=compress&cs=tinysrgb&w=400',
    ],
    projectType: 'Residencial',
    verificationStatus: 'approved',
    providerResponse: 'Muito obrigado pelo feedback, João! Foi um prazer trabalhar com você.',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    providerId: '1',
    consumerId: '5',
    consumerName: 'Maria Santos',
    rating: 4,
    title: 'Bom custo-benefício',
    content: 'Serviço de qualidade, apenas demorou um pouco mais que o previsto para a instalação.',
    photos: [],
    projectType: 'Residencial',
    verificationStatus: 'pending',
    createdAt: new Date('2024-01-20'),
  },
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    providerId: '1',
    consumerName: 'Carlos Oliveira',
    consumerEmail: 'carlos@email.com',
    consumerPhone: '(11) 77777-7777',
    projectType: 'Residencial',
    message: 'Gostaria de um orçamento para instalação solar em casa de 200m². Consumo médio de R$ 800/mês.',
    status: 'new',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '2',
    providerId: '1',
    consumerName: 'Ana Costa',
    consumerEmail: 'ana@empresa.com',
    consumerPhone: '(11) 66666-6666',
    projectType: 'Comercial',
    message: 'Preciso de orçamento para empresa com consumo de 2000kWh/mês.',
    status: 'contacted',
    createdAt: new Date('2024-01-22'),
  },
];