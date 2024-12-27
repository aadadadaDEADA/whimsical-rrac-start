import React from 'react';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product, size: string, personalization: string) => void;
}

const ProductSelectionPanel: React.FC<ProductSelectionPanelProps> = ({ onItemDrop }) => {
  const products: Product[] = [
    {
      id: 1,
      name: "T-shirt Personnalisé",
      material: "Coton",
      color: "Blanc",
      price: 25,
      image: "/images/products/tshirt1.jpg",
      image2: "/images/products/tshirt1_2.jpg",
      image3: "/images/products/tshirt1_3.jpg",
      image4: "/images/products/tshirt1_4.jpg",
      description: "T-shirt en coton 100% avec impression personnalisée.",
      status: "available",
      reference: "TSHIRT001",
      itemGroup: "T-shirts",
      relatedProducts: "T-shirt 2, T-shirt 3",
      colorProduct: "Blanc",
      sizes: {
        xs: 10,
        s: 20,
        m: 30,
        l: 40,
        xl: 50,
        xxl: 60,
      },
      quantity: 100,
      type_product: "vêtement",
      category_product: "t-shirts",
      itemgroup_product: "vêtements",
      size: undefined,
      personalization: undefined,
    },
    {
      id: 2,
      name: "Sweat à Capuche Personnalisé",
      material: "Polyester",
      color: "Noir",
      price: 45,
      image: "/images/products/sweat1.jpg",
      image2: "/images/products/sweat1_2.jpg",
      image3: "/images/products/sweat1_3.jpg",
      image4: "/images/products/sweat1_4.jpg",
      description: "Sweat à capuche en polyester avec impression personnalisée.",
      status: "available",
      reference: "SWEAT001",
      itemGroup: "Sweats",
      relatedProducts: "Sweat 2, Sweat 3",
      colorProduct: "Noir",
      sizes: {
        xs: 5,
        s: 15,
        m: 25,
        l: 35,
        xl: 45,
        xxl: 55,
      },
      quantity: 80,
      type_product: "vêtement",
      category_product: "sweats",
      itemgroup_product: "vêtements",
      size: undefined,
      personalization: undefined,
    },
    // Add more products as needed
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    e.dataTransfer.setData('product', JSON.stringify(product));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <h2 className="text-xl font-serif text-[#700100] mb-4">Articles Disponibles</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            draggable
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, product)}
            className="bg-white rounded-xl shadow-sm p-4 cursor-move border border-gray-50 hover:shadow-md transition-all transform hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-2"
              />
              <DragHandleDots2Icon className="absolute top-2 right-2 w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
            <p className="text-sm text-[#700100] font-semibold mt-1">{product.price} TND</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelectionPanel;
