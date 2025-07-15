// Get references to DOM elements
const otpInputs = document.querySelectorAll('.otp-digit');
const otpForm = document.getElementById('otp-form');
const messageBox = document.getElementById('message');

// Expected OTP (can be replaced by backend-validated code)
const VALID_OTP = "1230";

// Focus Handling: Move to next input on input
otpInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    const value = input.value;
    if (value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  // Move back on backspace
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });

  // Prevent non-numeric input
  input.addEventListener('keypress', (e) => {
    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  });
});

// Form submission logic
otpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const enteredOTP = Array.from(otpInputs)
    .map(input => input.value.trim())
    .join('');

  if (enteredOTP.length < otpInputs.length) {
    showMessage("Please enter all digits.", "error");
    highlightInputs("error");
    return;
  }

  if (enteredOTP === VALID_OTP) {
    showMessage("✅ OTP Verified Successfully!", "success");
    highlightInputs("success");
  } else {
    showMessage("❌ Invalid OTP!", "error");
    highlightInputs("error");
  }
});

// Show message with styling
function showMessage(msg, type) {
  messageBox.textContent = msg;
  messageBox.className = `message ${type}`;
}

// Update input borders
function highlightInputs(type) {
  const colorMap = {
    success: "#4ade80", // green
    error: "#f87171"    // red
  };
  otpInputs.forEach(input => {
    input.style.borderColor = colorMap[type] || "#475569";
  });
}
