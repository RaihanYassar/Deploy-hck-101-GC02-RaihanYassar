# P2-Challenge-2 (Client Side)

> Tuliskan API Docs kamu di sini

# BLUVERIE API Documentation

**Base URL:** `https://market.bluveri.web.id`

## 1. Authentication

### Login
- **Method:** POST
- **Endpoint:** `/login`
- **Access:** Public

**Request Body:**
```json
{
  "email": "admin@bluverie.com",
  "password": "yourpassword"
}
```

**Success Response (200):**
```json
{
  "access_token": "your_access_token"
}
```

Token digunakan untuk mengakses endpoint yang membutuhkan authentication.

### Authentication Header

Endpoint yang dilindungi membutuhkan header:

```http
Authorization: Bearer <access_token>
```

---

## 2. Products

Semua endpoint Products membutuhkan authentication.

### Get All Products
- **Method:** GET
- **Endpoint:** `/products`
- **Access:** Authenticated

**Success Response (200):**
```json
{
  "message": "Success read Product",
  "data": []
}
```

### Get Product By ID
- **Method:** GET
- **Endpoint:** `/products/:id`
- **Access:** Authenticated

### Create Product
- **Method:** POST
- **Endpoint:** `/products`
- **Access:** Authenticated

**Request Body:**
```json
{
  "name": "BLUVERIE No. 01 Classic",
  "description": "Luxury classic timepiece",
  "price": 1500,
  "stock": 10,
  "imageUrl": "https://example.com/watch.jpg",
  "categoryId": 1
}
```

**Success Response (201):**
```json
{
  "message": "Succeed Create Product",
  "data": {}
}
```

### Update Product
- **Method:** PUT
- **Endpoint:** `/products/:id`
- **Access:** Authenticated, subject to authorization

**Request Body:**
```json
{
  "name": "BLUVERIE No. 01 Classic",
  "description": "Updated description",
  "price": 1600,
  "stock": 8,
  "imageUrl": "https://example.com/watch.jpg",
  "categoryId": 1
}
```

### Delete Product
- **Method:** DELETE
- **Endpoint:** `/products/:id`
- **Access:** Authenticated, subject to authorization

### Upload Product Image
- **Method:** PATCH
- **Endpoint:** `/products/:id/img-url`
- **Access:** Authenticated, subject to authorization
- **Content-Type:** `multipart/form-data`

**Form Data:**
- `image`: Product image file

**Success Response (200):**
```json
{
  "message": "Success Update Image Product"
}
```

---

## 3. Categories

All Categories endpoints require authentication.

### Get All Categories
- **Method:** GET
- **Endpoint:** `/categories`

**Success Response (200):**
```json
{
  "message": "Success read Category",
  "categories": []
}
```

### Create Category
- **Method:** POST
- **Endpoint:** `/categories`

**Request Body:**
```json
{
  "name": "Classic"
}
```

**Success Response (201):**
```json
{
  "message": "Success Create Category",
  "categories": {}
}
```

### Update Category
- **Method:** PUT
- **Endpoint:** `/categories/:id`

**Request Body:**
```json
{
  "name": "Automatic"
}
```

**Success Response (200):**
```json
{
  "message": "update Category Succeed",
  "data": {}
}
```

---

## 4. Staff Management

Staff creation requires authentication. Only users with sufficient permissions can create staff accounts. A user with the `staff` role is forbidden from registering another user.

### Create Staff
- **Method:** POST
- **Endpoint:** `/add-user`
- **Access:** Authenticated (Admin)

**Request Body:**
```json
{
  "username": "staff01",
  "email": "staff@bluverie.com",
  "password": "yourpassword",
  "role": "staff",
  "phoneNumber": "081234567890",
  "address": "Jakarta, Indonesia"
}
```

**Success Response (201):**
```json
{
  "message": "Success create new user",
  "user": {
    "id": 2,
    "email": "staff@bluverie.com"
  }
}
```