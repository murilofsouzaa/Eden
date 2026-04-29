-- Sample data for Eden commerce platform

-- Users
INSERT INTO users (name, birth_day, gender, email, password, role, status, created_at) VALUES
	('Lara Costa', DATE '1995-04-12', 'FEMALE', 'lara.costa@eden.com',
	 '$2a$10$7EqJtq98hPqEX7fNZaFWoO7hU0E1Ee7dZpFPchGoCk6Qd8l4f7OWG', 'USER', 'ACTIVE', TIMESTAMP '2025-11-12 10:00:00'),
	('Diego Martins', DATE '1990-08-22', 'MALE', 'diego.martins@eden.com',
	 '$2a$10$wHDiJxJ6R9YvQ7a6YcM6Ze6eDu0k7O7h4N6LI8yOnl9Q7rE5dCJ3q', 'ADMIN', 'ACTIVE', TIMESTAMP '2025-10-05 09:15:00'),
	('Marina Lopes', DATE '1998-01-30', 'FEMALE', 'marina.lopes@eden.com',
	 '$2a$10$M31ZLLu4U9hsBqI5O8lVQe1t2BWM6WQTaE3HpZSnA8m4eCk2UXN0C', 'USER', 'INACTIVE', TIMESTAMP '2025-06-18 14:00:00');

-- Addresses
INSERT INTO address (user_id, street, number, neighborhood, city, state, country, zip_code) VALUES
	((SELECT id FROM users WHERE email = 'lara.costa@eden.com'), 'Rua das Palmeiras', 120, 'Jardins', 'São Paulo', 'SP', 'Brasil', '01425-000'),
	((SELECT id FROM users WHERE email = 'lara.costa@eden.com'), 'Av. Atlântica', 855, 'Copacabana', 'Rio de Janeiro', 'RJ', 'Brasil', '22010-000'),
	((SELECT id FROM users WHERE email = 'diego.martins@eden.com'), 'Rua Professor Jesuino Arruda', 45, 'Itaim Bibi', 'São Paulo', 'SP', 'Brasil', '04532-081'),
	((SELECT id FROM users WHERE email = 'marina.lopes@eden.com'), 'Rua da Consolação', 998, 'Consolação', 'São Paulo', 'SP', 'Brasil', '01302-907');

-- Order addresses (one per user due to the unique constraint)
INSERT INTO order_address (user_id, street, number, neighborhood, city, state, country, zip_code) VALUES
	((SELECT id FROM users WHERE email = 'lara.costa@eden.com'), 'Rua das Palmeiras', 120, 'Jardins', 'São Paulo', 'SP', 'Brasil', '01425-000'),
	((SELECT id FROM users WHERE email = 'diego.martins@eden.com'), 'Rua Professor Jesuino Arruda', 45, 'Itaim Bibi', 'São Paulo', 'SP', 'Brasil', '04532-081');

