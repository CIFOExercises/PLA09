export function getProfesor(teacherId) {
    let data = new FormData();
    data.append("tipoconsulta", "P");
    data.append("id", teacherId);

    let headers = {
        method: "POST",
        body: data
    };

    fetch("https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php", headers)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw "Algo ha ido mal en la llamada";
            }
        })
        .then((res) => {
            document.querySelector("#idprofesor").value = res[0].idteacher;
            document.querySelector("#firstName").value = res[0].nombre;
            document.querySelector("#user").value = res[0].user;
            document.querySelector("#email").value = res[0].email;
            document.querySelector("#type").value = res[0].tipo;
        })
        .catch((error) => alert(error));
}