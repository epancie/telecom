from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

CORS(app)

dbA = mongo.db.alumnos
dbN = mongo.db.notas

@app.route('/alumnos', methods=['POST'])
def crearAlumno():
    id = dbA.insert({
        'nombre': request.json['nombre'],
        'apellido': request.json['apellido'],
        'dni': request.json['dni'],
        'estado_civil': request.json['estado_civil'],
        'sexo': request.json['sexo'],
        'domicilio': request.json['domicilio']
    })
    return jsonify(str(ObjectId(id)))

@app.route('/alumnos', methods=['GET'])
def verAlumnos():
    alumnos = []
    for alumno in dbA.find():
        alumnos.append({
            '_id': str(ObjectId(alumno['_id'])),
            'nombre': alumno['nombre'],
            'apellido': alumno['apellido'],
            'dni': alumno['dni'],
            'estado_civil': alumno['estado_civil'],
            'sexo': alumno['sexo'],
            'domicilio': alumno['domicilio'],
        })
    return jsonify(alumnos)

@app.route('/alumno/<id>', methods=['GET'])
def verAlumno(id):
    alumno = dbA.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(alumno['_id'])),
        'nombre': alumno['nombre'],
        'apellido': alumno['apellido'],
        'dni': alumno['dni'],
        'estado_civil': alumno['estado_civil'],
        'sexo': alumno['sexo'],
        'domicilio': alumno['domicilio'],
    })

@app.route('/alumno/<id>', methods=['DELETE'])
def remAlumno(id):
    dbA.delete_one({'_id': ObjectId(id)})
    return jsonify({
        'msq': "El Alumno " + str(ObjectId(id))+" fue eliminado"
    })


@app.route('/alumno/<id>', methods=['PUT'])
def modAlumno(id):
    dbA.update_one({'_id': ObjectId(id)}, {'$set': {
        'nombre': request.json['nombre'],
        'apellido': request.json['apellido'],
        'dni': request.json['dni'],
        'estado_civil': request.json['estado_civil'],
        'sexo': request.json['sexo'],
        'domicilio': request.json['domicilio']
    }})
    return jsonify({
        'msq': "El Alumno " + str(ObjectId(id))+" fue modificado"
    })




@app.route('/notas', methods=['POST'])
def crearNotas():
    id = dbN.insert({
        'id_alumno': request.json['id_alumno'],
        'materia': request.json['materia'],
        'nota': request.json['nota']
    })
    return jsonify(str(ObjectId(id)))

@app.route('/notas/<id>', methods=['GET'])
def verNotas(id):
    ob = {}
    ob["id_alumno"]=id
#    ob["materia"]="Historia"
    notas = []
    for nota in dbN.find(ob).sort([("materia", 1), ("_id", -1)]):
        notas.append({
            '_id': str(ObjectId(nota['_id'])),
            'id_alumno': nota['id_alumno'],
            'materia': nota['materia'],
            'nota': nota['nota']
        })
    return jsonify(notas)

@app.route('/notas')
def verNotasT():
    notas = []
    for nota in dbN.find().sort([("materia", 1), ("id_alumno", 1)]):
#    ("materia",1 "id_alumno",1):
        notas.append({
            '_id': str(ObjectId(nota['_id'])),
            'id_alumno': nota['id_alumno'],
            'materia': nota['materia'],
            'nota': nota['nota']
        })
    return jsonify(notas)




if __name__ == "__main__":
    app.run(debug=True)