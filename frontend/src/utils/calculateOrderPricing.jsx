export default function calculateOrderPricing(order) {
	const unitPrice = 0.4;

  const discountPrice = order.discount
	const shippingPrice = order.shipping_amount
	const quantity = Number(order.quantity);
	const subTotal = (quantity * unitPrice).toFixed(2);
    
  const grandTotal = (subTotal - discountPrice + shippingPrice).toFixed(2);

	return {
		unitPrice,
		discountPrice,
    shippingPrice,
    subTotal,
    grandTotal,
	}
}