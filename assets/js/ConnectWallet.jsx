import React from "react";
import { useAccount } from "../hooks/UseAccount.js";
import { requestAccess } from "@stellar/freighter-api";

export default function ConnectWallet({ onConnected }) {
const account = useAccount();

const handleConnect = async () => {
try {
const access = await requestAccess();
if (access.address) {
onConnected(access.address);
const alertBox = document.getElementById("wallet-alert");
if (alertBox) {
alertBox.className = "alert alert-success mt-3";
alertBox.textContent = `Conectado con ${access.address}`;
}
} else {
showError("No se pudo conectar con Freighter");
}
} catch (e) {
console.error(e);
showError("Error al conectar con Freighter: " + e.message);
}
};

const showError = (message) => {
const alertBox = document.getElementById("wallet-alert");
if (alertBox) {
alertBox.className = "alert alert-danger mt-3";
alertBox.textContent = message;
}
};

React.useEffect(() => {
if (account?.address) {
onConnected(account.address);
}
}, [account, onConnected]);

return ( <div className="container text-center mt-4"> <div className="card shadow-sm p-4"> <h5 className="card-title mb-3">Conexión con Wallet del Gobierno</h5>
{account?.address ? ( <p className="text-success fw-bold">
✅ Conectado con: {account.displayName} </p>
) : ( <button
         className="btn btn-primary"
         onClick={handleConnect}
       >
Conectar Wallet del Gobierno </button>
)} <div id="wallet-alert" role="alert"></div> </div> </div>
);
}