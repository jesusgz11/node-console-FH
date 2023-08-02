import { guardarDB, leerDB } from '../helpers/guardar-archivo.js';
import Tarea from './tarea.js';

class Tareas {
  _listado = {};

  get obtenerTareas() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const currentTarea = this._listado[key];
      listado.push(currentTarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  guardarTareasDB() {
    guardarDB(this.obtenerTareas);
  }

  leerTareasDB() {
    const data = leerDB();
    if (data) {
      this.cargarTareas(data);
    }
  }

  crearTarea(desc = '') {
    const tarea = new Tarea({ desc });
    this._listado[tarea.id] = tarea;
    this.guardarTareasDB();
  }
  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      const newTarea = new Tarea({
        id: tarea.id,
        desc: tarea.desc,
        completadoEn: tarea.completadoEn,
      });
      this._listado[newTarea.id] = newTarea;
    });
  }
  listarTareas(filter = 'todas', imprimir = true) {
    console.log();
    const tareas = this.obtenerTareas.filter(({ completadoEn }) => {
      if (filter === 'completadas') {
        return Boolean(completadoEn);
      }
      if (filter === 'pendientes') {
        return !Boolean(completadoEn);
      }
      return true;
    });

    if (!imprimir) {
      return tareas;
    }

    tareas.forEach(({ desc, completadoEn }) => {
      const status = completadoEn ? 'Completada'.green : 'Pendiente'.red;
      imprimir && console.log(`${desc} :: ${status}`);
    });
  }
  completarTareas(ids) {
    this.obtenerTareas.forEach((tarea) => {
      const currentTarea = this._listado[tarea.id];
      if (ids.includes(tarea.id)) {
        currentTarea.completar();
      } else {
        currentTarea.pendiente();
      }
    });
    this.guardarTareasDB();
  }
  borrarTarea(id) {
    if (!this._listado[id]) return;
    delete this._listado[id];
    this.guardarTareasDB();
  }
}

export default Tareas;
