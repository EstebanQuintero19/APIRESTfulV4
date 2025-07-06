# Sistema de Login y Catálogo

Aplicación web desarrollada con Node.js, Express, EJS y MongoDB. Permite el registro e inicio de sesión de usuarios, visualización de un catálogo de productos y gestión de clientes y productos mediante API REST.

---

## Instalación y Ejecución

### Requisitos
- Node.js y npm
- MongoDB en ejecución

### Instalación
```bash
npm install
```

### Ejecución
```bash
npm start
# o para desarrollo:
npm run dev
```
La aplicación se ejecuta por defecto en el puerto `9090`.

---

## Rutas Web Principales

| Ruta        | Método | Descripción                                 |
|-------------|--------|---------------------------------------------|
| `/login`    | GET    | Formulario de inicio de sesión              |
| `/login`    | POST   | Procesa el login                            |
| `/logout`   | GET    | Cierra la sesión                            |
| `/register` | GET    | Formulario de registro de usuario           |
| `/register` | POST   | Procesa el registro de usuario              |
| `/`         | GET    | Catálogo de productos (requiere login)      |
| `/about`    | GET    | Página de información                       |

---

## Rutas API REST

- Usuarios: `/v4/user`
- Productos: `/v4/product`
- Clientes: `/v4/client`

Se permite el uso de métodos GET, POST, PUT y DELETE para consultar y manipular datos.

---

## Modelos de Datos

### Usuario
```json
{
  "documento": "string",
  "nombreCompleto": "string",
  "fechaNacimiento": "YYYY-MM-DD",
  "correo": "string",
  "password": "string (encriptada)",
  "rol": "vendedor|administrador|gerente",
  "telefono": "string"
}
```

### Cliente
```json
{
  "documento": "string",
  "nombreCompleto": "string",
  "correo": "string",
  "telefono": "string",
  "direccion": "string",
  "fechaNacimiento": "YYYY-MM-DD",
  "genero": "masculino|femenino|otro",
  "estado": "activo|inactivo|bloqueado"
}
```

### Producto
```json
{
  "referencia": "string",
  "nombre": "string",
  "descripcion": "string",
  "precio": "number",
  "stock": "number",
  "imagen": "string (URL)",
  "habilitado": "boolean"
}
```

---

## Seguridad
- Las contraseñas se almacenan encriptadas con bcrypt.
- El catálogo solo es accesible para usuarios autenticados.
- Las sesiones se gestionan con `express-session`.

---

## Interfaz y Experiencia de Usuario
- Diseño moderno y responsive con Bootstrap 5 y Font Awesome 6.
- Formularios de login y registro con validación y feedback visual.
- Catálogo presentado en formato de cards, con íconos y diseño profesional.

---

## Registro e Inicio de Sesión
1. Acceder a `/register` para crear un usuario.
2. Iniciar sesión en `/login` con el correo y contraseña registrados.
3. Acceder al catálogo en `/`.

---

## Gestión de Clientes y Productos
- Utilizar las rutas API REST (`/v4/client`, `/v4/product`) con herramientas como Postman, Thunder Client o curl.
- Ejemplo de JSON para clientes y productos disponible en la sección de modelos de datos.

---

## Ejemplo de Registro de Cliente (JSON)
```json
{
  "documento": "12345678",
  "nombreCompleto": "Juan Carlos Pérez García",
  "correo": "juan.perez@email.com",
  "telefono": "3001234567",
  "direccion": "Calle 123 #45-67, Barrio Centro, Bogotá",
  "fechaNacimiento": "1990-05-15",
  "genero": "masculino"
}
```

---

## Notas
- Para cualquier duda o mejora, revisar el código fuente o contactar al administrador del sistema. 