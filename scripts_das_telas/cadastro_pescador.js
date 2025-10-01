async function validCadasPesc() {
  const nome = document.getElementById("nome-pescador").value.trim();
  const email = document.getElementById("email-pescador").value.trim();
  const senha = document.getElementById("senha-pescador").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;
  const mensagem = document.getElementById("mensagem");

  // Limpa mensagem anterior
  mensagem.innerHTML = "";

  // 1️⃣ Campos obrigatórios
  if (!nome || !email || !senha || !confirmarSenha) {
    mensagem.innerHTML = "<p style='color:red'>Preencha todos os campos!</p>";
    return;
  }

  // 2️⃣ Nome válido (apenas letras e mínimo 3 caracteres)
  const nomeRegex = /^[A-Za-zÀ-ú\s]{3,}$/;
  if (!nomeRegex.test(nome)) {
    mensagem.innerHTML = "<p style='color:red'>Nome inválido. Apenas letras e mínimo 3 caracteres.</p>";
    return;
  }

  // 3️⃣ Email válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    mensagem.innerHTML = "<p style='color:red'>E-mail inválido.</p>";
    return;
  }
//comentário qualquer ,
  // 4️⃣ Senha mínima 6 caracteres
  if (senha.length < 6) {
    mensagem.innerHTML = "<p style='color:red'>A senha deve ter no mínimo 6 caracteres.</p>";
    return;
  }

  // 5️⃣ Senhas coincidem
  if (senha !== confirmarSenha) {
    mensagem.innerHTML = "<p style='color:red'>As senhas não coincidem!</p>";
    return;
  }

  try {
    // Envio ao backend
    const resposta = await fetch("http://localhost:3000/pescadores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      mensagem.innerHTML = `<p style='color:green'>${data.mensagem}</p>`;
      document.getElementById("form-cadastro").reset();
    } else {
      mensagem.innerHTML = `<p style='color:red'>${data.erro}</p>`;
    }

  } catch (error) {
    console.error("Erro:", error);
    mensagem.innerHTML = "<p style='color:red'>Erro de conexão com o servidor.</p>";
  }
}




// function validCadasPesc() {
   
//     const j_nome = document.getElementById('nome-pescador').value
//     const j_email = document.getElementById('email-pescador').value
//     const j_senha = document.getElementById('senha-pescador').value
 
//     if (j_nome == "") {
//         document.createElement("p");
//         mensagem.innerText = "Preencha o campo de nome"
//         document.getElementById("mensagem").appendChild(mensagem)
//     } else if (j_email == "") {
//         document.createElement("p");
//         mensagem.innerText = "Preencha o campo de e-mail"
//         document.getElementById("mensagem").appendChild(mensagem)
 
//     } else if (j_senha == "") {
//         document.createElement("p");
//         mensagem.innerText = "Preencha o campo de senha"
//         document.getElementById("mensagem").appendChild(mensagem)
//     } else {
//      window.alert("Cadastro realizado com sucesso!")
//          window.location.href= "./login.html"
         
//     }
 
 
//  }