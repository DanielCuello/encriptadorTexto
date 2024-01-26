const aviso = document.querySelector(".texto-aviso");
const txtEncriptar = document.querySelector(".encriptar");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta-contenedor");
const btnCopiar = document.querySelector(".btn-copiar");
const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");

function mostrarAviso(mensaje) {
  aviso.style.background = "#0A3871";
  aviso.style.color = "#FFFF";
  aviso.style.fontWeight = "800";
  aviso.textContent = mensaje;

  setTimeout(() => {
    aviso.removeAttribute("style");
  }, 1500);
}

function validarTexto(texto) {
  if (texto === "") {
    mostrarAviso("El campo de texto no debe estar vacío");
    return false;
  }

  const txt = texto
    .normalize("NFD")
    .replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");

  if (texto !== txt) {
    mostrarAviso("No debe tener acentos y caracteres especiales");
    return false;
  }

  if (texto !== texto.toLowerCase()) {
    mostrarAviso("El texto debe ser todo en minúscula");
    return false;
  }

  return true;
}

function encriptarTexto(texto) {
  return texto
    .replace(/e/gm, "enter")
    .replace(/i/gm, "imes")
    .replace(/a/gm, "ai")
    .replace(/o/gm, "ober")
    .replace(/u/gm, "ufat");
}

function desencriptarTexto(texto) {
  return texto
    .replace(/enter/gm, "e")
    .replace(/imes/gm, "i")
    .replace(/ai/gm, "a")
    .replace(/ober/gm, "o")
    .replace(/ufat/gm, "u");
}

function actualizarInterfaz(resultado) {
  respuesta.innerHTML = resultado;
  btnCopiar.style.visibility = "inherit";
  contenido.remove();
}

btnEncriptar.addEventListener("click", (e) => {
  e.preventDefault();
  const texto = txtEncriptar.value;

  if (validarTexto(texto)) {
    const textoEncriptado = encriptarTexto(texto);
    actualizarInterfaz(textoEncriptado);
  }
});

btnDesencriptar.addEventListener("click", (e) => {
  e.preventDefault();
  const texto = txtEncriptar.value;

  if (validarTexto(texto)) {
    const textoDesencriptado = desencriptarTexto(texto);
    actualizarInterfaz(textoDesencriptado);
  }
});

btnCopiar.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    await navigator.clipboard.writeText(respuesta.innerHTML);
    console.log("Texto copiado con éxito");
  } catch (err) {
    console.error("Error al copiar el texto", err);
  }
});
