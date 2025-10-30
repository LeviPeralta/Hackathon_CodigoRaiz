import { sdk } from './stellarSdk.js';

const googleBtn = document.getElementById('googleLogin');
const status = document.getElementById('loginStatus');

// Recuperar sesión al cargar la página
const savedUser = JSON.parse(localStorage.getItem('stellarUser'));
if (savedUser) {
  status.textContent = `Bienvenido ${savedUser.keypair?.publicKey || savedUser.publicKey}`;
}

  // Google
document.getElementById('googleLogin').addEventListener('click', async () => {
    status.textContent = "Conectando con Google...";
  try {
    const user = await sdk.authenticateWithGoogle();
    status.textContent = `Usuario autenticado: ${user.keypair.publicKey}`;

    // Guardar sesión
    localStorage.setItem('stellarUser', JSON.stringify(user));
  } catch (err) {
    status.textContent = `Error Google: ${err.message}`;
  }
});

// Facebook
document.getElementById('facebookLogin').addEventListener('click', async () => {
  try {
    const user = await sdk.authenticateWithFacebook();
    status.textContent = `Usuario autenticado: ${user.keypair.publicKey}`;

    // Guardar sesión
    localStorage.setItem('stellarUser', JSON.stringify(user));
  } catch (err) {
    status.textContent = `Error Facebook: ${err.message}`;
  }
});

// Teléfono
document.getElementById('phoneLogin').addEventListener('click', async () => {
  try {
    const phone = prompt("Ingresa tu número de teléfono");
    const code = prompt("Ingresa el código recibido");
    const user = await sdk.authenticateWithPhone({ phoneNumber: phone, verificationCode: code });
    status.textContent = `Usuario autenticado: ${user.keypair.publicKey}`;

    // Guardar sesión
    localStorage.setItem('stellarUser', JSON.stringify(user));
  } catch (err) {
    status.textContent = `Error Teléfono: ${err.message}`;
  }
});

// Wallet
document.getElementById('connectWallet').addEventListener('click', async () => {
  if (!window.freighterApi) {
    alert('Instala Freighter para conectarte');
    return;
  }
  try {
    const publicKey = await window.freighterApi.getPublicKey();
    status.textContent = `Wallet conectada: ${publicKey}`;

    // Guardar sesión de wallet
    localStorage.setItem('stellarUser', JSON.stringify({ publicKey }));
  } catch (err) {
    status.textContent = `Error Wallet: ${err.message}`;
  }
});

// -----------------------------



