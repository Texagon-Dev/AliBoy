create table
  public.users (
    created_at timestamp with time zone not null default now(),
    uuid uuid not null,
    email character varying not null,
    metadata jsonb null default '[]'::jsonb,
    constraint customer_pkey primary key (uuid),
    constraint customer_uuid_fkey foreign key (uuid) references auth.users (id) on delete cascade
  ) tablespace pg_default;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public."customer" ("uuid", "email", "metadata")
  values (new.id, new.email, new.raw_user_meta_data);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

CREATE TABLE "User_Story_Books" (
    story_book_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL,
    story_name VARCHAR NOT NULL,
    pdf_path VARCHAR DEFAULT NULL,
    tags VARCHAR NOT NULL,
    story_picture VARCHAR DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uuid) REFERENCES "users"(uuid)
);


CREATE TABLE "Book_Printing_Orders" (
    printing_id SERIAL PRIMARY KEY ,
    story_book_id INTEGER NOT NULL,
    uuid UUID NOT NULL,
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
    order_status VARCHAR DEFAULT 'Pending', -- Default value set to 'Pending'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uuid) REFERENCES "users"(uuid),
    FOREIGN KEY (story_book_id) REFERENCES "User_Story_Books"(story_book_id)
);
