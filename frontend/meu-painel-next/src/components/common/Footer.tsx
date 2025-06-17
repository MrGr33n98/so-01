import React from 'react';
import { Sun, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SolarHub</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A maior plataforma de energia solar do Brasil. Conectamos consumidores a fornecedores confiáveis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Plataforma */}
          <div>
            <h3 className="font-semibold mb-4">Plataforma</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/providers" className="hover:text-white transition-colors">Encontrar Fornecedores</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categorias</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Avaliações</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Comparar</Link></li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div>
            <h3 className="font-semibold mb-4">Para Empresas</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/register?role=provider" className="hover:text-white transition-colors">Cadastrar Empresa</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Planos</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Recursos</Link></li>
              <li><Link to="/success-stories" className="hover:text-white transition-colors">Cases de Sucesso</Link></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/help" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacidade</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 SolarHub. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Transformando o Brasil com energia solar
          </p>
        </div>
      </div>
    </footer>
  );
}