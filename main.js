const txtEncrypt = document.getElementById("areaEncrypt");
const txtDecrypt = document.getElementById("areaDecrypt");
const btnen = document.getElementById("btnencrypt");
const btnde = document.getElementById("btndecrypt");
const btncopy = document.getElementById("copyText");
const toastAlert = document.querySelector("#toastAlert");
let filtro = 1;

const a = "ai";
const e = "enter";
const i = "imes";
const o = "ober";
const u = "ufat";

function limpiar()
{
    txtEncrypt.value = "";
    let txt = txtDecrypt.value;
    if(txt.length > 0)
    {
        txtDecrypt.value = "";
    }
    txtEncrypt.focus();
}

function fondo(val)
{
    if( val === true)
    {
        txtDecrypt.style.background = "rgba(0, 0, 0, 0.26)";
        document.querySelector("#message").style.visibility = "hidden";
        btncopy.disabled = false;
    }
    else
    {
        txtDecrypt.style.background = "rgba(0, 0, 0, 0.26) url(images/toy.svg) center";
        txtDecrypt.style.backgroundSize = "cover";
        document.querySelector("#message").style.visibility = "visible";
    }
}

function animacion(message, color)
{
    toastAlert.style.opacity = "1";
    let pushed = `<p class="toastAlert" style="background-color: ${color};">${message}</p>`;
    toastAlert.innerHTML = pushed;
    setTimeout(() => {
        toastAlert.style.opacity = "0";
    }, 3000);
}

function validarCaracteres()
{
    let txten = txtEncrypt.value;
    if(txten.match(/[0-9]/g))
    {
        return "No admite números";
    }
    else if(txten.match(/[A-Z]/g))
    {
        return "Solo letras minúsculas";
    }
    else if(!txten.match(/^[a-z\s]+$/g))
    {
        return "No admite caracteres especiales";
    }
    return "passed"; 
}

function validarTexto()
{
    validarCaracteres();
    let txten = txtEncrypt.value;
    let texto = txten.split("");
    if(validarCaracteres() === "passed")
    {
        for(var x = 0; x < texto.length; x++)
        {
            if(texto[x]+texto[x+1] === a)
            {
                x = texto.length + 1;
            }
            else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3]+texto[x+4] === e)
            {
                x = texto.length + 1;
            }
            else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3] === i)
            {
                x = texto.length + 1;
            }
            else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3] === o)
            {
                x = texto.length + 1;
            }
            else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3] === u)
            {
                x = texto.length + 1;
            }
        }
        if(x === texto.length + 2)
        {
            filtro = 1;
        }
        else
        {
            filtro = 0;
        }
    }
    else
    {
        animacion(validarCaracteres(),"#f44336");
    }
    return filtro;
}

function encriptar()
{
    let txten = txtEncrypt.value;
    let texto = txten.split("");
    if(txten.length > 0)
    {
        if(validarCaracteres() === "passed")
        {
            for(let x = 0; x < txten.length; x++)
            {
                if(texto[x] == "a")
                {
                    texto[x] = a;
                }
                else if(texto[x] == "e")
                {
                    texto[x] = e;
                }
                else if(texto[x] == "i")
                {
                    texto[x] = i;
                }
                else if(texto[x] == "o")
                {
                    texto[x] = o;
                }
                else if(texto[x] == "u")
                {
                    texto[x] = u;
                }
            }
            txtDecrypt.value = texto.join("");
            fondo(true);
        }
        else
        {
            animacion(validarCaracteres(),"#f44336");
            txtEncrypt.focus();
        }
    }
    else
    {
        animacion("Ingresa un texto","#f44336");
        txtEncrypt.focus();
    }
}
btnen.onclick = encriptar;

function desencriptar()
{
    let txtde = txtEncrypt.value;
    let texto = txtde.split("");
    const newtxt = [];
    if(txtde.length > 0)
    {
        validarTexto();
        if(validarCaracteres() === "passed")
        {
            for(let x = 0; x < txtde.length; x++)
            {
                if(texto[x]+texto[x+1] === a)
                {
                    newtxt.push("a");
                    x+=1;
                }
                else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3]+texto[x+4] === e)
                {
                    newtxt.push("e");
                    x+=4;
                }
                else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3] === i)
                {
                    newtxt.push("i");
                    x+=3;
                }
                else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3] === o)
                {
                    newtxt.push("o");
                    x+=3;
                }
                else if(texto[x]+texto[x+1]+texto[x+2]+texto[x+3] === u)
                {
                    newtxt.push("u");
                    x+=3;
                }
                else
                {
                    newtxt.push(texto[x]);
                }
            }
            if(filtro > 0)
            {
                fondo(true);
                txtDecrypt.value = newtxt.join("");
            }
            else
            {
                fondo(false);
            }
        }
        else
        {
            txtEncrypt.focus();
        }
    }
    else
    {
        animacion("Ingresa un texto","#f44336");
        txtEncrypt.focus();
    }
}
btnde.onclick = desencriptar;

btncopy.addEventListener("click", function()
{
    let txt = txtDecrypt.value;
    navigator.clipboard.writeText(txt);
    if (txt.length > 0)
    {
        animacion("Copiado","#4caf50")
        fondo(false);
        limpiar();
    }
    else
    {
        animacion('Nada que copiar',"#a3a4a8");
    }
});