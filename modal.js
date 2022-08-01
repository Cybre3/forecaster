// Modal elements
const modalContainer = document.querySelector(".modal-body");
const continueButton = document.querySelector(".modal-continue-btn");
const modalLoadBtn = document.querySelector(".modal-load-btn");
const modalPopoverBtn = document.querySelector(".modal-popover-btn");
const challengeContainer = document.querySelector(".challenge-container");
const modalDescript = document.querySelector(".modal-descript");
let showList = false;

// Event listeners
continueButton.addEventListener("click", hideModal);
modalPopoverBtn.addEventListener("click", toggleList);

// Modal show toggle
function hideModal() {
  const app = document.querySelectorAll("button:not(#modal button), input");

  modalContainer.style.animation = "fadeout 0.4s ease-out forwards";

  setTimeout(() => {
    modalContainer.style.display = "none";
  }, 500);

  app.forEach((el) => {
    el.disabled = false;
    if (el.id === "submit") el.style.cursor = "pointer";
  });
}

// Small code list toggle
function toggleList() {
  showList ? hideSmallCodeProjList() : showSmallCodeProjList();
}

function showSmallCodeProjList() {
  const outerDiv = document.createElement("div");
  outerDiv.classList = "challenge-container";
  
  const innerDiv = document.createElement("div");
  innerDiv.classList = "arrow";
  
  const ul = document.createElement("ul");
  ul.id = "scc-options";
  
  outerDiv.appendChild(innerDiv);
  outerDiv.appendChild(ul);
  modalDescript.appendChild(outerDiv);
  
  listSmallCodeProjLinks();
  showList = true;
}

function hideSmallCodeProjList() {
  showList = false;
  modalDescript.removeChild(modalDescript.lastChild);
}

// fetch small projects local manifest
async function fetchSmallCodeProjs() {
  const response = await fetch(
    "https://kings-fisher-game-default-rtdb.firebaseio.com/manifests/smallcodechallenges.json"
    );
    
    if (!response.ok) {
    const message = `Small Code Projs error: ${response.status}`;
    throw new Error(message);
  }
  
  const links = await response.json();
  
  return links;
}

// List small code proj links
async function listSmallCodeProjLinks() {
  const sccOptions = document.querySelector("#scc-options");
  const fetchedSmallCodeProjs = await fetchSmallCodeProjs();
  const currentProjValuesArr = Object.values(fetchedSmallCodeProjs);
  // available project link logic
  const currentProjFilter = currentProjValuesArr.filter((proj) => proj.projName !== document.title);
  
  currentProjFilter.forEach((proj) => {
    const { linkName, projName } = proj;
    let li = ``;
    
    li += `<li class="link"><a href=${linkName}>${projName}</a></li>`;
    sccOptions.innerHTML += li;
  });
}