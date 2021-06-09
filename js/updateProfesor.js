import { loadTable as refreshTable } from "./refresh-table.js";

export function updateProfesor() {

    let isValid = validarCampos();

    if (!isValid) return;
    let profesor = isValid;

    let data = new FormData();
    data.append("idprofesor", profesor.idprofesor);
    data.append("nombre", profesor.name);
    data.append("email", profesor.email);
    data.append("usuario", profesor.user);
    data.append("tipo", profesor.type);

    let headers = {
        method: "POST",
        body: data
    };

    fetch('https://alcyon-it.com/PQTM/pqtm_modificacion_profesores.php', headers)
        .then((res) => {
            if (res.ok) {
                return res.text();
            } else {
                throw "Algo ha ido mal en la llamada";
            }
        })
        .then((res) => {
            if (res.substring(0, 2) !== '00') throw res.substring(2)
            alert(res.substring(2));
            refreshTable();
        })
        .catch((error) => alert(error));
}

function validarCampos() {
    let form = document.forms.namedItem('manteniment-profesor')

    let idprofesor = parseInt(document.querySelector('#idprofesor').value)
    let name = document.querySelector('#firstName').value
    let user = document.querySelector('#user').value
    let email = document.querySelector('#email').value
    let type = document.querySelector('#type').value

    if (form.checkValidity()) {
        if (!idprofesor || !name || !user || !email || !type) {
            console.log("hay almenos un campo que no esta informado");
            return false;
        }

        let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
        if (!regex.test(form.email.value)) {
            form.email.setCustomValidity("El email no tiene el formato correcto");
            form.reportValidity();
            return false;
        }
    } else {
        form.reportValidity();
        return false;
    }

    let profesor = {}
    profesor.idprofesor = idprofesor
    profesor.name = name
    profesor.user = user
    profesor.email = email
    profesor.type = type
    return profesor;
}