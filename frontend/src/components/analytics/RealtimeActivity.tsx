import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Star, 
  MessageSquare, 
  UserPlus, 
  Building,
  Clock
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'user_registered' | 'review_submitted' | 'lead_generated' | 'provider_joined';
  user: string;
  description: string;
  timestamp: Date;
  metadata?: any;
}

export default function RealtimeActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      type: 'review_submitted',
      user: 'João Silva',
      description: 'deixou uma avaliação de 5 estrelas para Solar Solutions Inc',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      metadata: { rating: 5, provider: 'Solar Solutions Inc' }
    },
    {
      id: '2',
      type: 'lead_generated',
      user: 'Maria Santos',
      description: 'solicitou orçamento para projeto residencial',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      metadata: { projectType: 'Residencial' }
    },
    {
      id: '3',
      type: 'user_registered',
      user: 'Carlos Oliveira',
      description: 'se cadastrou como consumidor',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      metadata: { userType: 'Consumer' }
    },
    {
      id: '4',
      type: 'provider_joined',
      user: 'EcoEnergy Brasil',
      description: 'se cadastrou como fornecedor',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      metadata: { userType: 'Provider' }
    },
    {
      id: '5',
      type: 'review_submitted',
      user: 'Ana Costa',
      description: 'deixou uma avaliação de 4 estrelas para EcoEnergy Brasil',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      metadata: { rating: 4, provider: 'EcoEnergy Brasil' }
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: ['user_registered', 'review_submitted', 'lead_generated', 'provider_joined'][
          Math.floor(Math.random() * 4)
        ] as Activity['type'],
        user: ['Pedro Lima', 'Ana Silva', 'Roberto Santos', 'Lucia Oliveira'][
          Math.floor(Math.random() * 4)
        ],
        description: 'nova atividade simulada',
        timestamp: new Date(),
      };

      // Customize description based on type
      switch (newActivity.type) {
        case 'user_registered':
          newActivity.description = 'se cadastrou como consumidor';
          break;
        case 'review_submitted':
          newActivity.description = 'deixou uma nova avaliação';
          newActivity.metadata = { rating: Math.floor(Math.random() * 2) + 4 };
          break;
        case 'lead_generated':
          newActivity.description = 'solicitou orçamento';
          break;
        case 'provider_joined':
          newActivity.description = 'se cadastrou como fornecedor';
          break;
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 10000); // New activity every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'user_registered':
        return User;
      case 'review_submitted':
        return Star;
      case 'lead_generated':
        return MessageSquare;
      case 'provider_joined':
        return Building;
      default:
        return User;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'user_registered':
        return 'bg-blue-500';
      case 'review_submitted':
        return 'bg-yellow-500';
      case 'lead_generated':
        return 'bg-green-500';
      case 'provider_joined':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Atividade em Tempo Real</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Ao vivo</span>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`${colorClass} p-2 rounded-full flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    {activity.description}
                  </p>
                  
                  {activity.metadata && (
                    <div className="mt-1">
                      {activity.metadata.rating && (
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < activity.metadata.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {activity.metadata.projectType && (
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-1">
                          {activity.metadata.projectType}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-500 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}