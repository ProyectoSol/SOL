# Sunit

##Proyecto de fin de curso 2014-2016 del ciclo formativo de desarrollo de aplicaciones web


Demostración:
sunit.zubirimanteoweb.com


Características
--------

- **Local Authentication** using Email and Password
- Handlebars notifications
- MVC Project Structure
- Node.js clusters support
- Bootstrap 3 + Webflow.io
- Contact Form (powered by Mailgun)
- **Account Management**
 - Profile Details
 - Change Password
 - Forgot Password
 - Reset Password
 - Fototype Details
 - Admin panel
- CSRF protection


Instalacción
---------------

La manera mas sencilla de empezar es clonando el repositorio

```bash
# Clonar repositorio
git clone https://github.com/ProyectoSol/SOL 

# Entrar en el directorio creado
cd miproyecto

# Instalar dependencias con NPM
npm install

node app.js
```

Api para la radiacion solar
------------------

Cualquiera puede acceder a nuestra api en cualquier momento. Es muy sencillo, simplemene tendreis que acceder
la nuestra web de una forma un tanto especial http://sunit.zubirimanteoweb.com/API/(nombre del dispositivo)
con conocer el nombre del dispositivo ya podreis obtener la radicion, la fech de dicha radiacion y el nombre del dispositivo

- .fecha
- .uv
- .dispositivo




<hr>

<img src="https://raw.github.com/mailgun/media/master/Mailgun_Primary.png" width="200">
- Go to http://www.mailgun.com
- Sign up and add your *Domain Name*
- From the domain overview, copy and paste the default SMTP *Login* and *Password* into `.env` file


Estructura del proyecto
-----------------

| Nombre                              | Descripción                                                            |
| ----------------------------------  | ------------------------------------------------------------------     |
| **rutas**/app.js                    | fichero donde esta definidas las rutas                                 |
| **controllers**/registro.js         | Controller para el registro                                            |
| **controllers**/login.js            | Controller para el login                                               |
| **controllers**/fotitipo.js         | Controller para añadir la informacion de usuario y fototipo            |
| **controllers**/configuracion.js    | Controller para configurar tu dispositivo                              |
| **controllers**/cambiopass.js       | Controller para cambiar contraseña                                     |
| **controllers**/activacion.js       | Controller para activar el usuario                                     |
| **controllers**/conexion.js         | Controller para realizar la conexion con la base de datos              |
| **controllers**/alertas.js          | Controller para enviar alertas por correo                              |
| **controllers**/api.js              | Controller para ver la api de los datos de historial.                  |
| **controllers**/radiacion.js        | Controller para mostrar los datos del usuario radiacion y estadisticas |
| **controllers**/estadisticaHora.js  | Controller para la estistica del dia.                                  |
| **controllers**/estadisticaSemana.js| Controller para la estadistica de la semana                            |
| **controllers**/estadisticaAnual.js | Controller para la estadistica de los meses                            |
| **controllers**/insertarAleat.js.js | Controller de prueba para añadir datos en la base de datos.            |
| **controllers**/tiempo.js           | Controller la api del tiempo                                           |
| **controllers**/contacto.js         | controllers para las preguntas de los usuarios desde el index          |
| **controllers**/admin.js            | Controller para mostrar datos del administrador.                       |
| **models**/Users.js                 | esquema de mongo para el usuario.                                      |
| **models**/TablaRadiacion.js        | esquema de mongo para el dispositivo.                                  |
| **models**/TablaHistorial.js        | esquema de mongo para el historial.                                    |
| **views*/index.handlebars           | index de sunit.                                                        |
| **views*/home.handlebars            | pagina despues de logearse, el usuario interactua con los datos        |
| **views*/admin.handlebars           | pagina del admin, el usuario interactua con los datos                  |
| **views*/panel.handlebars           | pagina para la configuracion de los usuarios                           |
| app.js                              | Main application file.                                                 |


Listado de paquetes
----------------

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |     
| express                         | Node.js web framework.                                                |
| body-parser                     | Express 4 middleware.                                                 |
| cookie-parser                   | Express 4 middleware.                                                 |
| express-session                 | Express 4 middleware.                                                 |
| morgan                          | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| errorhandler                    | Express 4 middleware.                                                 |
| method-override                 | Express 4 middleware.                                                 |
| express-validator               | Easy form validation for Express.                                     |
| mongoose                        | MongoDB ODM.                                                          |
| client-session                  | Session helper                                                        |
| express-handlebars              | Render                                                                |
| MailGun                         | Mail service                                                          |
| randomString                    | random String generator                                               |
| request-ip                      | HTTP ip requester                                                     |
| satelize                        | IP geolocalizator                                                     |
| md5                             | md5 encoder                                                           |



