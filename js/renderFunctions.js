// renderfunctions:

/**
 * This function renders the sign up window.
 * @returns {HTMLTemplateElement} - Returns the html-template of the sign-up-window. 
 */
function renderSignUpWindow() {
    return /*html*/`
      <div id="signUpWindow">
        <h1 class="loginHeadline">Sign up</h1>
        <hr class="dividerSolid">
        <img src="./assets/img/arrow-left-line.png" id="signUpArrowLeft" onclick="redirectTo('../index.html')">
        <form action="#" id="SignUpForm" onsubmit="register(event)">
          <div class="inputIcon_container">
            <input type="text" required class="loginInputField" placeholder="Name" id="registerUserName"/>
            <img src="./assets/img/person.png" alt="mailicon" class="loginIcons">
          </div>
          <div class="inputIcon_container">
          <input type="email" required class="loginInputField" placeholder="Email" id="registerMailInput"/>
          <img src="./assets/img/mail.png" alt="passwordIcon" class="loginIcons">
        </div>
        <div class="inputIcon_container">
          <input type="password" required class="loginInputField" placeholder="Password" id="registerPassword" onkeyup="checkPasswords()"/>
          <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
        </div>
        <div class="inputIcon_container">
          <input type="password" required class="loginInputField" placeholder="Confirm Password" id="confirmPassword" onkeyup="checkPasswords()"/>
          <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
        </div>
        <p id="signUpPasswordCheckText"></p>
        <div class="SignUpPrivacy_container">
              <input type="checkbox" id="privacyCheckbox" required><label for="privacy" class="privacyLabel">I accept the&nbsp</label><a class="blueLinks" onclick="openPrivacyPolicy()">Privacy policy</a>
            </div>
          <div class="loginButtons_container">
            <button id="signUpButton" class="registerButton" disabled="disabled">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
      `;
  }
  

  /**
   * This function renders the login-template.
   * @returns {HTMLTemplateElement} - Returns the html-template of the login.
   */
  function renderLogin() {
    return /*html*/`
      <div class="login_container" id="loginContentContainer">
      <div id="loginWindow">
        <h1 class="loginHeadline">Log in</h1>
        <hr class="dividerSolid">
        <form action="#" id="loginForm">
          <div class="inputIcon_container">
            <input type="email" required class="loginInputField" placeholder="Email" id="emailLoginField"/>
            <img src="./assets/img/mail.png" alt="mailicon" class="loginIcons">
          </div>
          <div class="inputIcon_container">
          <input type="password" required class="loginInputField" placeholder="Password" id="passwordLoginField" />
          <img src="./assets/img/lock.png" alt="passwordIcon" class="loginIcons">
        </div>
        <div class="invalidContainer">
        <p id="invalidText"></p>
      </div>
          <div class="rememberMe_container">
            <input type="checkbox" id="rememberMe"><label for="rememberMe" class="rememberMeLabel">Remember me</label>
          </div>
          <div class="loginButtons_container">
            <button id="loginButton" onclick="checkLogin()">Log in</button>
            <button type="button" id="guestLoginButton" onclick="openWithGuestLogin()">Guest Log in</button>
          </div>
        </form>
      </div>
    </div>
    <div class="signUpContentMobile">
    <span>Not a Join user?</span>
    <button class="signUpButton" onclick="openSignUpWindow()">
      Sign up
    </button>
  </div>
  <div class="legalContentLogin">
    <a href="./legal/privacyPolicyExternal.html" class="legalContentLinksLogin" target="_blank">Privacy Policy</a>
    <a href="./legal/legalNoticeExternal.html" class="legalContentLinksLogin" target="_blank">Legal Notice</a>
  </div>
</div>

      `;
  }
  

/**
 * This function renders the summary page.
 * @returns {HTMLTemplateElement} - Returns the html-template of the summary page.
 */
function renderSummaryPageHtml() {
    return /*html*/`    
   <div class="summaryHeader">
       <h1 class="summaryHeadline">Join 360</h1>
       <div class="dividerSummaryHeader"></div> 
       <span class="summarySpan">Key Metrics at Glance</span>
       <div class="dividerSummaryHeaderMobile"></div> 
       </div>
       <div class="toDoContent_container">
       <div class="smallToDo_container">
           <div class="smallToDo_containeer smallToDo_container-1">
               <div class="dflexRow">
                  <div class="roundContainer">
                    <img src="./assets/img/editPen.svg" alt="toDoPen" class="summaryImgPen">
                  </div>
                   <div class="dflexColumn">
                       <h1 id="currentToDoNumber" class="summaryToDoTaskHeadlines"></h1>
                       <span class="summarySmallSpan">To-do</span>
                   </div>
               </div>
           </div>
           <div class="smallToDo_container">
               <div class="smallToDo_containeer  smallToDo_container-2">
                   <div class="dflexRow">
                   <div class="roundContainerDone">
                   <img src="./assets/img/Vector.svg" alt="toDoPen" class="summaryImgDone">
                 </div>
                       <div class="dflexColumn">
                           <h1 id="DoneToDos" class="summaryToDoTaskHeadlines"></h1>
                           <span class="summarySmallSpan">Done</span>
                       </div>
                   </div>
           </div>
       </div>
       </div>
       <div class="bigToDoAndGreetUser_container">
           <div class="bigToDo_container">
               <div class="urgenTaskContent_container">
                   <div class="urgentTask">
                       <img src="./assets/img/TaskUrgent.png" alt="urgentTask" class="summaryImg">
                       <div class="dflexColumn">
                           <h1 id="urgentToDos" class="summaryToDoTaskHeadlines"></h1>
                           <span class="summarySmallSpan">Urgent</span>
                       </div>
                   </div>
                   <div class="dividerUrgentTask"></div>
                   <div class="dflexColumn">
                       <h2 id="deadlineToDoDate" class="deadlineToDateStyle"></h2>
                       <span class="summarySmallSpan">Upcoming Deadline</span>
                   </div>
               </div>
           </div>
           <div class="greetUserContainer">
           <p id="greetUserHeadline">Good Morning</p>
           <p id="greetUserName">Test</p>
           </div>
       </div>
  
       <div class="taskOverview_container">
           <div class="smallTask_container">
               <div class="dflexColumn">
                   <h1 id="TasksInBoard" class="summaryToDoTaskHeadlines"></h1>
                   <span class="summarySmallSpan">Tasks in <br>
                       Board</span>
               </div>
           </div>
           <div class="smallTask_container">
               <div class="dflexColumn">
                   <h1 id="TaskInProgress" class="summaryToDoTaskHeadlines"></h1>
                   <span class="summarySmallSpan">Tasks In<br>
                       Progress</span>
               </div>
           </div>
           <div class="smallTask_container">
               <div class="dflexColumn">
                   <h1 id="TaskAwaitingFeedback" class="summaryToDoTaskHeadlines"></h1>
                   <span class="summarySmallSpan">Awaiting<br>
                       Feedback</span>
               </div>
           </div>
       </div>
   </div>
   </div>
  </div>`;
  }
  