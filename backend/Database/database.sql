CREATE TABLE "Users" (
    user_id VARCHAR PRIMARY KEY,
    users_email VARCHAR NOT NULL,
    users_password VARCHAR NOT NULL,
    last_login TIMESTAMP
   
);

CREATE TABLE "Users_Profile" (
    user_id VARCHAR PRIMARY KEY,
    full_name VARCHAR NOT NULL,
    dob TIMESTAMP NOT NULL,
    profile_picture VARCHAR DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);

CREATE TABLE "User_Story_Books" (
    story_book_id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    story_name VARCHAR NOT NULL,
    pdf_path VARCHAR DEFAULT NULL,
    tags VARCHAR NOT NULL,
    story_picture VARCHAR DEFAULT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "Users"(user_id)
);

CREATE TABLE "Book_Printing_Orders" (
    printing_id SERIAL PRIMARY KEY,
    story_book_id INTEGER NOT NULL,
    user_id VARCHAR NOT NULL,
    binding_name VARCHAR NOT NULL,
    title_size VARCHAR NOT NULL,
    quantity INTEGER NOT NULL,
    country VARCHAR NOT NULL,
    city_region VARCHAR NOT NULL,
    delivery_address VARCHAR NOT NULL,
    postal_code VARCHAR NOT NULL,
    item_total FLOAT NOT NULL,
    discount FLOAT NOT NULL,
    shipping_amount FLOAT NOT NULL,
    payment_method VARCHAR NOT NULL,
    order_status VARCHAR DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES "Users"(user_id),
    FOREIGN KEY (story_book_id) REFERENCES "User_Story_Books"(story_book_id)
);
