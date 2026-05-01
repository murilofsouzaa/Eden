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
	 'acessories/prada-water-bottle.jpeg', TIMESTAMP '2025-07-22 15:15:00', NULL),
	('Gym King Energy Linear Vest Black', 'Regata esportiva preta com recortes lineares e ajuste respirável.',
	 'clothes/men/30-04-26-Gym-King-Energy-Linear-Vest-Black.jpeg', TIMESTAMP '2026-04-30 08:00:00', NULL),
	('Gymshark Shark Hoodie Black', 'Moletom preto com capuz e visual streetwear para treino e uso casual.',
	 'clothes/men/30-04-26-Gymshark-Shark-Hoodie - Black.jpeg', TIMESTAMP '2026-04-30 08:10:00', NULL),
	('Gymshark Shark Hoodie White', 'Moletom branco com capuz, toque macio e caimento confortável.',
	 'clothes/men/30-04-26-Gymshark-Shark-Hoodie-white-man Black.jpeg', TIMESTAMP '2026-04-30 08:20:00', NULL),
	('Vital Collection Seamless Leggings Men', 'Legging masculina seamless com compressão leve e acabamento liso.',
	 'clothes/men/30-04-26-Man''s-Vital Collection-Seamless-Leggings.jpeg', TIMESTAMP '2026-04-30 08:30:00', NULL),
	('Mens Gym Tops and T Shirts Collection', 'Coleção de tops e camisetas masculinas com foco em performance.',
	 'clothes/men/30-04-26-Men''s-Gym-Tops-&-T-Shirts.jpeg', TIMESTAMP '2026-04-30 08:40:00', NULL),
	('Oxy Mass Muscle Black Tee', 'Camiseta preta com visual musculação e tecido de alta elasticidade.',
	 'clothes/men/30-04-26-Oxy-Mass-Muscle-Black.jpeg', TIMESTAMP '2026-04-30 08:50:00', NULL),
	('Gymshark Sports Fitness Releases', 'Imagem de lançamento com destaque para roupas esportivas e fitness.',
	 'clothes/men/30-04-26-The-Latest Sports-and Fitness-Clothing-Releases-with-Gymshark.jpeg', TIMESTAMP '2026-04-30 09:00:00', NULL),
	('Lifting Collection For Men Front View', 'Vista frontal de coleção de treino masculino com ajuste atlético.',
	 'clothes/men/30-04-26-front(1)-Lifting-Collection-For-Men.jpeg', TIMESTAMP '2026-04-30 09:10:00', NULL),
	('All Green Workout Outfits For Men', 'Conjunto masculino verde para treino com visual monocromático.',
	 'clothes/men/30-04-26All-Green-Workout-Outfits-For-Men.jpeg', TIMESTAMP '2026-04-30 09:20:00', NULL),
	('Conjunto Fitness Preto', 'Conjunto feminino preto com visual minimalista e ajuste confortável.',
	 'clothes/women/30-04-26(conjunto-1-preto.)jpeg', TIMESTAMP '2026-04-30 09:30:00', NULL),
	('Conjunto Fitness Rosa', 'Conjunto feminino rosa em duas peças com toque macio e elasticidade.',
	 'clothes/women/30-04-26(conjunto-1-rosa)-2-peças Conjunto-Ajuste Regular-Tecido-Absorvente-de-Umidade_Canelado-Gola-Redonda_Básico_Azul Marinho + -Conjunto-de-Roupas Esportivas-Sem Costura_Fitness_Yoga.jpeg', TIMESTAMP '2026-04-30 09:40:00', NULL),
	('Hyperflex 2 Cropped Tee Sky Blue', 'Camiseta cropped azul sky com modelagem leve para treino.',
	 'clothes/women/30-04-26(conjunto-2-azul)-Hyperflex-2-Cropped-Tee-Sky Blue.jpeg', TIMESTAMP '2026-04-30 09:50:00', NULL),
	('Hyperflex 2 Shorts Charcoal', 'Shorts charcoal com tecido flexível e cintura anatômica.',
	 'clothes/women/30-04-26(conjunto-2-cinza)-Hyperflex-2-Shorts-Charcoal.jpeg', TIMESTAMP '2026-04-30 10:00:00', NULL),
	('Gymshark Everyday Seamless Crop Tank Navy', 'Top cropped seamless azul-marinho com acabamento sem costura.',
	 'clothes/women/30-04-26-Gymshark-Everyday-Seamless-Crop-Tank-Navy.jpeg', TIMESTAMP '2026-04-30 10:10:00', NULL),
	('Gymshark Fraction Crop Tank Black', 'Top cropped preto com caimento extra ajustado e visual moderno.',
	 'clothes/women/30-04-26-Gymshark-Fraction-Crop-Tank-Black - Extra-Extra-Large.jpeg', TIMESTAMP '2026-04-30 10:20:00', NULL),
	('Pink Gym Sets and Workout Sets', 'Coleção de conjuntos rosa para academia e treino funcional.',
	 'clothes/women/30-04-26-Pink-Gym-Sets-&-Workout-Sets.jpeg', TIMESTAMP '2026-04-30 10:30:00', NULL),
	('Black Light Blue Seamless Set', 'Conjunto seamless preto com detalhes azul-claros para treino.',
	 'clothes/women/30-04-26-black-light-blue.jpeg', TIMESTAMP '2026-04-30 10:40:00', NULL),
	('White Training Shoes Feminine', 'Tênis branco feminino para treino com visual clean e leveza.',
	 'clothes/women/30-04-26female-shoes-white.jpeg', TIMESTAMP '2026-04-30 10:50:00', NULL),
	('Vital Long Sleeve Cut Out Top Black Marl', 'Top de manga longa preto mescla com recortes e estilo atlético.',
	 'clothes/women/30-40-26-Gymshark-Vital-Long-Sleeve-Cut-Out-Top-Black Marl.jpeg', TIMESTAMP '2026-04-30 11:00:00', NULL),
	('Gymshark Sports Top 30-04-26', 'Top esportivo feminino com suporte médio e tecido respirável.',
	 'clothes/women/sports-top-gymshark-30-04-26.jpeg', TIMESTAMP '2026-04-30 11:10:00', NULL),
	('Vuori Viewpoint Muscle Tank Navy', 'Regata Vuori com malha leve e respirável para alta performance.',
	 'clothes/men/01-05-26-(SET-vuori-set-blue-blackman)Viewpoint Muscle Tank – Navy – Vuori.jpeg', TIMESTAMP '2026-05-01 08:00:00', NULL),
	('Vuori Viewpoint Muscle Tank Sky Grey', 'Regata Vuori em sky grey com caimento atlético e toque leve.',
	 'clothes/men/01-05-26-(SET-vuori-set-white-whiteman)-Viewpoint Muscle-Tank–Sky Grey–Tanks–Vuori.jpeg', TIMESTAMP '2026-05-01 08:10:00', NULL),
	('Vuori Strato Muscle Tee Chambray Heather', 'Camiseta músculo Vuori em chambray heather com tecido stretch-knit.',
	 'clothes/men/01-05-26-Strato-Muscle-Tee – Chambray-Heather-Workout-Tank–Vuori.jpeg', TIMESTAMP '2026-05-01 08:20:00', NULL),
	('Black White Workout Set', 'Conjunto masculino preto e branco com visual clean e esportivo.',
	 'clothes/men/1-05-26-black-white.jpeg', TIMESTAMP '2026-05-01 08:30:00', NULL);

