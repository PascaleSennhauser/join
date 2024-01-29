let contacts = [];
let letterFilters = [];

async function init() {
  await includeHTML();
  await fetchContacts();
  renderContactList();
}

async function fetchContacts() {
  //Import data from registrated users
  //const contacts = await fetch('./assets/json/contacts.json');
  try {
    contacts = JSON.parse(await getItem('contacts'));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

function clearId(id) {
  document.getElementById(id).innerHTML = '';
}

function renderContactList() {
  clearId('contacts-list');
  defineFirstLetters();
  sortLettersByAlphabet();
  renderLetterAndContacts();
}

function sortLettersByAlphabet() {
  letterFilters.sort();
}

function renderLetterAndContacts() {
  letterFilters.forEach((letter) => {
    renderLetterHtml(letter);
    renderContacts(letter);
  });
}

function renderLetterHtml(letter) {
  document.getElementById("contacts-list").innerHTML += `
    <div class="ctc-sort-letter" id="letter-${letter}">${letter}</div>
    `;
}

function renderContacts(letter) {
  contacts.forEach((contact) => {
    if (contact.firstname.charAt(0).toUpperCase() == letter) {
      renderContactHtml(contact);
    }
  });
}

function defineFirstLetters() {
  contacts.forEach((contact) => {
    const firstLetter = contact.firstname.charAt(0).toUpperCase();
    if (!letterFilters.includes(firstLetter)) {
      letterFilters.push(firstLetter);
    }
  });
}

function showContactDetail(id) {
  const contact = contacts.find((ct) => ct.contactid == id);
  const color = getBackgroundColor(id);
  renderContactDetail(contact, color);
}

function getBackgroundColor(id) {
  let elem = document
    .getElementById(`contact-${id}`)
    .querySelector(".ctc-logo");
  let bgColor = window.getComputedStyle(elem).backgroundColor;
  return bgColor;
}

function renderContactHtml(contact) {
  document.getElementById("contacts-list").innerHTML += `
        
            <div class="contact" id="contact-${contact.contactid}" onclick="showContactDetail(${contact.contactid})">
                <div class="ctc-logo">${contact.initials}</div>
                <div class="ctc-details">
                    <span class="ctc-fullname">${contact.fullname}</span>
                    <span class="ctc-email">${contact.email}</span>
                </div>
            </div>
        
    `;
}

function renderContactDetail(contact, color) {
  document.getElementById("contact-detail").innerHTML = `
            <div class="contacts-main-header">
                <div class="cmh-left">
                    <div class="cmh-logo-big" style="background-color:${color}">${contact.initials}</div>
                </div>
                <div class="cmh-right">
                    <div class="cmh-fullname">${contact.fullname}</div>
                    <div class="edit-contact">
                        <span class="edit-item" onclick="editContact(${contact.contactid})"><img src="../assets/img/edit.png">Edit</span>
                        <span class="edit-item" onclick="deleteContact(${contact.contactid})"><img src="../assets/img/delete-img.png">Delete</span>
                    </div>
                </div>
            </div>
            <div class="contacts-main-content">
                <span class="contacts-info">Contact Information</span>
                <span class="field-headline">Email</span>
                <div>
                    <a href="mailto:${contact.email}" class="ctc-email ctc-email-act">${contact.email}</a>
                </div>
                <span class="field-headline">Phone</span>
                <div>
                    <a href="tel:${contact.phone}" class="ctc-phone">${contact.phone}</a>
                </div>
            </div>
    `;
}


