import { getProfesor } from "./getProfesor.js";
import { ajaxRequest } from "./ajax.js";

export function loadTable() {
    let data = { tipoconsulta: "A" };

    let respuesta = ajaxRequest('https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php', 'post', data, 'json')

    console.log(respuesta)

    function appendTable(profesores) {

        document.querySelector(".table").innerHTML = "";
        for (const item of profesores) {
            document.querySelector(".table").innerHTML += `
                <tr class='table-item'>
                        <td>${item.idteacher}</td>
                        <td>${item.nombre}</td>
                        <td>${item.tipo === "TC" ? "Teacher" : "Administrator"}</td>
                </tr>
                `;
        }
        document.querySelectorAll(".table-item").forEach((item) => {
            item.onclick = function () {
                document.querySelectorAll(".table-item").forEach((item) => {
                    item.style.backgroundColor = "transparent";
                });
                this.style.backgroundColor = "white";
                document
                    .querySelector(".modificar-formador")
                    .removeAttribute("disabled");
                document.querySelector(".baixa-formador").removeAttribute("disabled");
                getProfesor(this.children[0].textContent);
                document.querySelector('#idprofesor').value = this.children[0].textContent;
            };
        });
    }
}