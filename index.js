const characters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=", "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"]

let generatePasswordsBtn = document.querySelector("#generate-passwords-el")
let copyFirstPasswordBtn = document.querySelector("#copy-first-password-el")
let copySecondPasswordBtn = document.querySelector("#copy-second-password-el")
let firstPasswordEl = document.querySelector("#first-password-el")
let secondPasswordEl = document.querySelector("#second-password-el")
let numbersCheckboxEl = document.querySelector("#numbers-checkbox")
let symbolsCheckboxEl = document.querySelector("#symbols-checkbox")
let lengthInputEl = document.querySelector("#flength")

// Ensure both checkboxes are initially checked
symbolsCheckboxEl.checked = true
numbersCheckboxEl.checked = true

// Handle toggle switch changes
function handleToggleChange() {
    if (!numbersCheckboxEl.checked && !symbolsCheckboxEl.checked) {
        // Automatically check the other checkbox
        if (this === numbersCheckboxEl) {
            symbolsCheckboxEl.checked = true
        } else {
            numbersCheckboxEl.checked = true
        }
    } 
}

numbersCheckboxEl.addEventListener('change', handleToggleChange)
symbolsCheckboxEl.addEventListener('change', handleToggleChange)

// Handle form submission
document.querySelector("#input-form-el").addEventListener("submit", function (event) {
    event.preventDefault() // Prevent form submission (page refresh)
    generatePassword() // Call the function to generate the password
})

function generatePassword() {
    let lengthInputValue = parseInt(lengthInputEl.value)
    
    // Check for valid length input
    if (isNaN(lengthInputValue) || lengthInputValue < 1 || lengthInputValue > 20) {
        alert("Please enter a valid length between 1 and 20.")
        return  // Don't proceed if input is invalid
    }

    let passwordOne = ""
    let passwordTwo = ""
    let availableCharacters = ""

    if (numbersCheckboxEl.checked && !symbolsCheckboxEl.checked) {
        // Only numbers
        availableCharacters = characters.filter(char => char >= '0' && char <= '9')
    } else if (!numbersCheckboxEl.checked && symbolsCheckboxEl.checked) {
        // Letters and symbols only
        availableCharacters = characters.filter(char => 
            (char >= 'A' && char <= 'Z') || 
            (char >= 'a' && char <= 'z') || 
            "~`!@#$%^&*()_-+={}[],|:;<>.?/".includes(char)
        )
    } else {
        // Use all characters if both toggles are checked
        availableCharacters = characters
    }

    // Generate the passwords
    for (let i = 0; i < lengthInputValue; i++) {
        passwordOne += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
        passwordTwo += availableCharacters[Math.floor(Math.random() * availableCharacters.length)]
    }

    firstPasswordEl.textContent = passwordOne
    secondPasswordEl.textContent = passwordTwo

    // Show the copy buttons if the passwords are not empty
    if (passwordOne !== "" && passwordTwo !== "") {
        copyFirstPasswordBtn.style.display = "inline-block"
        copySecondPasswordBtn.style.display = "inline-block"
    }
}

// Copy function
function copy(el) {
    const text = el.innerText

     // Check if the password field is empty
     if (text === "" || text === "Password 1" || text === "Password 2") {
        alert("Please generate a password first.")
        return  // Don't proceed if the field is empty or default text is present
    }

    navigator.clipboard.writeText(text).then(() => {
        console.log("Text copied to clipboard!")
        el.innerText = "Copied" // Change to 'Copied'
    }).catch(err => {
        console.error("Failed to copy text: ", err)
    })

    setTimeout(() => {
        el.innerText = text // Revert text back after a delay
    }, 450)


}

copyFirstPasswordBtn.addEventListener("click", () => copy(firstPasswordEl))
copySecondPasswordBtn.addEventListener("click", () => copy(secondPasswordEl))
