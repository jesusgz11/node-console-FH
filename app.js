import { leerDB } from './helpers/guardar-archivo.js';
import {
  confirmar,
  elegirTareas,
  inquirerMenu,
  leerInput,
  listaBorrarTareas,
  pausa,
} from './helpers/inquirer.js';
import Tareas from './models/tareas.js';

console.clear();

const main = async () => {
  let opt = '';
  const tareas = new Tareas();
  const obtenerTodasLasTareas = () => {
    return tareas.listarTareas('todas', false);
  };
  const imprimirTodasLasTareas = () => {
    tareas.listarTareas();
  };
  tareas.leerTareasDB();
  do {
    const { opcion } = await inquirerMenu();
    opt = opcion;
    switch (opcion) {
      case '1':
        const descripcion = await leerInput('Descripcion:');
        tareas.crearTarea(descripcion);
        break;
      case '2':
        imprimirTodasLasTareas();
        break;
      case '3':
        tareas.listarTareas('completadas');
        break;
      case '4':
        tareas.listarTareas('pendientes');
        break;
      case '5':
        const ids = await elegirTareas(obtenerTodasLasTareas());
        tareas.completarTareas(ids);
        break;

      case '6':
        const idBorrar = await listaBorrarTareas(obtenerTodasLasTareas());
        if (idBorrar === '0') break;
        const ok = await confirmar('¿Está seguro?');
        if (!ok) break;
        tareas.borrarTarea(idBorrar);

        break;

      default:
        break;
    }

    await pausa();
  } while (opt !== '0');
};

main();
