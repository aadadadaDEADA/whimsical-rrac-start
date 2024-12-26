import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Check, ShoppingBag } from "lucide-react";

interface ProductOptionsProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onAddToCart: () => void;
  stock?: number;
  availableSizes: string[];
}

const ProductOptions = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  quantity,
  setQuantity,
  onAddToCart,
  stock = 1,
  availableSizes,
}: ProductOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold text-gray-900">Couleur</Label>
          <span className="text-sm font-medium text-gray-600">{selectedColor}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold text-gray-900">
            Taille {selectedSize ? `sélectionnée: ${selectedSize}` : ''}
          </Label>
          <button className="text-xs text-[#700100] hover:underline">
            Guide des tailles
          </button>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 text-sm font-medium rounded-md transition-all duration-200
                ${selectedSize === size 
                  ? 'bg-[#700100] text-white shadow-md transform scale-105' 
                  : 'bg-white border border-gray-200 text-gray-900 hover:border-[#700100] hover:bg-gray-50'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-base font-semibold text-gray-900">Quantité</Label>
          <span className="text-sm font-medium text-gray-600">{stock} disponible</span>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-9 w-9 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100] transition-all"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-10 text-center text-lg font-semibold text-black">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(stock, quantity + 1))}
            className="h-9 w-9 rounded-md border-2 border-gray-200 hover:border-[#700100] hover:text-[#700100] transition-all"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        onClick={onAddToCart}
        className="w-full h-12 bg-[#700100] hover:bg-[#5a0100] text-white text-lg font-medium transition-all duration-300 rounded-md mt-3"
        disabled={stock === 0}
      >
        <ShoppingBag className="mr-2 h-5 w-5" />
        {stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
      </Button>

      <div className="space-y-1.5 text-sm font-medium text-gray-600 mt-3">
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#700100]"></span>
          Livraison gratuite en Tunisie
        </p>
        <p className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#700100]"></span>
          Retour sous 30 jours
        </p>
      </div>
    </div>
  );
};

export default ProductOptions;