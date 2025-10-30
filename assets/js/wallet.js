document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("connectWallet");
  const statusDiv = document.getElementById("loginStatus");

  btn.addEventListener("click", async () => {
    // 1️⃣ Verificar si la wallet existe
    if (!window.freighterApi) {
      statusDiv.innerHTML = `
        ❌ No se detectó la wallet Freighter.<br>
        <a href="https://freighter.app/" target="_blank">Instálala aquí</a>.
      `;
      return;
    }

    try {
      // 2️⃣ Solicitar clave pública
      const publicKey = await window.freighterApi.getPublicKey();

      // 3️⃣ Guardar la sesión localmente
      localStorage.setItem("stellar_publicKey", publicKey);

      // 4️⃣ Mostrar mensaje y redirigir
      statusDiv.innerHTML = `
        ✅ Wallet conectada correctamente<br>
        <small>${publicKey}</small>
      `;
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);

    } catch (err) {
      statusDiv.innerHTML = "❌ Error al conectar: " + err.message;
    }
  });
});
