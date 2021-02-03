# telecom

Clonar el proyecto
Se debe tener instalado:
1. MongoDB, https://www.mongodb.com/try/download/community
2. NodeJS y React
3. Python con virtualenv (preferentemente)

### 1. MongoDB
En el link https://www.mongodb.com/try/download/community se puede obtener e instalar MongoDB

En la carpeta raiz del proyecto se encuentrasn dos colecciones:
**alumnos.json
notas.json**

Dichas colecciones se pueden importar en la base de datos **pythonreactdb** para no tener que cargar nuevos datos

### 2. NodeJS y React

Dentro del proyecto ejecutar
```sh
$ telecom: npx create-react-app frontend
```

Dentro de la carpeta frontend instalar componentes react-router-dom y bootswatch
```sh
$ telecom/frontend: npm i react-router-dom bootswatch
```

### 3. Python con virtualenv (preferentemente)

Desde una terminal
```sh
$ pip install virtualenv
```      
Luego dentro del proyecto
```sh
$ virtualenv venv
```
''venv'' es el nombre del entorno virtual

Desde la carpeta del proyecto, ejemplo telecom/backend, para poder utilizar el entorno virtual se debe activar
```sh
$ telecom/backend: source ./venv/Scripts/activate
$ (venv) telecom/backend:
```
en windows
```sh
$ telecom\backend: .\venv\Scripts\activate.bat
$ (venv) telecom\backend:
```

Modulos requeridos
```sh
$ (venv) telecom/backend: pip install flask Flask-PyMongo flask-cors
```


## Pruebas
Se debe tener funcionando la base de datos MoangoDB
Dentro del proyecto se debe ejecutar en la carpeta backend
```sh
(venv) telecom\backend> python.exe .\src\app.py
 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 129-911-899
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Dentro del proyecto se debe ejecutar en la carpeta frontend
```sh
telecom/frontend: npm start
Compiled successfully!

You can now view frontend in the browser.        

  Local:            http://localhost:3000        
  On Your Network:  http://192.168.86.41:3000    

Note that the development build is not optimized.
To create a production build, use npm run build. 
```

## API
| Metodo | Ruta | Respuesta |
| ------ | ------ | ------ |
| GET | http://127.0.0.1:5000/alumnos | Retorna la informacion de todos los alumnos |
| GET | http://127.0.0.1:5000/alumno/60198298f152da4ae7301c4c | Retorna la informacion del alumno con id 60198298f152da4ae7301c4c |
| GET | http://127.0.0.1:5000/notas | Retorna todas las notas en la DB |
| GET | http://127.0.0.1:5000/notas/60198298f152da4ae7301c4c | Retorna las notas del id_alumno 60198298f152da4ae7301c4c |
| DELETE | http://127.0.0.1:5000/alumno/60198298f152da4ae7301c4c | Elimina al alumno con id 60198298f152da4ae7301c4c |
| PUT | http://127.0.0.1:5000/alumno/60198298f152da4ae7301c4c | Actualiza informacion del alumno con id 60198298f152da4ae7301c4c |

## POST

```
Generar un nuevo registro en la coleccion notas para el id_alumno 60198298f152da4ae7301c4c
http://127.0.0.1:5000/notas
  {
    "id_alumno": "60198298f152da4ae7301c4c",
    "materia": "Historia",
    "nota": 7
  }
```


```
Genera un nuevo registro de alumno
http://127.0.0.1:5000/alumnos
{
  "apellido": "Lopez",
  "dni": "1111111111",
  "domicilio": "Dr Mariano Moreno 1352",
  "estado_civil": "soltero",
  "nombre": "Juan Jose",
  "sexo": "masculino"
}
```


