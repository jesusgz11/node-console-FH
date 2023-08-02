import { v4 as uuidv4 } from 'uuid';

class Tarea {
  id = '';
  desc = '';
  completadoEn = null;
  constructor({ desc, id, completadoEn }) {
    this.id = id || uuidv4();
    this.desc = desc;
    this.completadoEn = completadoEn || null;
  }
  completar() {
    this.completadoEn = new Date().toISOString();
  }
  pendiente() {
    this.completadoEn = null;
  }
}

export default Tarea;
