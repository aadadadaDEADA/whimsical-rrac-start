import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import { updateProductStock } from '@/utils/stockManagement';
import { submitOrder } from '@/services/orderSubmissionApi';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { clearCart, cartItems, hasNewsletterDiscount, calculateTotal } = useCart();
  const { toast } = useToast();
  const { subtotal, discount: newsletterDiscount, total } = calculateTotal();
  const shipping = subtotal > 500 ? 0 : 7;
  const finalTotal = total + shipping;

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      try {
        // Get pending order from sessionStorage
        const pendingOrderString = sessionStorage.getItem('pendingOrder');
        if (pendingOrderString) {
          const pendingOrder = JSON.parse(pendingOrderString);
          console.log('Processing pending order:', pendingOrder);
          
          // Update stock
          await updateProductStock(pendingOrder.cartItems);

          // Format items with personalization
          const formattedItems = pendingOrder.cartItems.map((item: any) => ({
            id: item.id,
            name: item.personalization 
              ? `${item.name} (Personnalisation = ${item.personalization})`
              : item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            size: item.size || '-',
            color: item.color || '-',
            personalization: item.personalization || '-'
          }));

          // Get user details from sessionStorage
          const userDetails = JSON.parse(sessionStorage.getItem('userDetails') || '{}');

          // Prepare order submission data
          const orderData = {
            order_id: pendingOrder.orderId,
            user_details: {
              first_name: userDetails.firstName,
              last_name: userDetails.lastName,
              email: userDetails.email,
              phone: userDetails.phone,
              address: userDetails.address,
              country: userDetails.country,
              zip_code: userDetails.zipCode
            },
            items: formattedItems,
            price_details: {
              subtotal,
              shipping_cost: shipping,
              has_newsletter_discount: hasNewsletterDiscount,
              newsletter_discount_amount: newsletterDiscount,
              final_total: finalTotal
            },
            payment: {
              method: 'card',
              status: 'completed',
              konnect_payment_url: pendingOrder.payUrl || '-',
              completed_at: new Date().toISOString()
            },
            order_status: {
              status: 'not yet',
              shipped_at: '-',
              delivered_at: '-'
            }
          };

          // Submit order
          await submitOrder(orderData);
          
          // Clear pending order
          sessionStorage.removeItem('pendingOrder');
        }

        // Clear the cart and show success message
        clearCart();
        toast({
          title: "Paiement réussi !",
          description: "Votre commande a été confirmée et sera traitée dans les plus brefs délais.",
          variant: "default",
        });
      } catch (error) {
        console.error('Error processing payment success:', error);
        toast({
          title: "Attention",
          description: "Commande confirmée mais une erreur est survenue lors de la mise à jour du stock.",
          variant: "destructive",
        });
      }
    };

    handlePaymentSuccess();
  }, [clearCart, toast, hasNewsletterDiscount, subtotal, newsletterDiscount, finalTotal]);

  return (
    <div className="min-h-screen bg-[#F1F0FB] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="bg-white/80 backdrop-blur-md p-8 rounded-lg shadow-lg text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>
        <h1 className="text-2xl font-serif text-[#1A1F2C] mb-4">
          Paiement réussi !
        </h1>
        <p className="text-gray-600 mb-6">
          Votre commande a été confirmée et sera traitée dans les plus brefs délais.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-[#700100] text-white px-6 py-3 rounded-md hover:bg-[#591C1C] transition-colors"
        >
          Retour à l'accueil
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;