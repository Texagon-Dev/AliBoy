const supabase = require('../utilities/supabase');
const User = require('../models/bookPrintingOrder');

async function book_printing_orders(req, res) {
  const { story_book_id , uuid, binding_name , title_size , quantity , country , city_region , delivery_address , postal_code , item_total , discount , shipping_amount , payment_method , order_status } = req.body;

  try {
    
    // Insert data into users table with encrypted password
    const { data: user, error } = await supabase
      .from('Book_Printing_Orders')
      .insert([{ story_book_id: story_book_id, uuid: uuid, binding_name: binding_name, title_size: title_size, quantity: quantity , country: country , city_region: city_region , delivery_address: delivery_address , postal_code: postal_code , item_total: item_total ,discount: discount , shipping_amount , shipping_amount , payment_method: payment_method}]);

    if (error) throw error;

    res.status(201).json({ message: 'Book Printing Order Successfully ' });
  } catch (error) {
    console.error('Error Printing Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { book_printing_orders };