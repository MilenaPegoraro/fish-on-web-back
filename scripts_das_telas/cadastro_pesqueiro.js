async function validCadasPesqueiro() {
  const nome = document.getElementById("nome-pesqueiro").value.trim();
  const email = document.getElementById("email-pesqueiro").value.trim();
  const cnpj = document.getElementById("cnpj-pesqueiro").value.trim();
  const endereco = document.getElementById("endereco-pesqueiro").value.trim();
  const telefone = document.getElementById("telefone-pesqueiro").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;
  const alvara = document.getElementById("alvara-pesqueiro").files[0];
  const mensagem = document.getElementById("mensagem");

  // Limpa mensagem anterior
  mensagem.innerHTML = "";
// comentário qualquer .
  // 1️⃣ Campos obrigatórios
  if (!nome || !email || !cnpj || !endereco || !telefone || !senha || !confirmarSenha || !alvara) {
    mensagem.innerHTML = "<p style='color:red'>Preencha todos os campos e anexe o alvará!</p>";
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

  // 4️⃣ CNPJ válido (somente números, 14 dígitos)
  const cnpjRegex = /^\d{14}$/;
  if (!cnpjRegex.test(cnpj)) {
    mensagem.innerHTML = "<p style='color:red'>CNPJ inválido. Deve conter 14 números.</p>";
    return;
  }

  // 5️⃣ Telefone válido (apenas números, mínimo 10 dígitos)
  const telefoneRegex = /^\d{10,11}$/;
  if (!telefoneRegex.test(telefone)) {
    mensagem.innerHTML = "<p style='color:red'>Telefone inválido. Apenas números e 10-11 dígitos.</p>";
    return;
  }

  // 6️⃣ Senha mínima 6 caracteres
  if (senha.length < 6) {
    mensagem.innerHTML = "<p style='color:red'>A senha deve ter no mínimo 6 caracteres.</p>";
    return;
  }

  // 7️⃣ Senhas coincidem
  if (senha !== confirmarSenha) {
    mensagem.innerHTML = "<p style='color:red'>As senhas não coincidem!</p>";
    return;
  }

  // 8️⃣ FormData para envio (incluindo arquivo)
  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("cnpj", cnpj);
  formData.append("endereco", endereco);
  formData.append("telefone", telefone);
  formData.append("senha", senha);
  formData.append("alvara", alvara);

  try {
    const resposta = await fetch("http://localhost:3000/pesqueiros", {
      method: "POST",
      body: formData
    });

    const data = await resposta.json();

    if (resposta.ok) {
      mensagem.innerHTML = `<p style='color:green'>${data.mensagem}</p>`;
      document.getElementById("form-cadastro-pesqueiro").reset();
    } else {
      mensagem.innerHTML = `<p style='color:red'>${data.erro}</p>`;
    }
  } catch (error) {
    console.error("Erro:", error);
    mensagem.innerHTML = "<p style='color:red'>Erro de conexão com o servidor.</p>";
  }
}



// function validCadasPesq() {
   
//         const j_nome = document.getElementById('inome').value
//         const j_email = document.getElementById('email').value
//         const j_senha = document.getElementById('senha').value
//         const j_cnpj = document.getElementById('cnpj').value
//         const j_endereco = document.getElementById('endereco').value
//         const j_imagem = document.getElementById('imagem').value
    
//         // console.log(j_nome, j_email, j_senha, j_cnpj, j_endereco)
    
    
//         if (j_nome == "") {
//             document.createElement("p");
//             mensagem.innerText = "Preencha o campo de nome"
//             document.getElementById("mensagem").appendChild(mensagem)
//         } else if (j_email == "") {
//             document.createElement("p");
//             mensagem.innerText = "Preencha o campo de e-mail"
//             document.getElementById("mensagem").appendChild(mensagem)
     
//         } else if (j_senha == "") {
//             document.createElement("p");
//             mensagem.innerText = "Preencha o campo de senha"
//             document.getElementById("mensagem").appendChild(mensagem)
    
//         } else if (j_cnpj == "") {
//             document.createElement("p");
//             mensagem.innerText = "Preencha o campo de CNPJ"
//             document.getElementById("mensagem").appendChild(mensagem)
      
//         } else if (j_endereco == "") {
//             document.createElement("p");
//             mensagem.innerText = "Preencha o campo de endereço"
//             document.getElementById("mensagem").appendChild(mensagem)
 
//         } else {
//             window.alert("Cadastro realizado com sucesso!")
//             window.location.href= "./login.html"
    
//         }
    
    
//     }

