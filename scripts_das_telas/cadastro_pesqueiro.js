async function validCadasPesqueiro() {
  const nome = document.getElementById("nome-pesqueiro").value;
  const email = document.getElementById("email-pesqueiro").value;
  const cnpj = document.getElementById("cnpj-pesqueiro").value;
  const endereco = document.getElementById("endereco-pesqueiro").value;
  const telefone = document.getElementById("telefone-pesqueiro").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;
  const alvaraInput = document.getElementById("alvara-pesqueiro");
  const alvara = alvaraInput.files.length > 0 ? alvaraInput.files[0] : null;
  const mensagem = document.getElementById("mensagem");

  // Validação básica
  if (!nome || !email || !cnpj || !endereco || !telefone || !senha || !confirmarSenha) {
    mensagem.innerHTML = "<p style='color:red'>Preencha todos os campos!</p>";
    return;
  }

  if (!alvara) {
    mensagem.innerHTML = "<p style='color:red'>Anexe o alvará!</p>";
    return;
  }

  if (senha !== confirmarSenha) {
    mensagem.innerHTML = "<p style='color:red'>As senhas não coincidem!</p>";
    return;
  }

  // Enviar formulário com arquivo
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

