
// Password Generator Class
class PasswordGenerator {
    constructor(length = 12, options = {}) {
        this.length = length;
        this.includeLower = options.includeLower ?? true;
        this.includeUpper = options.includeUpper ?? true;
        this.includeNumbers = options.includeNumbers ?? true;
        this.includeSymbols = options.includeSymbols ?? true;

        this.lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        this.uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.numberChars = '0123456789';
        this.symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    }

    getRandomChar(charSet) {
        return charSet[Math.floor(Math.random() * charSet.length)];
    }

    generate() {
        let availableChars = '';
        if (this.includeLower) availableChars += this.lowercaseChars;
        if (this.includeUpper) availableChars += this.uppercaseChars;
        if (this.includeNumbers) availableChars += this.numberChars;
        if (this.includeSymbols) availableChars += this.symbolChars;

        if (!availableChars) return 'Select at least one character!';

        let password = '';
        if (this.includeLower) password += this.getRandomChar(this.lowercaseChars);
        if (this.includeUpper) password += this.getRandomChar(this.uppercaseChars);
        if (this.includeNumbers) password += this.getRandomChar(this.numberChars);
        if (this.includeSymbols) password += this.getRandomChar(this.symbolChars);

        while (password.length < this.length) {
            password += this.getRandomChar(availableChars);
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');
        return password;
    }
}

// DOM Elements
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const passwordDisplay = document.getElementById('passwordDisplay');
const copyMsg = document.getElementById('copyMsg');
const strengthBar = document.querySelector('#strength div');

// Update range value display
lengthInput.addEventListener('input', () => {
    lengthValue.textContent = lengthInput.value;
});

// Generate password
generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthInput.value);
    const options = {
        includeLower: lowercaseCheckbox.checked,
        includeUpper: uppercaseCheckbox.checked,
        includeNumbers: numbersCheckbox.checked,
        includeSymbols: symbolsCheckbox.checked
    };

    const generator = new PasswordGenerator(length, options);
    const password = generator.generate();
    passwordDisplay.textContent = password;
    copyMsg.style.opacity = 0;

    // Update strength meter
    updateStrength(password);
});

// Copy password
copyBtn.addEventListener('click', () => {
    const password = passwordDisplay.textContent;
    if (!password || password === 'Your password will appear here') return;

    navigator.clipboard.writeText(password).then(() => {
        copyMsg.style.opacity = 1;
        setTimeout(() => { copyMsg.style.opacity = 0; }, 2000);
    });
});

// Password strength function
function updateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
        case 1: strengthBar.style.width = '25%'; strengthBar.className = 'weak'; break;
        case 2: strengthBar.style.width = '50%'; strengthBar.className = 'medium'; break;
        case 3: strengthBar.style.width = '75%'; strengthBar.className = 'medium'; break;
        case 4: strengthBar.style.width = '100%'; strengthBar.className = 'strong'; break;
        default: strengthBar.style.width = '0%'; break;
    }
}