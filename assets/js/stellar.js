import { sdk } from './stellarSdk.js'; // Tu SDK de Stellar

export const loginWithGoogle = async () => {
  try {
    const user = await sdk.authenticateWithGoogle();
    console.log('Usuario autenticado:', user.keypair.publicKey);
    return user;
  } catch (err) {
    console.error('Error autenticación Google:', err);
  }
};

export const loginWithFacebook = async () => {
  try {
    const user = await sdk.authenticateWithFacebook();
    console.log('Usuario autenticado:', user.keypair.publicKey);
    return user;
  } catch (err) {
    console.error('Error autenticación Facebook:', err);
  }
};

export const loginWithPhone = async (phone, code) => {
  try {
    const user = await sdk.authenticateWithPhone({ phoneNumber: phone, verificationCode: code });
    console.log('Usuario autenticado:', user.keypair.publicKey);
    return user;
  } catch (err) {
    console.error('Error autenticación teléfono:', err);
  }
};

export const connectWallet = async () => {
  if (!window.freighterApi) {
    alert('Instala Freighter para conectarte');
    return;
  }

  try {
    const publicKey = await window.freighterApi.getPublicKey();
    console.log('Wallet conectada:', publicKey);
    return publicKey;
  } catch (err) {
    console.error('Error al conectar wallet:', err);
  }
};