-- Update each product with unique characteristics
UPDATE product SET modeling = 'Fitted', weight = '185g/m²', material = '88% Poliéster, 12% Elastano' WHERE title = 'Gymshark Black Compression Tee';
UPDATE product SET modeling = 'Oversized', weight = '320g/m²', material = '85% Algodão, 15% Poliéster' WHERE title = 'Gymshark Blue Oversized Hoodie';
UPDATE product SET modeling = 'Fitted', weight = '240g/m²', material = '92% Algodão, 8% Elastano' WHERE title = 'White Performance Joggers';
UPDATE product SET modeling = 'Regular', weight = '180g/m²', material = '100% Poliéster' WHERE title = 'Lima Flex Training Shorts';
UPDATE product SET modeling = 'Fitted', weight = '190g/m²', material = '87% Poliéster, 13% Elastano' WHERE title = 'Black Long Compression Shirt';
UPDATE product SET modeling = 'Fitted', weight = '195g/m²', material = '90% Poliéster, 10% Elastano' WHERE title = 'Onyx Compression Long Tee';
UPDATE product SET modeling = 'Fitted', weight = '188g/m²', material = '86% Poliéster, 14% Elastano' WHERE title = 'Carbon Compression Performance Tee';
UPDATE product SET modeling = 'Fitted', weight = '192g/m²', material = '89% Poliéster, 11% Elastano' WHERE title = 'Elite Compression Pro Top';
UPDATE product SET modeling = 'Oversized', weight = '250g/m²', material = '100% Algodão' WHERE title = 'Gymshark Black Oversized Tee';
UPDATE product SET modeling = 'Regular', weight = '175g/m²', material = '98% Poliéster, 2% Elastano' WHERE title = 'Shadow Pro Training Shorts';
UPDATE product SET modeling = 'Oversized', weight = '260g/m²', material = '95% Algodão, 5% Poliéster' WHERE title = 'Gymshark Green Oversized Tee';
UPDATE product SET modeling = 'Fitted', weight = '210g/m²', material = '91% Nylon, 9% Elastano' WHERE title = 'Plum Seamless Performance Tee';
UPDATE product SET modeling = 'Regular', weight = '170g/m²', material = '100% Poliéster' WHERE title = 'Arctic Court Shorts';
UPDATE product SET modeling = 'Fitted', weight = '245g/m²', material = '93% Algodão, 7% Elastano' WHERE title = 'White Performance Joggers Front View';
UPDATE product SET modeling = 'Fitted', weight = '215g/m²', material = '88% Nylon, 12% Elastano' WHERE title = 'Emerald Seamless Legging';
UPDATE product SET modeling = 'Oversized', weight = '270g/m²', material = '100% Algodão Orgânico' WHERE title = 'Cloudy Oversized Tee';
UPDATE product SET modeling = 'Fitted', weight = '220g/m²', material = '82% Nylon, 18% Elastano' WHERE title = 'Black Sculpt Seamless Set';
UPDATE product SET modeling = 'Fitted', weight = '235g/m²', material = '87% Poliéster, 13% Elastano' WHERE title = 'Crimson Wine Pants (Back)';
UPDATE product SET modeling = 'Fitted', weight = '205g/m²', material = '85% Nylon, 15% Elastano' WHERE title = 'Midnight Sculpt Legging';
UPDATE product SET modeling = 'Fitted', weight = '218g/m²', material = '89% Nylon, 11% Elastano' WHERE title = 'Blue Ocean Motion Legging';
UPDATE product SET modeling = 'Fitted', weight = '225g/m²', material = '84% Nylon, 16% Elastano' WHERE title = 'Grey Studio Seamless Set';
UPDATE product SET modeling = 'Fitted', weight = '238g/m²', material = '90% Poliéster, 10% Elastano' WHERE title = 'Red Wine Performance Pants';
UPDATE product SET modeling = 'Fitted', weight = '228g/m²', material = '80% Nylon, 20% Elastano' WHERE title = 'Brown Lounge Seamless Set';
UPDATE product SET modeling = 'Oversized', weight = '280g/m²', material = '100% Algodão' WHERE title = 'Black Oversized City Tee';
UPDATE product SET modeling = 'One Size', weight = '450g', material = 'Alumínio Anodizado' WHERE title = 'Prada Hydrate Bottle';
UPDATE product SET modeling = 'Regular', weight = '165g/m²', material = '86% Poliéster, 14% Elastano' WHERE title = 'Gym King Energy Linear Vest Black';
UPDATE product SET modeling = 'Oversized', weight = '315g/m²', material = '84% Algodão, 16% Poliéster' WHERE title = 'Gymshark Shark Hoodie Black';
UPDATE product SET modeling = 'Oversized', weight = '315g/m²', material = '84% Algodão, 16% Poliéster' WHERE title = 'Gymshark Shark Hoodie White';
UPDATE product SET modeling = 'Compression', weight = '200g/m²', material = '88% Poliéster, 12% Elastano' WHERE title = 'Vital Collection Seamless Leggings Men';
UPDATE product SET modeling = 'Regular', weight = '175g/m²', material = '95% Algodão, 5% Elastano' WHERE title = 'Mens Gym Tops and T Shirts Collection';
UPDATE product SET modeling = 'Fitted', weight = '190g/m²', material = '90% Poliéster, 10% Elastano' WHERE title = 'Oxy Mass Muscle Black Tee';
UPDATE product SET modeling = 'Regular', weight = '180g/m²', material = '92% Algodão, 8% Elastano' WHERE title = 'Gymshark Sports Fitness Releases';
UPDATE product SET modeling = 'Fitted', weight = '185g/m²', material = '88% Poliéster, 12% Elastano' WHERE title = 'Lifting Collection For Men Front View';
UPDATE product SET modeling = 'Set', weight = '240g/m²', material = '85% Poliéster, 15% Elastano' WHERE title = 'All Green Workout Outfits For Men';
UPDATE product SET modeling = 'Set', weight = '220g/m²', material = '82% Poliéster, 18% Elastano' WHERE title = 'Conjunto Fitness Preto';
UPDATE product SET modeling = 'Set', weight = '220g/m²', material = '82% Poliéster, 18% Elastano' WHERE title = 'Conjunto Fitness Rosa';
UPDATE product SET modeling = 'Fitted', weight = '190g/m²', material = '90% Nylon, 10% Elastano' WHERE title = 'Hyperflex 2 Cropped Tee Sky Blue';
UPDATE product SET modeling = 'Regular', weight = '175g/m²', material = '92% Nylon, 8% Elastano' WHERE title = 'Hyperflex 2 Shorts Charcoal';
UPDATE product SET modeling = 'Fitted', weight = '195g/m²', material = '89% Poliéster, 11% Elastano' WHERE title = 'Gymshark Everyday Seamless Crop Tank Navy';
UPDATE product SET modeling = 'Fitted', weight = '195g/m²', material = '89% Poliéster, 11% Elastano' WHERE title = 'Gymshark Fraction Crop Tank Black';
UPDATE product SET modeling = 'Set', weight = '225g/m²', material = '84% Poliéster, 16% Elastano' WHERE title = 'Pink Gym Sets and Workout Sets';
UPDATE product SET modeling = 'Set', weight = '230g/m²', material = '86% Nylon, 14% Elastano' WHERE title = 'Black Light Blue Seamless Set';
UPDATE product SET modeling = 'One Size', weight = '310g', material = 'Mesh Técnico, EVA e Borracha' WHERE title = 'White Training Shoes Feminine';
UPDATE product SET modeling = 'Fitted', weight = '205g/m²', material = '87% Nylon, 13% Elastano' WHERE title = 'Vital Long Sleeve Cut Out Top Black Marl';
UPDATE product SET modeling = 'Fitted', weight = '200g/m²', material = '88% Poliéster, 12% Elastano' WHERE title = 'Gymshark Sports Top 30-04-26';

