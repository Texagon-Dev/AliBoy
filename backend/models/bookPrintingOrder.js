// models/userProfile.js

// Define the UserProfile model
class StoryBookPrinting {
    constructor(story_book_id , uuid, binding_name , title_size , quantity , country , city_region , delivery_address , postal_code , item_total , discount , shipping_amount , payment_method , order_status) {
        this.story_book_id = story_book_id;
        this.uuid = uuid;
        this.binding_name = binding_name;
        this.title_size = title_size;
        this.quantity = quantity;
        this.country = country;
        this.city_region = city_region;
        this.delivery_address = delivery_address;
        this.postal_code = postal_code;
        this.item_total = item_total;
        this.discount = discount;
        this.shipping_amount = shipping_amount;
        this.payment_method = payment_method;
 
    }

    // Method to convert UserProfile instance to JSON object
    // toJSON() {
    //     return {
    //         email: this.email,
    //         fullname: this.fullname,
    //         dob: this.dob
    //     };
    // }
}

module.exports = StoryBookPrinting;