-- Products (image paths reference files inside frontend/public)
INSERT INTO product (title, description, image_url, created_at, updated_at) VALUES
	('Gymshark Black Compression Tee', 'Camiseta de compressão com tecido respirável para treinos intensos.',
	 'clothes/men/gymshark-black-compression-shirt-masculine.jpg', TIMESTAMP '2025-12-01 08:00:00', TIMESTAMP '2026-01-05 18:30:00'),
	('Gymshark Blue Oversized Hoodie', 'Moletom oversized azul marinho com toque macio e conforto térmico.',
	 'clothes/men/gymshark-blue-oversized-masculine.jpeg', TIMESTAMP '2025-11-25 11:15:00', NULL),
	('White Performance Joggers', 'Calça jogger branca com ajuste anatômico e bolsos com zíper.',
	 'clothes/men/white-pants-masculine.jpeg', TIMESTAMP '2025-10-10 09:40:00', TIMESTAMP '2025-12-20 16:20:00'),
	('Lima Flex Training Shorts', 'Shorts verde lima com tecido leve e elástico quadridirecional.',
	 'clothes/men/gymshark-green-shorts-masculine.jpeg', TIMESTAMP '2025-12-05 07:45:00', NULL),
	('Black Long Compression Shirt', 'Camiseta longa de compressão com recortes ergonômicos e toque frio.',
	 'clothes/men/black-long-compressed-shirt-masculine.jpeg', TIMESTAMP '2025-10-28 08:30:00', NULL),
	('Onyx Compression Long Tee', 'Modelo manga longa com suporte muscular gradiente e acabamento fosco.',
	 'clothes/men/gmyshark-black-long-compression-t-shirt-masculine.jpeg', TIMESTAMP '2025-11-08 09:10:00', NULL),
	('Carbon Compression Performance Tee', 'Camiseta justa com painel respirável e proteção UV 50.',
	 'clothes/men/gymshark-black-compression-t-shirt-masculine.jpeg', TIMESTAMP '2025-11-12 07:55:00', NULL),
	('Elite Compression Pro Top', 'Modelo elite com gola alongada, ajuste progressivo e detalhes refletivos.',
	 'clothes/men/gymshark-black-long-compression-shit-masculine-elite.jpeg', TIMESTAMP '2025-12-14 06:45:00', TIMESTAMP '2026-01-03 17:00:00'),
	('Gymshark Black Oversized Tee', 'Camiseta oversized preta com barra alongada e tecido de algodão premium.',
	 'clothes/men/gymshark-black-oversized-masculine.jpeg', TIMESTAMP '2025-11-02 12:15:00', NULL),
	('Shadow Pro Training Shorts', 'Short preto com painéis laterais perfurados e cordão embutido.',
	 'clothes/men/gymshark-black-short-masculine.jpeg', TIMESTAMP '2025-12-03 09:05:00', NULL),
	('Gymshark Green Oversized Tee', 'Camiseta oversized verde com malha de gramatura média.',
	 'clothes/men/gymshark-green-oversized-masculine.jpeg', TIMESTAMP '2025-11-18 10:25:00', NULL),
	('Plum Seamless Performance Tee', 'Camiseta seamless em tom ameixa com textura canelada e ventilação integrada.',
	 'clothes/men/gymshark-plum-brown-shirt-masculine.jpeg', TIMESTAMP '2025-10-22 08:40:00', NULL),
	('Arctic Court Shorts', 'Short branco com barras reforçadas e bolso invisível para chaves.',
	 'clothes/men/gymshark-white-shorts-masculine.jpeg', TIMESTAMP '2025-12-07 15:10:00', NULL),
	('White Performance Joggers Front View', 'Versão frontal dos joggers brancos destacando o ajuste cônico.',
	 'clothes/men/white-pants-masculine-front.jpeg', TIMESTAMP '2025-10-12 10:05:00', NULL),
	('Emerald Seamless Legging', 'Legging feminina seamless com compressão moderada e acabamento opaco.',
	 'clothes/women/gymshark-green-legging.jpeg', TIMESTAMP '2025-09-18 13:25:00', TIMESTAMP '2025-12-11 12:10:00'),
	('Cloudy Oversized Tee', 'Camiseta oversized feminina em algodão orgânico e barra desfiada.',
	 'clothes/women/gymshark-white-oversized-woman.jpeg', TIMESTAMP '2025-08-30 10:05:00', NULL),
	('Black Sculpt Seamless Set', 'Conjunto seamless preto com top suporte médio e legging cintura alta.',
	 'clothes/women/gymshar-black-set-women.jpeg', TIMESTAMP '2025-09-05 09:50:00', NULL),
	('Crimson Wine Pants (Back)', 'Visão traseira da calça vinho com recortes respiráveis e bolso interno.',
	 'clothes/women/gymshark,red-wine-pants-women-back.jpeg', TIMESTAMP '2025-09-07 11:00:00', NULL),
	('Midnight Sculpt Legging', 'Legging preta com compressão localizada e cintura dupla para suporte extra.',
	 'clothes/women/gymshark-black-legging.jpeg', TIMESTAMP '2025-09-12 08:05:00', NULL),
	('Blue Ocean Motion Legging', 'Legging azul oceano com acabamento gelado e recortes ondulados.',
	 'clothes/women/gymshark-blue-ocean-legging.jpeg', TIMESTAMP '2025-09-14 09:35:00', NULL),
	('Grey Studio Seamless Set', 'Conjunto cinza com textura jacquard e ventilação estratégica.',
	 'clothes/women/gymshark-grey-set-women.jpeg', TIMESTAMP '2025-09-20 12:00:00', NULL),
	('Red Wine Performance Pants', 'Calça vinho com corte fluido e abertura lateral para mobilidade.',
	 'clothes/women/gymshark-red-wine-pants-women.jpeg', TIMESTAMP '2025-09-22 13:10:00', NULL),
	('Brown Lounge Seamless Set', 'Conjunto marrom com malha acetinada e top de decote quadrado.',
	 'clothes/women/gymshark-set-brown-women.jpeg', TIMESTAMP '2025-09-24 14:25:00', NULL),
	('Black Oversized City Tee', 'Camiseta oversized feminina preta com logo discreto e ombro deslocado.',
	 'clothes/women/gymshark-woman-oversized-black.jpeg', TIMESTAMP '2025-08-28 16:15:00', NULL),
	('Prada Hydrate Bottle', 'Garrafa térmica em alumínio escovado com tampa rosqueável.',
	 'acessories/prada-water-bottle.jpeg', TIMESTAMP '2025-07-22 15:15:00', NULL);

