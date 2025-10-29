const API_URL = "http://localhost:3000/funcionarios";

async function CarregarFuncionarios() {
  const response = await fetch(API_URL);
  const funcionarios = await response.json();

  const tabela = document.getElementById("tabela-funcionarios");
  tabela.innerHTML = "";

  funcionarios.forEach((func) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${func.id}</td>
    <td>${func.nome}</td>
    <td>${func.cargo}</td>
    <td>${parseFloat(func.salario).toFixed(2)}</td>
    <td>
    <button onClick="editarFuncionario(${func.id}, '${func.nome}', '${
      func.cargo
    }', '${func.salario}')">Editar</button>
    <button onClick="excluirFuncionario(${func.id})">Excluir</button>
    </td>

    `;
    tabela.appendChild(tr);
  });
}

document
  .getElementById("funcionarioForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const cargo = document.getElementById("cargo").value;
    const salario = document.getElementById("salario").value;

    const funcionario = {
      nome,
      cargo,
      salario,
    };

    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funcionario),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funcionario),
      });
    }
    e.target.reset();
    document.getElementById("id").value = "";
    CarregarFuncionarios();
  });

function editarFuncionario(id, nome, cargo, salario) {
  document.getElementById("id").value = id;
  document.getElementById("nome").value = nome;
  document.getElementById("cargo").value = cargo;
  document.getElementById("salario").value = salario;
}

async function excluirFuncionario(id) {
  if (confirm("Tem certeza que deseja excluir este funcionario")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    CarregarFuncionarios();
  }
}
CarregarFuncionarios();