-- Discount setup (new column: discount_percentage)
UPDATE product SET discount_percentage = 0;

UPDATE product
SET discount_percentage = 10
WHERE title IN (
	'Gymshark Black Compression Tee',
	'White Performance Joggers',
	'Emerald Seamless Legging',
	'Black Sculpt Seamless Set'
);

UPDATE product
SET discount_percentage = 20
WHERE title IN (
	'Gymshark Shark Hoodie Black',
	'Gymshark Shark Hoodie White',
	'Conjunto Fitness Preto',
	'Conjunto Fitness Rosa',
	'Pink Gym Sets and Workout Sets'
);

UPDATE product
SET discount_percentage = 25
WHERE title IN (
	'Gymshark Sports Top 30-04-26',
	'Gymshark Everyday Seamless Crop Tank Navy',
	'Gymshark Fraction Crop Tank Black'
);

-- Tags and product_tags setup
INSERT INTO tags (name) VALUES
	('DISCOUNT'),
	('EVENTUAL_DISCOUNT'),
	('NEW_ARRIVAL_30_04_26'),
	('FEATURED');

INSERT INTO product_tags (tag_id, product_id)
SELECT t.id, p.id
FROM tags t
JOIN product p ON p.discount_percentage > 0
WHERE t.name = 'DISCOUNT';

