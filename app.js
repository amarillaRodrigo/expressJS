import express from 'express';
import {join, dirname, extname} from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import morgan from 'morgan';

//Inicializacion
const app = express();

//Esta constante se utiliza comúnmente en entornos de Node.js para obtener el directorio actual del archivo en el que se encuentra el código.
const __dirname = dirname(fileURLToPath(import.meta.url)) 
/* 
import.meta.url: Esta es una propiedad especial de JavaScript que proporciona información sobre la URL del módulo actual. En este caso, se utiliza para obtener la URL del archivo actual.

fileURLToPath(import.meta.url): Esta función convierte la URL del archivo en una ruta de archivo válida en el sistema de archivos. Por ejemplo, convierte file:///path/to/file.js en /path/to/file.js.

dirname(): Esta función es parte del módulo path de Node.js y se utiliza para obtener el directorio padre de una ruta de archivo. En este caso, se utiliza para obtener el directorio del archivo actual.

const __dirname = ...: Finalmente, se asigna el resultado de dirname(fileURLToPath(import.meta.url)) a la constante __dirname.

En resumen, este código se 
*/

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

/* 
El código que has proporcionado parece estar relacionado con la configuración de un motor de plantillas en una aplicación JavaScript utilizando npm.

En este caso, se está utilizando el paquete engine para configurar el motor de plantillas. La función app.engine() se utiliza para registrar un motor de plantillas en una aplicación Express.

El primer argumento de app.engine() es la extensión de archivo asociada al motor de plantillas. En este caso, se está utilizando la extensión .hbs. Esto significa que cuando se renderice un archivo con la extensión .hbs, Express utilizará este motor de plantillas para procesarlo.

El segundo argumento es una función que se utiliza para configurar el motor de plantillas. En este caso, se está utilizando la función engine() para configurar el motor de plantillas con varias opciones:

defaultLayout: especifica el diseño predeterminado que se utilizará para renderizar las vistas. En este caso, se está utilizando el diseño llamado "main".
layoutsDir: especifica la ubicación de los archivos de diseño. En este caso, se está utilizando la función join() para construir la ruta a la carpeta de diseños utilizando la ubicación de las vistas de la aplicación.
partialsDir: especifica la ubicación de los archivos parciales. Al igual que con layoutsDir, se utiliza la función join() para construir la ruta a la carpeta de parciales utilizando la ubicación de las vistas de la aplicación.
extname: especifica la extensión de archivo que se utilizará para los archivos de plantilla. En este caso, se está utilizando la extensión .hbs.
En resumen, este código configura el motor de plantillas en una aplicación Express para utilizar archivos con extensión .hbs, especifica el diseño predeterminado, la ubicación de los archivos de diseño y parciales, y la extensión de archivo que se utilizará para los archivos de plantilla.
*/
app.set('view engine', '.hbs');

//Middlewares, son funciones que se ejecutan antes de llegar a las rutas
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routess
app.use(express.static(join(__dirname, 'public')))

/* 
El código seleccionado muestra el uso de la función express.static() en una aplicación JavaScript con el framework Express. Esta función se utiliza para servir archivos estáticos, como archivos HTML, CSS, imágenes, etc., desde un directorio específico en el servidor.

En este caso, se utiliza la función join() del módulo path para construir la ruta absoluta al directorio "public" en el proyecto. __dirname es una variable global en Node.js que representa la ruta del directorio actual del archivo en el que se encuentra.

La función express.static() se utiliza como un middleware en Express, lo que significa que se coloca en la cadena de middleware utilizando el método use() de la aplicación app. Esto permite que Express sirva automáticamente los archivos estáticos desde el directorio especificado cuando se realiza una solicitud HTTP.

Por ejemplo, si tienes un archivo HTML llamado "index.html" en el directorio "public", puedes acceder a él en tu aplicación a través de la URL http://localhost:3000/index.html si tu servidor está escuchando en el puerto 3000.

Es importante tener en cuenta que el directorio "public" debe existir y contener los archivos estáticos que deseas servir. Además, asegúrate de que la ruta proporcionada a express.static() sea correcta y esté en relación con la ubicación del archivo app.js en tu proyecto.
*/

//Run server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});