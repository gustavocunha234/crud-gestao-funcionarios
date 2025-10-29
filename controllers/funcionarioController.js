import db from "../src/config/db.js";

export const listarFuncionarios = (req, res) => {
  db.query("SELECT * FROM funcionarios", (err, results) => {
    if (err)
      return res.status(500).json({ erro: "Erro ao buscar Funcionarios" });
    res.json(results);
  });
};

export const inserirFuncionario = (req, res) => {
  const { nome, cargo, salario } = req.body;
  const sql = "INSERT INTO funcionarios (nome, cargo, salario) VALUES (?,?,?)";
  db.query(sql, [nome, cargo, salario], (err) => {
    if (err)
      return res.status(500).json({ erro: "Erro ao inserir Funcionario" });
    res.json({ mensagem: "Funcionario inserido com sucesso!" });
  });
};

export const atualizarFuncionario = (req, res) => {
  const { id } = req.params;
  const { nome, cargo, salario } = req.body;

  const sql = "UPDATE funcionarios set nome=?, cargo=?, salario=? WHERE id=?";
  db.query(sql, [nome, cargo, salario, id], (err) => {
    if (err)
      return res.status(500).json({ erro: "Erro ao atualizar Funcionario" });
    res.json({ mensagem: "Funcionario atualizado com sucesso!" });
  });
};

export const excluiFuncionario = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM funcionarios WHERE id=?", [id], (err) => {
    if (err)
      return res.status(500).json({ erro: "Erro ao excluir Funcionario" });
    res.json({ mensagem: "Funcionario excluido com sucesso!" });
  });
};
