let currentInput = ""; // Variable para la entrada actual
let display; // Variable para el display
let firstOperand = "";
let operator = "";

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "usuario" && password === "contraseña") {
        alert("Inicio de sesión exitoso");
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        showMenu(); // Llamada al menú
    } else {
        alert("Credenciales incorrectas. Inténtalo de nuevo.");
    }
}

function showCalculator() {
    fetch("calculator.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("mainContent").innerHTML = data;
            setupCalculator(); // Llamada a la función de configuración de la calculadora
        });
}

function showForm() {
    fetch("form.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("mainContent").innerHTML = data;
        });
}

// Función para cargar la calculadora
function setupCalculator() {
    display = document.getElementById("display");

    // Asignación de funciones a botones de la calculadora
    document.getElementById("clearButton").addEventListener("click", clearDisplay);
    document.getElementById("addButton").addEventListener("click", () => setOperator("+"));
    document.getElementById("subtractButton").addEventListener("click", () => setOperator("-"));
    document.getElementById("multiplyButton").addEventListener("click", () => setOperator("*"));
    document.getElementById("divideButton").addEventListener("click", () => setOperator("/"));
    document.getElementById("equalsButton").addEventListener("click", calculate);

    // Números de la calculadora
    for (let i = 0; i <= 9; i++) {
        document.getElementById(`num${i}`).addEventListener("click", () => appendToDisplay(`${i}`));
    }

    document.getElementById("decimal").addEventListener("click", () => appendToDisplay('.'));
}

// Función para limpiar el display de la calculadora
function clearDisplay() {
    display.value = "";
    currentInput = "";
    firstOperand = "";
    operator = "";
}

// Función para agregar valores al display
function appendToDisplay(value) {
    console.log('appended', value)
    let currentInput = display.value || ""; // Utiliza el valor actual o un string vacío
    if (value === '.') {
        if (!currentInput.includes('.')) {
            currentInput += value;
        }
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

// Función para establecer el operador
function setOperator(op) {
    console.log('op', op)
    if (currentInput !== "") {
        firstOperand = currentInput;
        operator = op;
        currentInput = "";
    }
}

// Función para realizar cálculos
function calculate() {
    console.log('calculate');
    function calculate() {
        console.log('calculate function called');
        console.log('firstOperand:', firstOperand);
        console.log('currentInput:', currentInput);
        console.log('operator:', operator);
    
    }
    
    if (firstOperand !== "" && currentInput !== "") {
        switch (operator) {
            case "+":
                currentInput = String(parseFloat(firstOperand) + parseFloat(currentInput));
                break;
            case "-":
                currentInput = String(parseFloat(firstOperand) - parseFloat(currentInput));
                break;
            case "*":
                currentInput = String(parseFloat(firstOperand) * parseFloat(currentInput));
                break;
            case "/":
                if (parseFloat(currentInput) === 0) {
                    currentInput = "Error";
                } else {
                    currentInput = String(parseFloat(firstOperand) / parseFloat(currentInput));
                }
                break;
        }
        display.value = currentInput;
        firstOperand = "";
        operator = "";
    }
}

// Formulario
function submitForm() {
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let edad = document.getElementById("edad").value;
    let telefono = document.getElementById("telefono").value;

    if (nombre === "" || apellidos === "" || edad === "" || telefono === "") {
        alert("Por favor completa todos los campos del formulario.");
    } else {
        let infoCapturada = document.getElementById("infoCapturada");
        infoCapturada.innerHTML = `
            <p>Nombre: ${nombre}</p>
            <p>Apellidos: ${apellidos}</p>
            <p>Edad: ${edad}</p>
            <p>Teléfono: ${telefono}</p>
        `;
        alert("¡La información se ha enviado correctamente!");
        document.getElementById("nombre").value = "";
        document.getElementById("apellidos").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("telefono").value = "";
    }
}

// Llamada a la función para cargar la calculadora
document.addEventListener("DOMContentLoaded", function() {
    // Verificar si ya existe la calculadora en el DOM
    if (document.getElementById("calculator")) {
        setupCalculator(); // Llamada a la función de configuración de la calculadora
    }
});
