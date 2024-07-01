/**
 * This function redirects the user to a specific window.
 * @param {String} url - The name of the url.
 */
function redirectTo(url) {
  window.location.href = url;
}


/**
 * This function toggles the log out menu.
 */
function toggleLogOutMenu() {
  let logoutMenu = document.getElementById("logoutContent");
  if (logoutMenu.style.display === "none" || logoutMenu.style.display === "") {
    logoutMenu.style.display = "block";
  } else {
    logoutMenu.style.display = "none";
  }
}
