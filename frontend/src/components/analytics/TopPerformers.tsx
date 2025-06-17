import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, Award } from 'lucide-react';
import StarRating from '../common/StarRating';

interface TopPerformer {
  id: string;
  name: string;
  metric: string;
  value: number;
  change: string;
  avatar?: string;
  badge?: string;
}

interface TopPerformersProps {
  title: string;
  performers: TopPerformer[];
  type: 'providers' | 'reviews' | 'leads';
}

export default function TopPerformers({ title, performers, type }: TopPerformersProps) {
  const getIcon = () => {
    switch (type) {
      case 'providers':
        return Award;
      case 'reviews':
        return Star;
      case 'leads':
        return Users;
      default:
        return TrendingUp;
    }
  };

  const Icon = getIcon();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4">
        {performers.map((performer, index) => (
          <motion.div
            key={performer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full text-white font-bold text-sm">
                {index + 1}
              </div>
              
              <div className="flex items-center space-x-3">
                {performer.avatar ? (
                  <img
                    src={performer.avatar}
                    alt={performer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {performer.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    {performer.badge && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {performer.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{performer.metric}</p>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                {type === 'providers' && typeof performer.value === 'number' && performer.value <= 5 ? (
                  <StarRating rating={performer.value} size="sm" />
                ) : (
                  <span className="text-lg font-bold text-gray-900">{performer.value}</span>
                )}
              </div>
              <span className="text-sm text-green-600 font-medium">{performer.change}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}