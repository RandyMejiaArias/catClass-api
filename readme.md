
  
# Proyecto CatClass

  Proyecto cuya función en llevar un registro y un control de clases virtuales que se han dictado o que se van a dictar.

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  <!-- [A deployed version can be viewed here.]() -->
  
---
## Contenido

1. [Acerca de](#about)
    1. [Framework](#framework)
    <!-- 2. [Historia de usuario](#user%20story) -->
    2. [Criterios de aceptación](https://github.com/RandyMejiaArias/catClass-api/blob/18aff012d5ec97fe04766545dec47668b2e525bb/readme.md#L55)
        
        2.1. [Autenticación y Protección de Rutas](https://github.com/RandyMejiaArias/catClass-api/blob/18aff012d5ec97fe04766545dec47668b2e525bb/readme.md#L56)

    <!-- 4. [Visuales](#visuals) -->
2. [Installation](#installation)
3. [Licencia](#license)
4. [Autor](#authors%20and%20acknowledgment)

---
## Acerca de

### Framework

Se ha decidido usar el stack MERN, que por sus siglas incluye MongoDb, Express, React, Node Js.
Es un stack basado en Javascript, el cual usa una base de datos no relacional mediante MongoDb, un servidor de peticiones HTTP Express, para la parte del Frontend, se utiliza React para presentar una aplicación Web y Node Js como backend sobre el cual se montará el servidor.

A breves rasgos, el sistema tendrá la siguiente estructura:

![MERN Stack](https://sp-ao.shortpixel.ai/client/to_webp,q_lossy,ret_img,w_943/https://www.bocasay.com/wp-content/uploads/2020/03/MERN-stack-1.png)

Escalando a un nivel más bajo, el sistema sigue el siguiente esquema: 

![Esquema del sistema](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes/mvc_express.png)

El diagrama nos representa el flujo principal de los datos y partes que necesitamos implementar para manjear peticiones HTTP.<br>
Base de datos y modelos, estos modelos son los que definen la estructura de los datos que vamos a utilizar.<br>
Rutas, las cuales van a recibir las peticiones y transmitirlas al controlador correspondiente el cual se supone haga una función en específico.<br>
Controladores, funciones que van a realizar procesos específicos, se encargaran de enviar y recibir los datos a los modelos y a su vez a las vistas.<br>
Vistas, es donde se mostrarán los datos y será la interfaz que visualize el usuario. 

---

<!-- ### Historia de usuario - ¿Por qué se realiza el proyecto?
  

--- -->

### Criterios de aceptación
#### Autentiicación y Rutas protegidas
La aplicación debe contar con un sistema de autentificación y rutas protegidas para evitar que un usuario no autorizado tenga acceso a ella. Para esto es muy importante contar con un apartado para Iniciar Sesión.

Diagrama de autenticación y rutas protegidas
![Diagrama de autenticación y rutas protegidas](https://danishshakeel.me/wp-content/uploads/2022/11/RouteGuard-768x365.png.webp)

El diagrama muestra como esta armada la arquitectura del módulo de autenticación, la aplicación responde a las distintas peticiones del usuario pasando en primer lugar por un middleware de autenticación en el cuál se verifica que el usuario tenga una sesión activa en el sistema, esta verificación se realiza mediante el uso de un token, en dicho token se guarda información del token y el tiempo de sesión activa, si este token es vigente entonces la aplicación entiende que hay una sesión activa para el usuario que esta intentando realizar la petición y le deja pasar para culminar la acción que está solicitando. <br>
En caso de no tener una sesión activa o no pasar el token, la aplicación no le dejara pasar y lo redireccionará a la pantalla de inicio de sesión.

  
---
<!-- ## Visuales

  ![]()

--- -->

## Installation:

1. Clonar el repositorio de Git

  Para clonar el repositorio usar el comando:
  
      git clone https://github.com/RandyMejiaArias/catClass-api
2. En la carpeta se creará un archivo llamado _`example.env`_, duplicarlo y cambiar su nombre a _`.env`_.
3. Cambiar los valores de las variables para que se ajuste a su entorno.
4. En una terminal dentro de la raíz del proyecto ejecutar el comando _`npm install`_ para instalar los paquetes.
5. Para continuar con el desarrollo o realizar modificaciones ejecute _`npm run dev`_.
6. El servidor se levantará automaticamente con cada cambio que se realice.
  
---

## License
  License used for this project - MIT
  * For more information on license types, please reference this website
  for additional licensing information - [https: //choosealicense.com/](https://choosealicense.com/).

---
<!-- 
## Contributing:
  
  To contribute to this application, create a pull request.
  Here are the steps needed for doing that:
  - Fork the repo
  - Create a feature branch (git checkout -b NAME-HERE)
  - Commit your new feature (git commit -m 'Add some feature')
  - Push your branch (git push)
  - Create a new Pull Request

  Following a code review, your feature will be merged.


---

## Tests:
  

--- -->

## Autor
  Randy Mejia Arias

---

## Contact Information:
* GitHub: randymejiaarias
* Email: randy.mejia@udla.edu.ec
  
