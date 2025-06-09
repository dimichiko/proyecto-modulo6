# 📦 Proyecto Backend – Autenticación y CRUD de Productos

Este proyecto es una API REST construida con Node.js, Express y MongoDB. Implementa autenticación con JWT, autorización basada en roles y operaciones CRUD para usuarios y productos.

---

## 📁 Estructura del proyecto

backend/
├── controllers/        # Lógica de negocio (usuarios, productos)
├── middleware/         # Middlewares (autenticación, validación, etc.)
├── models/             # Modelos de Mongoose (User, Product)
├── routes/             # Rutas API
├── validators/         # Validaciones (opcional)
├── .env                # Variables de entorno (IGNORADO en git)
├── .gitignore
├── package.json
├── server.js           # Punto de entrada

---

## 🚀 Funcionalidades

- Registro e inicio de sesión de usuarios con JWT
- Verificación de token
- CRUD completo de productos
- Autorización por rol (`admin` y `cliente`)
- Protección de rutas privadas
- MongoDB como base de datos
- Separación clara por responsabilidades (MVC)

---

## 📬 Endpoints

### Usuarios

| Método | Endpoint              | Descripción                       |
|--------|------------------------|-----------------------------------|
| POST   | /api/user/register     | Registrar un nuevo usuario        |
| POST   | /api/user/login        | Iniciar sesión                    |
| GET    | /api/user/verifytoken  | Verificar token                   |
| PUT    | /api/user/update/:id   | Actualizar perfil                 |

### Productos

| Método | Endpoint                     | Descripción                     |
|--------|-------------------------------|---------------------------------|
| POST   | /api/product/create           | Crear producto                  |
| GET    | /api/product/readall          | Obtener todos los productos     |
| GET    | /api/product/readone/:id      | Obtener un producto por ID      |
| PUT    | /api/product/update/:id       | Actualizar producto             |
| DELETE | /api/product/delete/:id       | Eliminar producto               |

---

## 🔐 Variables de entorno

Crea un archivo `.env` con las siguientes variables:

MONGO_URI=mongodb+srv://:@cluster.mongodb.net/dbname
JWT_SECRET=tu_secreto
PORT=5050

---

## 💾 Scripts útiles

```bash
npm install     # Instalar dependencias
npm start       # Iniciar servidor en modo producción
npm run dev     # Iniciar servidor en modo desarrollo con nodemon

📌 Autor

Desarrollado como parte del Bootcamp Fullstack – Módulo 6 (UDD).