UPDATE product
SET modeling = 'Oversized',
    weight = '190g/m²',
    material = '96% Algodão e 4% elastano';

-- Single default variant per product (can be expanded later)
INSERT INTO product_variant (product_id, sku, color, size, price, stock, category, gender, status, is_default) VALUES
	((SELECT id FROM product WHERE title = 'Gymshark Black Compression Tee'), 'SKU-0001', 'BLACK', 'M', 149.90, 35, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Black Compression Tee'), 'SKU-0001-L', 'BLACK', 'L', 149.90, 18, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', FALSE),
	((SELECT id FROM product WHERE title = 'Gymshark Blue Oversized Hoodie'), 'SKU-0002', 'NAVY', 'M', 279.50, 18, 'SWEATSHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Blue Oversized Hoodie'), 'SKU-0002-L', 'NAVY', 'L', 279.50, 10, 'SWEATSHIRTS', 'MASCULINE', 'AVAILABLE', FALSE),
	((SELECT id FROM product WHERE title = 'White Performance Joggers'), 'SKU-0003', 'WHITE', 'M', 229.00, 22, 'PANTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Lima Flex Training Shorts'), 'SKU-0004', 'LIME', 'M', 189.90, 40, 'SHORTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Black Long Compression Shirt'), 'SKU-0005', 'BLACK', 'M', 169.90, 27, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Onyx Compression Long Tee'), 'SKU-0006', 'ONYX', 'M', 189.90, 18, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Carbon Compression Performance Tee'), 'SKU-0007', 'CARBON', 'M', 179.90, 31, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Elite Compression Pro Top'), 'SKU-0008', 'BLACK', 'M', 199.90, 19, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Black Oversized Tee'), 'SKU-0009', 'BLACK', 'M', 219.90, 25, 'SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Shadow Pro Training Shorts'), 'SKU-0010', 'BLACK', 'M', 169.90, 34, 'SHORTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Green Oversized Tee'), 'SKU-0011', 'GREEN', 'M', 209.90, 21, 'SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Plum Seamless Performance Tee'), 'SKU-0012', 'PLUM', 'M', 189.90, 29, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Arctic Court Shorts'), 'SKU-0014', 'WHITE', 'M', 179.90, 26, 'SHORTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'White Performance Joggers Front View'), 'SKU-0015', 'WHITE', 'M', 229.00, 20, 'PANTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Emerald Seamless Legging'), 'SKU-0016', 'GREEN', 'S', 259.00, 28, 'LEGGING', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Cloudy Oversized Tee'), 'SKU-0017', 'WHITE', 'S', 199.90, 32, 'SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Black Sculpt Seamless Set'), 'SKU-0018', 'BLACK', 'S', 329.00, 24, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Crimson Wine Pants (Back)'), 'SKU-0019', 'CRIMSON', 'S', 239.00, 17, 'PANTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Midnight Sculpt Legging'), 'SKU-0020', 'BLACK', 'S', 249.00, 30, 'LEGGING', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Blue Ocean Motion Legging'), 'SKU-0021', 'BLUE', 'S', 259.00, 27, 'LEGGING', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Grey Studio Seamless Set'), 'SKU-0022', 'GREY', 'S', 319.00, 23, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Red Wine Performance Pants'), 'SKU-0023', 'RED', 'S', 239.00, 19, 'PANTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Brown Lounge Seamless Set'), 'SKU-0024', 'BROWN', 'S', 329.00, 21, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Black Oversized City Tee'), 'SKU-0025', 'BLACK', 'S', 209.00, 28, 'SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Prada Hydrate Bottle'), 'SKU-0026', 'STEEL', 'ONE', 129.00, 55, 'WATER_BOTTLE', 'UNISSEX', 'AVAILABLE', TRUE);

