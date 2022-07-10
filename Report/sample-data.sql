insert INTO category (
        created_date,
        updated_date,
        name,
        code,
        description
    )
VALUES (
        NOW(),
        NOW(),
        'Category 1',
        'CAT1',
        'Category 1 description'
    );
INSERT INTO category (
        created_date,
        updated_date,
        name,
        code,
        description
    )
VALUES (
        NOW(),
        NOW(),
        'Category 2',
        'CAT2',
        'Category 2 description'
    );
INSERT INTO category (
        created_date,
        updated_date,
        name,
        code,
        description
    )
VALUES (
        NOW(),
        NOW(),
        'Category 3',
        'CAT3',
        'Category 3 description'
    );
INSERT INTO category (
        created_date,
        updated_date,
        name,
        code,
        description
    )
VALUES (
        NOW(),
        NOW(),
        'Category 4',
        'CAT4',
        'Category 4 description'
    );
INSERT INTO product (
        created_date,
        updated_date,
        name,
        image,
        description,
        status,
        category_id
    )
VALUES (
        NOW(),
        NOW(),
        'Product 1',
        'http://www.example.com/product1.jpg',
        'Product 1 description',
        0,
        1
    );
INSERT INTO product (
        created_date,
        updated_date,
        name,
        image,
        description,
        status,
        category_id
    )
VALUES (
        NOW(),
        NOW(),
        'Product 2',
        'http://www.example.com/product2.jpg',
        'Product 2 description',
        0,
        2
    );
INSERT INTO product (
        created_date,
        updated_date,
        name,
        image,
        description,
        status,
        category_id
    )
VALUES (
        NOW(),
        NOW(),
        'Product 3',
        'http://www.example.com/product3.jpg',
        'Product 3 description',
        0,
        3
    );
INSERT INTO product (
        created_date,
        updated_date,
        name,
        image,
        description,
        status,
        category_id
    )
VALUES (
        NOW(),
        NOW(),
        'Product 4',
        'http://www.example.com/product4.jpg',
        'Product 4 description',
        0,
        4
    );
