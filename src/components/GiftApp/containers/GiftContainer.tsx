import React from 'react';
import { Product } from '@/types/product';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GiftContainerProps {
  items: Product[];
  maxItems: number;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  containerTitle: string;
  className?: string;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
}

const GiftContainer = ({
  items,
  maxItems,
  onDrop,
  containerTitle,
  className = "",
  onItemClick,
  onRemoveItem
}: GiftContainerProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (items.length < maxItems) {
      e.preventDefault();
    }
  };

  return (
    <div className={className}>
      <div className="p-4">
        <h3 className="text-lg font-medium text-[#6D0201] mb-3">{containerTitle}</h3>
        <div
          onDrop={onDrop}
          onDragOver={handleDragOver}
          className={`grid grid-cols-${maxItems} gap-4 h-[calc(100%-2rem)] overflow-y-auto`}
        >
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div
                onClick={() => onItemClick?.(item)}
                className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-full aspect-square rounded-md overflow-hidden bg-gray-50 mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-sm text-[#6D0201]">
                  {item.price} TND
                </div>
              </div>
              {onRemoveItem && (
                <button
                  onClick={() => onRemoveItem(index)}
                  className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  aria-label="Retirer l'article"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </motion.div>
          ))}
          {items.length < maxItems && (
            <div className="border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500 h-full">
              Glissez un article ici
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GiftContainer;