INSERT INTO product_tags (tag_id, product_id)
SELECT t.id, p.id
FROM tags t
JOIN product p ON (p.image_url LIKE '%30-04-26%' OR p.image_url LIKE '%30-40-26%')
WHERE t.name = 'NEW_ARRIVAL_30_04_26';

INSERT INTO product_tags (tag_id, product_id)
SELECT t.id, p.id
FROM tags t
JOIN product p ON (p.image_url LIKE '%30-04-26%' OR p.image_url LIKE '%30-40-26%')
WHERE t.name = 'EVENTUAL_DISCOUNT'
  AND p.discount_percentage > 0;

INSERT INTO product_tags (tag_id, product_id)
SELECT t.id, p.id
FROM tags t
JOIN product p ON p.title IN (
	'Gymshark Black Compression Tee',
	'Gymshark Blue Oversized Hoodie',
	'Gymshark Shark Hoodie Black',
	'Conjunto Fitness Preto'
)
WHERE t.name = 'FEATURED';

-- Bundle setup
INSERT INTO sets (name) VALUES
	('Vuori Navy Set'),
	('Vuori Sky Grey Set'),
	('Vuori Chambray Set'),
	('Black White Set');

UPDATE product
SET set_id = (SELECT id FROM sets WHERE name = 'Vuori Navy Set')
WHERE title = 'Vuori Viewpoint Muscle Tank Navy';

