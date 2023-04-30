import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'


const EditarCategoria = () => {
    const { id } = useParams();

    const [categoria, setCategoria] = useState({})

    useEffect(() => {
        traerCategoria(id)


    }, [])


    const traerCategoria = (id) => {
        axios.get(`https://team-14-backend-production.up.railway.app/categorias/${id}`)
            .then(response => {
                // Aquí puedes manejar la respuesta del servidor
                const [pelicula] = response.data;
                setCategoria(pelicula)
            })
            .catch(error => {
                // Aquí puedes manejar el error en caso de que falle la solicitud
                console.log(error)
                mostrarNotificacion('Pelicula no valida', 'error')
            });
    }
    const mostrarNotificacion = (message, type) => {
        if (type === 'success') {
            toast.success(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        } else if (type === 'error') {
            toast.error(message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        // obtener todos los datos del formulario como un objeto FormData
        const formData = new FormData(e.target);

        // crear un objeto vacío para almacenar los valores del formulario
        const formValues = {};

        // recorrer todos los elementos del objeto FormData y almacenar sus valores en el objeto formValues
        for (let [key, value] of formData.entries()) {
            formValues[key] = value;
        }
        console.log(formValues)
        axios.patch(`https://team-14-backend-production.up.railway.app/categorias/${id}`, formValues)
            .then(response => {
                mostrarNotificacion('Categoria modificada', 'success')
                console.log('Respuesta del servidor:', response.data);
            })
            .catch(error => {
                mostrarNotificacion('Error al modificar la categoria', 'error')
                console.error('Error en la solicitud:', error);
            });

    }
    return (
        <div className="container mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] mt-4 p-6">
            <h1 className='text-xl font-bold'>Editar categoria</h1>
            <form className='pt-4' onSubmit={submitHandler}>
                <div className="mb-6">
                    <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Titulo</label>
                    <input type="text" id="nombre" name="nombre" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Titulo pelicula" required value={categoria.nombre} onChange={(e) => setCategoria({ ...categoria, nombre: e.target.value })}
                    ></input>
                </div>

                <div className="mb-6">
                    <label htmlFor="descripcion" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Sinopsis</label>
                    <textarea id="descripcion" name="descripcion" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deja un comentario..." value={categoria.descripcion} onChange={(e) => setCategoria({ ...categoria, descripcion: e.target.value })}
                    ></textarea>
                </div>


                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar</button>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default EditarCategoria
