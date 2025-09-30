async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");

  if (!email || !senha) {
    mensagem.innerHTML = "<p style='color:red'>Preencha todos os campos!</p>";
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      mensagem.innerHTML = `<p style='color:green'>${data.mensagem}</p>`;

      // ⬇ redireciona para home.html após 1.5 segundos
      setTimeout(() => {
        window.location.href = "./home.html";
      }, 700);

    } else {
      mensagem.innerHTML = `<p style='color:red'>${data.erro}</p>`;
    }

  } catch (error) {
    console.error("Erro:", error);
    mensagem.innerHTML = "<p style='color:red'>Erro de conexão com o servidor.</p>";
  }
}
