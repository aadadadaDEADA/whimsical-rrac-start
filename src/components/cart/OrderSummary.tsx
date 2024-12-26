import React from 'react';
import { CartItem } from './CartProvider';

interface OrderSummaryProps {
  total: number;
  shipping: number;
  finalTotal: number;
  userDetails: UserDetails | null;
  cartItems: CartItem[];
  onEditDetails?: () => void;
  onDeleteDetails?: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  total,
  shipping,
  finalTotal,
  userDetails,
  cartItems,
  onEditDetails,
  onDeleteDetails,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
      <div className="space-y-2">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} (x{item.quantity})</span>
            <span>{(item.price * item.quantity).toFixed(2)} TND</span>
          </div>
        ))}
      </div>
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between">
          <span>Sous-total</span>
          <span>{total.toFixed(2)} TND</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison</span>
          <span>{shipping.toFixed(2)} TND</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{finalTotal.toFixed(2)} TND</span>
        </div>
      </div>
      {userDetails && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Détails de l'utilisateur</h3>
          <p>{userDetails.first_name} {userDetails.last_name}</p>
          <p>{userDetails.email}</p>
          <p>{userDetails.phone}</p>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        {onEditDetails && (
          <button onClick={onEditDetails} className="text-blue-500 hover:underline">
            Modifier les détails
          </button>
        )}
        {onDeleteDetails && (
          <button onClick={onDeleteDetails} className="text-red-500 hover:underline">
            Supprimer les détails
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
