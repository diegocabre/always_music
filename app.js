// app.js
const pool = require("./db");

async function agregarEstudiante(nombre, rut, curso, nivel) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, rut, curso, nivel]
    );
    console.log("Estudiante agregado:", res.rows[0]);
  } catch (err) {
    console.error("Error agregando estudiante:", err);
  } finally {
    client.release();
  }
}

async function obtenerEstudiantes() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM estudiantes");
    console.log("Estudiantes registrados:", res.rows);
  } catch (err) {
    console.error("Error obteniendo estudiantes:", err);
  } finally {
    client.release();
  }
}

async function obtenerEstudiantePorRut(rut) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM estudiantes WHERE rut = $1", [
      rut,
    ]);
    if (res.rows.length) {
      console.log("Estudiante encontrado:", res.rows[0]);
    } else {
      console.log("Estudiante no encontrado");
    }
  } catch (err) {
    console.error("Error obteniendo estudiante por RUT:", err);
  } finally {
    client.release();
  }
}

async function actualizarEstudiante(nombre, rut, curso, nivel) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "UPDATE estudiantes SET nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *",
      [nombre, rut, curso, nivel]
    );
    console.log("Estudiante actualizado:", res.rows[0]);
  } catch (err) {
    console.error("Error actualizando estudiante:", err);
  } finally {
    client.release();
  }
}

async function eliminarEstudiante(rut) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "DELETE FROM estudiantes WHERE rut = $1 RETURNING *",
      [rut]
    );
    if (res.rows.length) {
      console.log("Estudiante eliminado:", res.rows[0]);
    } else {
      console.log("Estudiante no encontrado");
    }
  } catch (err) {
    console.error("Error eliminando estudiante:", err);
  } finally {
    client.release();
  }
}

// Comandos desde la línea de comandos
const [, , cmd, ...args] = process.argv;

(async () => {
  switch (cmd) {
    case "agregar":
      await agregarEstudiante(args[0], args[1], args[2], args[3]);
      break;
    case "obtener":
      if (args[0]) {
        await obtenerEstudiantePorRut(args[0]);
      } else {
        await obtenerEstudiantes();
      }
      break;
    case "actualizar":
      await actualizarEstudiante(args[0], args[1], args[2], args[3]);
      break;
    case "eliminar":
      await eliminarEstudiante(args[0]);
      break;
    default:
      console.log("Comando no reconocido");
  }
})();