UPDATE product
SET set_id = (SELECT id FROM sets WHERE name = 'Vuori Sky Grey Set')
WHERE title = 'Vuori Viewpoint Muscle Tank Sky Grey';

UPDATE product
SET set_id = (SELECT id FROM sets WHERE name = 'Vuori Chambray Set')
WHERE title = 'Vuori Strato Muscle Tee Chambray Heather';

UPDATE product
SET set_id = (SELECT id FROM sets WHERE name = 'Black White Set')
WHERE title = 'Black White Workout Set';

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
	((SELECT id FROM product WHERE title = 'Prada Hydrate Bottle'), 'SKU-0026', 'STEEL', 'ONE', 129.00, 55, 'WATER_BOTTLE', 'UNISSEX', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gym King Energy Linear Vest Black'), 'SKU-0027', 'BLACK', 'M', 139.90, 26, 'REGATTA', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Shark Hoodie Black'), 'SKU-0028', 'BLACK', 'M', 299.90, 16, 'SWEATSHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Shark Hoodie White'), 'SKU-0029', 'WHITE', 'M', 299.90, 14, 'SWEATSHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Vital Collection Seamless Leggings Men'), 'SKU-0030', 'BLACK', 'M', 219.90, 20, 'LEGGING', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Mens Gym Tops and T Shirts Collection'), 'SKU-0031', 'BLACK', 'M', 159.90, 24, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Oxy Mass Muscle Black Tee'), 'SKU-0032', 'BLACK', 'M', 149.90, 29, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Sports Fitness Releases'), 'SKU-0033', 'MULTI', 'U', 99.90, 12, 'SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Lifting Collection For Men Front View'), 'SKU-0034', 'BLACK', 'M', 169.90, 22, 'SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'All Green Workout Outfits For Men'), 'SKU-0035', 'GREEN', 'M', 259.90, 18, 'SET', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Conjunto Fitness Preto'), 'SKU-0036', 'BLACK', 'S', 279.90, 31, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Conjunto Fitness Rosa'), 'SKU-0037', 'PINK', 'S', 279.90, 27, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Hyperflex 2 Cropped Tee Sky Blue'), 'SKU-0038', 'SKY_BLUE', 'S', 159.90, 33, 'SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Hyperflex 2 Shorts Charcoal'), 'SKU-0039', 'CHARCOAL', 'S', 139.90, 35, 'SHORTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Everyday Seamless Crop Tank Navy'), 'SKU-0040', 'NAVY', 'S', 149.90, 30, 'T_SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Fraction Crop Tank Black'), 'SKU-0041', 'BLACK', 'S', 149.90, 28, 'T_SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Pink Gym Sets and Workout Sets'), 'SKU-0042', 'PINK', 'S', 289.90, 25, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Black Light Blue Seamless Set'), 'SKU-0043', 'BLACK', 'S', 299.90, 21, 'SET', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'White Training Shoes Feminine'), 'SKU-0044', 'WHITE', '37', 249.90, 19, 'SHOES', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Vital Long Sleeve Cut Out Top Black Marl'), 'SKU-0045', 'BLACK MARL', 'S', 179.90, 23, 'SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Gymshark Sports Top 30-04-26'), 'SKU-0046', 'BLACK', 'S', 159.90, 34, 'T_SHIRTS', 'FEMININE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Vuori Viewpoint Muscle Tank Navy'), 'SKU-0047', 'NAVY', 'M', 169.90, 26, 'REGATTA', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Vuori Viewpoint Muscle Tank Sky Grey'), 'SKU-0048', 'GREY', 'M', 169.90, 24, 'REGATTA', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Vuori Strato Muscle Tee Chambray Heather'), 'SKU-0049', 'CHAMBRAY', 'M', 159.90, 20, 'T_SHIRTS', 'MASCULINE', 'AVAILABLE', TRUE),
	((SELECT id FROM product WHERE title = 'Black White Workout Set'), 'SKU-0050', 'BLACK_WHITE', 'M', 189.90, 18, 'SET', 'MASCULINE', 'AVAILABLE', TRUE);

-- Mirror product main thumbnail into the gallery table
INSERT INTO product_image (product_id, url, is_main)
SELECT id, image_url, TRUE FROM product;

INSERT INTO product_image (product_id, url, is_main) VALUES
	((SELECT id FROM product WHERE title = 'Vuori Viewpoint Muscle Tank Navy'), 'clothes/men/01-05-26-(SET-vuori-set-blue-blackman)Built to perform in the heat, the Viewpoint Muscle Tank is made with our lightweight, stretch-knit mesh_ Shop this men''s Navy shirt from Vuori.jpeg', FALSE),
	((SELECT id FROM product WHERE title = 'Vuori Viewpoint Muscle Tank Navy'), 'clothes/men/01-05-26-(SET-vuori-set-blue-blackman)Viewpoint-Muscle-Tank–-Navy–Vuori.jpeg', FALSE),
	((SELECT id FROM product WHERE title = 'Vuori Viewpoint Muscle Tank Sky Grey'), 'clothes/men/01-05-26-(SET-vuori-set-white-whiteman)Viewpoint Muscle Tank–Sky-Grey–Tanks–Vuori.jpeg', FALSE);

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
