-- Schema definition for the Eden commerce platform
-- Drops are ordered to respect existing foreign-key dependencies
DROP TABLE IF EXISTS order_item CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_address CASCADE;
DROP TABLE IF EXISTS shopping_cart_item CASCADE;
DROP TABLE IF EXISTS shopping_cart CASCADE;
DROP TABLE IF EXISTS product_tags CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS product_image CASCADE;
DROP TABLE IF EXISTS product_variant CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS sets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
	id          BIGSERIAL PRIMARY KEY,
	name        VARCHAR(120)      NOT NULL,
	birth_day   DATE              NOT NULL,
	gender      VARCHAR(12)       NOT NULL CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
	email       VARCHAR(150)      NOT NULL UNIQUE,
	password    VARCHAR(255)      NOT NULL,
	role        VARCHAR(20)       NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
	status      VARCHAR(20)       NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
	created_at  TIMESTAMP         NOT NULL DEFAULT NOW()
);

CREATE TABLE address (
	id            BIGSERIAL PRIMARY KEY,
	user_id       BIGINT          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	street        VARCHAR(150)    NOT NULL,
	number        INTEGER         NOT NULL,
	neighborhood  VARCHAR(120)    NOT NULL,
	city          VARCHAR(120)    NOT NULL,
	state         VARCHAR(80)     NOT NULL,
	country       VARCHAR(80)     NOT NULL,
	zip_code      VARCHAR(12)     NOT NULL
);

CREATE TABLE sets (
	id          BIGSERIAL PRIMARY KEY,
	name        VARCHAR(120) NOT NULL UNIQUE
);

CREATE TABLE product (
	id          BIGSERIAL PRIMARY KEY,
	title       VARCHAR(180)    NOT NULL,
	description TEXT,
	image_url   TEXT,
	modeling    TEXT,
	weight      TEXT,
	material    TEXT,
	discount_percentage INTEGER NOT NULL DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
	set_id      BIGINT REFERENCES sets(id) ON DELETE SET NULL,
	created_at  TIMESTAMP       NOT NULL DEFAULT NOW(),
	updated_at  TIMESTAMP,
	CONSTRAINT product_title_unique UNIQUE (title)
);

CREATE TABLE tags (
	id          SERIAL PRIMARY KEY,
	name        VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE product_tags (
	tag_id      INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
	product_id  BIGINT  NOT NULL REFERENCES product(id) ON DELETE CASCADE,
	PRIMARY KEY (tag_id, product_id)
);

CREATE TABLE product_variant (
	id          BIGSERIAL PRIMARY KEY,
	product_id  BIGINT        NOT NULL REFERENCES product(id) ON DELETE CASCADE,
	sku         VARCHAR(80)   UNIQUE,
	color       VARCHAR(50),
	size        VARCHAR(20),
	price       NUMERIC(12,2) NOT NULL CHECK (price >= 0),
	stock       INTEGER       NOT NULL CHECK (stock >= 0),
	category    VARCHAR(40)   NOT NULL CHECK (category IN (
					'SHIRTS','T_SHIRTS','REGATTA','PANTS','LEGGING','SHORTS','SET','SHOES',
					'CAPS','BAGS','BELTS','HATS','WATER_BOTTLE','ACCESSORY','SWEATSHIRTS'
				 )),
	gender      VARCHAR(15)   NOT NULL CHECK (gender IN ('MASCULINE','FEMININE','UNISSEX')),
	status      VARCHAR(20)   NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE','UNAVAILABLE')),
	is_default  BOOLEAN       NOT NULL DEFAULT FALSE,
	created_at  TIMESTAMP     NOT NULL DEFAULT NOW(),
	updated_at  TIMESTAMP
);

CREATE TABLE product_image (
	id          BIGSERIAL PRIMARY KEY,
	product_id  BIGINT      NOT NULL REFERENCES product(id) ON DELETE CASCADE,
	url         TEXT        NOT NULL,
	is_main     BOOLEAN     NOT NULL DEFAULT FALSE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_product_image_main
    ON product_image (product_id)
    WHERE is_main = TRUE;

CREATE TABLE shopping_cart (
	id         BIGSERIAL PRIMARY KEY,
	user_id    BIGINT      NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
	status     BOOLEAN     NOT NULL DEFAULT TRUE,
	created_at TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE shopping_cart_item (
	id          BIGSERIAL PRIMARY KEY,
	cart_id     BIGINT        NOT NULL REFERENCES shopping_cart(id) ON DELETE CASCADE,
	variant_id  BIGINT        NOT NULL REFERENCES product_variant(id),
	quantity    INTEGER       NOT NULL CHECK (quantity > 0),
	unit_price  NUMERIC(12,2) NOT NULL CHECK (unit_price > 0),
	UNIQUE (cart_id, variant_id)
);

CREATE TABLE order_address (
	id            BIGSERIAL PRIMARY KEY,
	user_id       BIGINT          NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
	street        VARCHAR(150)    NOT NULL,
	number        INTEGER         NOT NULL,
	neighborhood  VARCHAR(120)    NOT NULL,
	city          VARCHAR(120)    NOT NULL,
	state         VARCHAR(80)     NOT NULL,
	country       VARCHAR(80)     NOT NULL,
	zip_code      VARCHAR(12)     NOT NULL
);

CREATE TABLE orders (
	id               BIGSERIAL PRIMARY KEY,
	user_id          BIGINT        NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
	shopping_cart_id BIGINT        REFERENCES shopping_cart(id),
	order_address_id BIGINT        REFERENCES order_address(id),
	status           VARCHAR(20)   NOT NULL DEFAULT 'CREATED'
		CHECK (status IN ('CREATED','PAID','PREPARING','SHIPPED','DELIVERED','CANCELED')),
	created_at       TIMESTAMP     NOT NULL DEFAULT NOW()
);

CREATE TABLE order_item (
	id          BIGSERIAL PRIMARY KEY,
	order_id    BIGINT        NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
	variant_id  BIGINT        NOT NULL REFERENCES product_variant(id),
	quantity    INTEGER       NOT NULL CHECK (quantity > 0),
	unit_price  NUMERIC(12,2) NOT NULL CHECK (unit_price > 0)
);
