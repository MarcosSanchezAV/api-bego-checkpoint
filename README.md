# api-bego-checkpoint

En este repositorio se encuentra el proyecto realizado por mi como prueba técnica para postulantes de backend. Este proyecto consiste en la creación de una API empleando las siguientes tecnologías:

- NodeJS v18.16.0
- NPM v9.5.1
- Express v4.18.2
- MongoDB v6.0.7
- Typescript v5.1.6

La API consiste en poder crear ordenes para trasladar carga de un punto a otro, señalando la ruta que se desea seguir, el camión a usar y el tipo de carga. Para indicar una ruta primero se debe crear señalando el punto de partida y el de llegada, la API proporcionará las coordenadas de cada punto y la distancia entre ellos. 

Cuando una orden es creada aparecerá en estado *pendiente* por defecto. El usuario debe confirmarla o en su defecto cancelarla. 

La API también permite consultar la lista de puntos y camiones disponibles así como listar un punto o un camión en específico

# Tabla de contenido
- [Como iniciar el proyecto](#inicio)
    - [Comandos](#comandos)

# <a id="inicio"></a>Como iniciar el proyecto

## <a id="comandos"></a>Comandos

Para descargar el repositorio en el local es necesario posicionarse en la carpeta en la que se desea tener el proyecto y ejecutar el siguiente comando:

```powershell
git clone https://github.com/MarcosSanchezAV/api-bego-checkpoint.git
```

Para poder iniciar el proyecto es necesario tener instalado **node** y **mongod** en el sistema

En este caso los modulos **typescript**, **ts-node** y **nodemon** fueron instalados de manera global, si se desea lo mismo el comando que se debe ejecutar es:

```powershell
npm i typescript ts-node nodemon -g
```

De lo contrario si solo desea instalar los modulos en el proyecto entonces se debe ejecutar:

```powershell
npm i typescript ts-node nodemon
```

Ahora, para iniciar el proyecto node e inyectar todas las dependencias, además de transcribir todos los archivos .ts los comandos a seguir son:

```powershell
npm install
tsc
```

Listo, ahora para iniciar el servidor se debe ejecutar el script definido en el archivo package.json:

```powershell
npm run server
```

## Variables de entorno

Como buena práctica el archivo .env está declarado en el .gitignore, por lo que no existe en el repositorio clonado, se debe agregar manualmente en el root del proyecto e indicar las siguientes variables:

```
PORT=3000
DB_URI=mongodb://localhost:27017/db-bego-checkpoint
JWT_SECRET=secras1456
API_KEY= // omitida por cuestiones de seguridad
API_GOOGLE_MAPS_URL_COORDINATES=https://maps.googleapis.com/maps/api/geocode/json
API_GOOGLE_MAPS_URL_DISTANCE=https://maps.googleapis.com/maps/api/distancematrix/json
```

- PORT: Es el puerto por el cual la API se va a conectar en localhost
- DB_URI: Aqui se especifica la URI de la base de datos que se desea utilizar
- API_KEY: Es la key generada por Google para utilizar sus APIS
- API_GOOGLE_MAPS_URL_COORDINATES: Url que se usa para obtener las coordenadas mediante los parámetros **placeId** y **apiKey**
- API_GOOGLE_MAPS_URL_DISTANCE: Url que se usa para obtener la distancia entre dos lugares mediante sus parámetros **placeId**

Si desea usar unas variables propias se pueden modificar en este archivo

# Procedimiento de desarrollo

Personalmente había usado muy poco el framework Node y no tenía conocimiento sobre bases de datos no relacionales, así que investigué sobre las prácticas que se usan para construir APIs con Node y sobre mongo DB en general, a la par que aprendía a hacer ciertas cosas empecé a crear el proyecto y su división de carpetas. Decidí usar la siguiente convención:

- config: Aqui declaré un único archivo que se encarga de hacer la conexión a la base de datos
- controllers: Aquí declaré los controladores de todos los módulos, que se encargan de distribuir los datos eficientemente a los servicios y almacenar los datos obtenidos o mandar códigos de error en caso de algún fallo
- interfaces: Aquí declaré las interfaces de todos los módulos y algunas adicionales para poder crear destructuración
- middlewares: Aquí declaré el middleware que se encarga de validar si el usuario tiene una sesión activa
- models: Aquí declaré los modelos de todos los módulos para crear los items que hacen las consultas a la base de datos
- routes: Declaración de las rutas de todos los componentes y sus respectivos controladores para posteriormente exportarlas al archivo server.js
- services: Declaración de los servicios de todos los componentes para realizar la lógica de negocio y entregar datos útiles a los controladores. Además del servicio que se encarga de hacer las peticiones a la API de Google Maps
- utils: Declaración de funciones útiles para destructurar los servicios o manejar errores

Luego empecé a desarrollar la API por módulos, asigné una rama de git para cada módulo y mientras estoy implementando mejoras o funcionalidades en cada rama protejo el código mandando commits para despues realizar un merge a la rama *main*

Primero empecé con los módulos *points* y *trucks* ya que eran los más fáciles de implementar, no manejan ninguna lógica de negocio solo es hacer consultas a la base de datos y recuperar su información.

Para el módulo *auth* cree una colección llamada *users* para guardar todos los usuarios registrados y poder consultarlos para realizar el login. También utilicé los módulos npm **bcryptjs** y **jsonwebtoken** para encriptar la contraseña que el usuario proporcione al momento de registrarse y para manejar las sesiones en las rutas

Para el módulo *routes* implementé el servicio para obtener las coordenadas de los puntos que conforman la ruta y la distancia entre ellos mediante peticiones a las APIs de Google (al parecer el número de peticiones son limitadas). 



Como herramientas de consulta me he estado apoyando en la documentación de mongo DB, videos de YouTube y ChatGPT, mientras que para desarrollar ideas y planear el trabajo he estado usando un pizarrón y Notion

# Endpoints

Para el desarrollo de la API se han desarrollado los siguientes endpoints de acuerdo al módulo:

## Auth

| Nombre | Tipo | URL | Request | Response | Descripción |
| --- | --- | --- | --- | --- | --- |
| register | POST | auth/register | name, email, password | user | Registra un usuario, no permite registrar un usuario dos veces |
| login | POST | auth/login | email, password | token, user | Verifica que un usuario se haya registrado e inicia sesión, devuelve un token que debe usarse para los demás endpoints |

## Points

## Trucks

## Routes

## Orders

# To-Do del proyecto

## Módulo orders

- [x]  Implementar módulo Orders
    - [x]  Implementar endpoint para agregar una orden
    - [x]  Implementar endpoints para listar ordenes
    - [x]  Implementar endpoint updateOrderStatus → cambiar el estado de la orden (pending, in progress, finished y cancelled)
    - [x]  Implementar endpoint updateOrder → validar que se modifique solo si el status está en Pending

## Módulo routes

- [x]  Validar que una ruta no se agregue dos veces → los campos pickup.point y dropOff.point sean iguales entre la ruta que se desea crear y una ruta creada
- [x]  Implementar endpoints para modificar y eliminar rutas → validar que que no se pueda modificar ni eliminar una ruta si el campo isAssigned es `true`

## Aspectos generales

- [x]  Implementar el session middleware para proteger todas las rutas (excepto el endpoint **register**)
- [ ]  Documentar controladores, servicios, rutas, utilidades y el archivo server.ts
- [ ]  Implementar todos los mensajes como variables de entorno

## Corregir

- [x]  Los endpoint GET de los módulos *routes* y *orders* → en la respuesta devuelven el id de los objetos relacionados → destructurar correctamente la respuesta
    - [x]  endpoints de *routes*
    - [x]  endpoint de *orders*

## Documento README

- [ ]  Descripción del desarrollo del módulo *orders*
- [ ]  Terminar sección Endpoints
- [ ]  Crear un índice dinámico 
