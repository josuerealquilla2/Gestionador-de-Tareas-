# Gestionador de Tareas

Aplicación web full-stack para la gestión de tareas personales con autenticación por usuario. Cada cuenta tiene su propio espacio privado donde puede crear, editar, completar y eliminar tareas.

**Demo en vivo:** [gestionador-de-tareas.vercel.app](https://gestionador-de-tareas.vercel.app)

---

## Capturas de pantalla

### Inicio de sesión
![Login](https://raw.githubusercontent.com/josuerealquilla2/Gestionador-de-Tareas-/backend-GestorTareas/frontend/public/login.png)

### Pantalla principal
![Inicio](https://raw.githubusercontent.com/josuerealquilla2/Gestionador-de-Tareas-/backend-GestorTareas/frontend/public/inicio.png)

### Crear tarea
![Crear tarea](https://raw.githubusercontent.com/josuerealquilla2/Gestionador-de-Tareas-/backend-GestorTareas/frontend/public/crear-tarea.png)

### Listado de tareas
![Listar tareas](https://raw.githubusercontent.com/josuerealquilla2/Gestionador-de-Tareas-/backend-GestorTareas/frontend/public/lsitar-tareas.png)

---

## Tecnologías

### Backend
| Tecnología | Uso |
|---|---|
| Django 6.0 | Framework principal |
| Django REST Framework | API REST |
| Simple JWT | Autenticación con tokens |
| django-cors-headers | Control de CORS |
| PostgreSQL (Neon) | Base de datos en producción |
| Whitenoise | Archivos estáticos |
| Vercel | Hosting serverless |

### Frontend
| Tecnología | Uso |
|---|---|
| React 19 | Interfaz de usuario |
| Vite | Bundler y servidor de desarrollo |
| React Router v7 | Navegación entre páginas |
| Tailwind CSS v4 | Estilos utilitarios |
| Vercel | Hosting y CDN |

---

## Arquitectura

```
Gestionador-de-Tareas/
├── gestorTarea/               # Backend Django
│   ├── CRUD/
│   │   ├── models.py          # Modelo Task con FK a User
│   │   ├── api_views.py       # Vistas REST (CRUD de tareas)
│   │   ├── auth_views.py      # Vistas de registro e inicio de sesión
│   │   ├── serializers.py     # Serialización de datos
│   │   └── api_urls.py        # Rutas de la API
│   ├── gestorTarea/
│   │   ├── settings.py        # Configuración del proyecto
│   │   ├── urls.py            # URLs principales
│   │   └── wsgi.py            # Punto de entrada WSGI
│   ├── requirements.txt
│   └── vercel.json
│
└── frontend/                  # Frontend React
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx      # Página de inicio de sesión
    │   │   └── Register.jsx   # Página de registro
    │   ├── components/
    │   │   ├── TaskCard.jsx   # Tarjeta individual de tarea
    │   │   ├── TaskForm.jsx   # Formulario de nueva tarea
    │   │   └── TaskList.jsx   # Listado de tareas
    │   ├── App.jsx            # Enrutador principal y vista de tareas
    │   └── api.js             # Cliente HTTP con autenticación JWT
    └── vite.config.js
```

---

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/auth/register/` | Crear nueva cuenta |
| `POST` | `/api/auth/login/` | Iniciar sesión y obtener token |

### Tareas (requieren token JWT)
| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/tasks/` | Listar todas las tareas del usuario |
| `POST` | `/api/tasks/` | Crear nueva tarea |
| `PUT` | `/api/tasks/{id}/` | Editar tarea |
| `DELETE` | `/api/tasks/{id}/` | Eliminar tarea |
| `PATCH` | `/api/tasks/{id}/toggle/` | Marcar como completada/pendiente |

Todas las peticiones autenticadas deben incluir el header:
```
Authorization: Bearer <access_token>
```

---

## Funcionalidades

- **Registro e inicio de sesión** con validaciones en frontend y backend
- **Visualización de contraseña** con ícono de ojo en los formularios
- **Tareas privadas por usuario** — cada cuenta solo ve sus propias tareas
- **CRUD completo** — crear, editar, completar y eliminar tareas
- **Separación por estado** — sección de pendientes y completadas
- **Estadísticas en tiempo real** — contador de pendientes, completadas y total
- **Cierre de sesión** con limpieza del token
- **Rutas protegidas** — redirige al login si no hay sesión activa

---

## Instalación local

### Requisitos previos
- Python 3.12+
- Node.js 18+
- pip

### Backend

```bash
cd gestorTarea
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

El servidor quedará disponible en `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

> Para desarrollo local, crea el archivo `frontend/.env` con:
> ```
> VITE_API_URL=http://localhost:8000
> ```

---

## Variables de entorno

### Backend (Vercel)
| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión a PostgreSQL (Neon) |
| `SECRET_KEY` | Clave secreta de Django |
| `DEBUG` | `False` en producción |

### Frontend (Vercel)
| Variable | Descripción |
|---|---|
| `VITE_API_URL` | URL base del backend desplegado |

---

## Despliegue

El proyecto está desplegado en dos proyectos separados en Vercel:

- **Backend:** apunta a la carpeta `gestorTarea/` con Python serverless
- **Frontend:** apunta a la carpeta `frontend/` con Vite como framework

La base de datos en producción es **PostgreSQL** alojada en [Neon](https://neon.tech), con conexión segura via SSL.

---

## Autor

**Josue David Real Quilla**
