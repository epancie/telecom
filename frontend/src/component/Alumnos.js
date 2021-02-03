import React, { useState, useEffect } from "react";

const API = process.env.REACT_APP_API;

export const Alumnos = () => {
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [dni, setDni] = useState('')
    const [estado_civil, setEstado_civil] = useState('')
    const [sexo, setSexo] = useState('')
    const [domicilio, setDomicilio] = useState('')

    const [modificando, setModificando] = useState(false)
    const [id, setId] = useState('')

    const [alumnos, setAlumnos] = useState([])
    const [notas, setNotas] = useState([])

    const addOrUpgradeAlumno = async (e) => {
        e.preventDefault();
        if(!modificando){
            const rta = await fetch(`${API}/alumnos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    dni,
                    estado_civil,
                    sexo,
                    domicilio
                })
            })
            const data = await rta.json();
            console.log(data)
        } else {
            const rta = await fetch(`${API}/alumno/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    dni,
                    estado_civil,
                    sexo,
                    domicilio
                })
            })
            const data = await rta.json();
            console.log(data)
            setModificando(false)
            setId('')
        }
        await getAlumnos();

        setNombre('');
        setApellido('');
        setDni('');
        setEstado_civil('');
        setSexo('');
        setDomicilio('');
    }

    const getAlumnos = async () => {
        const rta = await fetch(`${API}/alumnos`)
        const data = await rta.json();
        setAlumnos(data);
    }

    const getNotas = async (id) => {
        const rta = await fetch(`${API}/notas/${id}`)
        const data = await rta.json();
        setNotas(data);

        const rta2 = await fetch(`${API}/alumno/${id}`);
        const data2 = await rta2.json();

        setNombre(data2.nombre);
        setApellido(data2.apellido);
        setDni(data2.dni);
        setEstado_civil(data2.estado_civil);
        setSexo(data2.sexo);
        setDomicilio(data2.domicilio);

        console.log(id);
        console.log(notas);
    }

    const delAlumno = async (id) => {
        const rtaWC = window.confirm('Esta seguro!?')
        if(rtaWC){
            const rta = await fetch(`${API}/alumno/${id}`, {
                method: 'DELETE'
            });
            const data = await rta.json();
            console.log(data);
            await getAlumnos();
        }
    }

    const modAlumno = async (id) => {
        const rta = await fetch(`${API}/alumno/${id}`);
        const data = await rta.json();

        setModificando(true);
        setId(data._id);

        setNombre(data.nombre);
        setApellido(data.apellido);
        setDni(data.dni);
        setEstado_civil(data.estado_civil);
        setSexo(data.sexo);
        setDomicilio(data.domicilio);
        console.log(data);
    }

    useEffect(() => {
        getAlumnos();
    }, [])

    return (
        <div className="row">
            <div className="cols-md-4">
                <form onSubmit={addOrUpgradeAlumno} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setNombre(e.target.value)} 
                            value={nombre}
                            className="form-control"
                            placeholder="Nombre"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setApellido(e.target.value)} 
                            value={apellido}
                            className="form-control"
                            placeholder="Apellido"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setDni(e.target.value)} 
                            value={dni}
                            className="form-control"
                            placeholder="DNI"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setEstado_civil(e.target.value)} 
                            value={estado_civil}
                            className="form-control"
                            placeholder="Estado Civil"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setSexo(e.target.value)} 
                            value={sexo}
                            className="form-control"
                            placeholder="Sexo"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text"
                            onChange={e => setDomicilio(e.target.value)} 
                            value={domicilio}
                            className="form-control"
                            placeholder="Domicilio"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        { modificando ? 'Modificar' : 'Crear' }
                    </button>
                </form>
            </div>
            <div className="cols-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Estado civil</th>
                            <th>Sexo</th>
                            <th>Domicilio</th>
                            <th>Acciones</th>
                            <th>Calificaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alumnos.map(alumno => (
                        <tr key={alumno._id}>
                            <td>{alumno.nombre}</td>
                            <td>{alumno.apellido}</td>
                            <td>{alumno.dni}</td>
                            <td>{alumno.estado_civil}</td>
                            <td>{alumno.sexo}</td>
                            <td>{alumno.domicilio}</td>
                            <td>
                                <button
                                    className="btn btn-secondary btn-sm btn-block"
                                    onClick={(e) => modAlumno(alumno._id)}
                                >Editar</button>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={(e) => getNotas(alumno._id)}
                                >Notas</button>
                                <button
                                    className="btn btn-danger btn-sm btn-block"
                                    onClick={(e) => delAlumno(alumno._id)}
                                >Eliminar</button>
                            </td>
                            <td></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="cols-md-12"><h3>Resumen</h3><br/>
                        <p>
                            <b>Nombre</b>: {nombre}<br/>
                            <b>Apellido</b>: {apellido}<br/>
                            <b>DNI</b>: {dni}<br/>
                            <b>Estado civil</b>: {estado_civil}<br/>
                            <b>Sexo</b>: {sexo}<br/>
                            <b>Domicilio</b>: {domicilio}<br/>
                        </p>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Nota</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notas.map(nota => (
                        <tr key={nota._id}>
                            <td>{nota.materia}</td>
                            <td>{nota.nota}</td>
                        </tr>
                        ))}
                    </tbody>
                </table></div>
            </div>
        </div>
    )
}