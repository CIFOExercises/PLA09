import { loadTable as refreshTable } from "./refresh-table.js";
import { getProfesor } from "./getProfesor.js";
import { getAllProfesors } from "./getAllProfesors.js";
import { updateProfesor } from "./updateProfesor.js";
import { removeProfesor } from "./removeProfesor.js";
import { addProfesor } from "./addProfesor.js";

refreshTable();


document.forms.namedItem('manteniment-profesor').onsubmit = handleSubmit;

function handleSubmit(e) {
	e.preventDefault();

	switch (e.submitter.name) {
		case 'alta-formador':
			addProfesor();
			break;
		case 'modificar-formador':
			updateProfesor();
			break;
		case 'baixa-formador':
			removeProfesor();
			break;

		default:
			break;
	}
}