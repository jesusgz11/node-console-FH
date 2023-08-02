import inquirer from 'inquirer';
import 'colors';

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      {
        name: 'Crear tarea',
        value: '1',
      },
      {
        name: 'Listar tareas',
        value: '2',
      },
      {
        name: 'Listar tareas completadas',
        value: '3',
      },
      {
        name: 'Listar tareas pendientes',
        value: '4',
      },
      {
        name: 'Completar tarea(s)',
        value: '5',
      },
      {
        name: 'Borrar tarea',
        value: '6',
      },
      {
        name: `Salir`,
        value: '0',
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log('==============================='.green);
  console.log('  Seleccione una opción  '.green);
  console.log('===============================\n'.green);
  const data = await inquirer.prompt(preguntas);
  return data;
};

export const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`,
    },
  ];

  console.log();
  await inquirer.prompt(question);
};

export const leerInput = async (mensaje) => {
  const pregunta = [
    {
      type: 'input',
      name: 'descripcion',
      message: mensaje,
      validate(value) {
        if (!value.length) {
          return 'Por favor ingrese un valor';
        }
        return true;
      },
    },
  ];
  console.log();
  const { descripcion } = await inquirer.prompt(pregunta);
  return descripcion;
};

export const elegirTareas = async (tareas) => {
  const choices = tareas.map((tarea) => ({
    name: tarea.desc,
    value: tarea.id,
    checked: tarea.completadoEn ? true : false,
  }));
  const pregunta = [
    {
      type: 'checkbox',
      name: 'listaTareas',
      message: 'Selecciona la(s) tareas a completar',
      choices,
    },
  ];
  const { listaTareas } = await inquirer.prompt(pregunta);
  return listaTareas;
};

export const listaBorrarTareas = async (tareas = []) => {
  const choices = tareas.map((tarea) => ({
    name: tarea.desc,
    value: tarea.id,
  }));
  const pregunta = [
    {
      type: 'list',
      name: 'idBorrar',
      message: 'Selecciona una opcion',
      choices: [...choices, { value: '0', name: 'Cancelar' }],
    },
  ];
  const { idBorrar } = await inquirer.prompt(pregunta);
  return idBorrar;
};

export const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  console.log();
  const { ok } = await inquirer.prompt(question);
  return ok;
};
