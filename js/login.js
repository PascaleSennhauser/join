let users = [];
let loggedInUser =[];
let guestLoggedIn = false;


/**
 * This function registers a new user.
 */
async function register() {
  let form = document.getElementById('SignUpForm');
  let mailInput = document.getElementById("registerMailInput");
  let userName = document.getElementById("registerUserName");
  let registerPassword = document.getElementById("registerPassword");
  let registerBtn = document.querySelector(".registerButton");
  event.preventDefault();

  let users = JSON.parse(await getItem('users'));

  users.push({
    email: mailInput.value,
    name: userName.value,
    password: registerPassword.value,
  });
  await setItem("users", JSON.stringify(users));
  form.reset();
  initUsers();
  successSignUpPopup();
  goBackToLoginAfterSignUp();
}


/**
 * This function loads all the users.
 */
async function initUsers() {
  await loadUsers();
}


/**
 * This function loads the users from the remote storage.
 */
async function loadUsers(){
  try {
      users = JSON.parse(await getItem('users'));
  } catch(e){
      console.error('Loading error:', e);
  }
}


/**
 * This function checks if the login is valid.
 */
async function checkLogin() {
  event.preventDefault();
  guestLoggedIn = false;
  localStorage.setItem('guest',JSON.stringify(guestLoggedIn));
  let userMail = document.getElementById('emailLoginField').value;
  let userPassword = document.getElementById('passwordLoginField').value;
  await loadUsers();
  let user = users.find(user => user.email === userMail);
  if (user && user.password === userPassword) {
    window.location.href = "summary.html";
    greetUserInSummary();
  } else {
    userNameOrPasswordIncorrect();
  }
}


/**
 * This function shows the text, when the login is incorrect.
 */
function userNameOrPasswordIncorrect() {
  let invalidText = document.getElementById('invalidText');
  invalidText.innerHTML = `False Username or Password!`;
}


/**
 * This function looks if the user is existing by the email.
 * @param {String} email - The email-address.
 * @returns {String|null} - Returns the user name, when the user is existing, otherwise null.
 */
function findUserNameByEmail(email) {
  const user = users.find(user => user.email === email);
  return user ? user.name : null;
}


/**
 * This function greets the logged in user in the summary.
 */
async function greetUserInSummary() {
  let currentMail = document.getElementById('emailLoginField').value;
  loggedInUser.push(findUserNameByEmail(currentMail));
  localStorage.setItem("userName", JSON.stringify(loggedInUser));
}


/**
 * This function opens the sign up window.
 */
function openSignUpWindow() {
  let signUpContainer = document.getElementById("loginContentContainer");
  signUpContainer.innerHTML = "";
  signUpContainer.innerHTML += renderSignUpWindow();
}


/**
 * This function shows the login window.
 */
function backToLogin() {
  let loginContainer = document.getElementById("loginContentContainer");
  loginContainer.innerHTML = "";
  loginContainer.innerHTML = renderLogin();
}


/**
 * This function opens the summary as a guest.
 */
function openWithGuestLogin() {
  guestLoggedIn = true;
  localStorage.setItem('guest',JSON.stringify(guestLoggedIn));
  window.location.href = "summary.html";
}


/**
 * This function checks if the inserted passwords and the user name are valid.
 */
function checkPasswords() {
  let userName = document.getElementById('registerUserName').value;
  let userMail = document.getElementById('registerMailInput').value;
  let signUpPassword = document.getElementById('registerPassword').value;
  let signUpConfirmPassword = document.getElementById('confirmPassword').value;
  let signUpButton = document.getElementById('signUpButton');
  let passwordsFalse = document.getElementById('signUpPasswordCheckText');
  if (signUpPassword == signUpConfirmPassword && userName.length > 0 && userMail.length > 0) {
    signUpButton.disabled = false;
    passwordsFalse.innerHTML = '';
  } else {
    passwordsFalse.innerHTML = `Password does not match`;
    signUpButton.disabled = true;
  }
}


/**
 * This function shows the pop up, when the sign up was successful.
 */
function successSignUpPopup() {
  let popupContainer = document.getElementById('successRegistration');
  popupContainer.style.display = 'flex';
  setTimeout(function() {
    popupContainer.style.display = 'none';
  }, 2500);
}


/**
 * This function goes back to the login after the sign-up.
 */
function goBackToLoginAfterSignUp() {
  setTimeout(function() {
    window.location.href = "./index.html";
  }, 3000);
}


/**
 * This function opens the privacy policy in the sign up.
 */
function openPrivacyPolicy() {
  document.getElementById('privacyPolicySignUp').classList.remove('d-none');
}


/**
 * This function closes the privacy policy in the sign up.
 */
function closePrivacyPolicy() {
  document.getElementById('privacyPolicySignUp').classList.add('d-none');
}