-- Mirror product main thumbnail into the gallery table
INSERT INTO product_image (product_id, url, is_main)
SELECT id, image_url, TRUE FROM product;

-- Shopping carts
INSERT INTO shopping_cart (user_id, status, created_at) VALUES
	((SELECT id FROM users WHERE email = 'lara.costa@eden.com'), true, TIMESTAMP '2026-01-10 08:15:00'),
	((SELECT id FROM users WHERE email = 'diego.martins@eden.com'), true, TIMESTAMP '2026-01-09 19:45:00'),
	((SELECT id FROM users WHERE email = 'marina.lopes@eden.com'), false, TIMESTAMP '2025-12-18 17:05:00');

-- Shopping cart items
INSERT INTO shopping_cart_item (cart_id, variant_id, quantity, unit_price) VALUES
	((SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'lara.costa@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Gymshark Black Compression Tee' AND pv.is_default = TRUE), 2, 149.90),
	((SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'lara.costa@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Prada Hydrate Bottle' AND pv.is_default = TRUE), 1, 129.00),
	((SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'diego.martins@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Gymshark Blue Oversized Hoodie' AND pv.is_default = TRUE), 1, 279.50),
	((SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'diego.martins@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'White Performance Joggers' AND pv.is_default = TRUE), 1, 229.00),
	((SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'marina.lopes@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Emerald Seamless Legging' AND pv.is_default = TRUE), 1, 259.00);

-- Orders (one per user because of the unique constraint on user_id)
INSERT INTO orders (user_id, shopping_cart_id, order_address_id, status, created_at) VALUES
	((SELECT id FROM users WHERE email = 'lara.costa@eden.com'),
	 (SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'lara.costa@eden.com')),
	 (SELECT id FROM order_address WHERE user_id = (SELECT id FROM users WHERE email = 'lara.costa@eden.com')),
	 'PAID', TIMESTAMP '2026-01-12 09:45:00'),
	((SELECT id FROM users WHERE email = 'diego.martins@eden.com'),
	 (SELECT id FROM shopping_cart WHERE user_id = (SELECT id FROM users WHERE email = 'diego.martins@eden.com')),
	 (SELECT id FROM order_address WHERE user_id = (SELECT id FROM users WHERE email = 'diego.martins@eden.com')),
	 'SHIPPED', TIMESTAMP '2026-01-11 14:20:00');

-- Order items
INSERT INTO order_item (order_id, variant_id, quantity, unit_price) VALUES
	((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'lara.costa@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Gymshark Black Compression Tee' AND pv.is_default = TRUE), 2, 149.90),
	((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'lara.costa@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Prada Hydrate Bottle' AND pv.is_default = TRUE), 1, 129.00),
	((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'diego.martins@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'Gymshark Blue Oversized Hoodie' AND pv.is_default = TRUE), 1, 279.50),
	((SELECT id FROM orders WHERE user_id = (SELECT id FROM users WHERE email = 'diego.martins@eden.com')),
	 (SELECT pv.id FROM product_variant pv JOIN product p ON p.id = pv.product_id WHERE p.title = 'White Performance Joggers' AND pv.is_default = TRUE), 1, 229.00);
