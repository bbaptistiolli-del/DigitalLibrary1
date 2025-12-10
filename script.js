import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "login.html"; // redirect if not logged in
});

// Optional logout button
const logoutBtn = document.createElement("button");
logoutBtn.textContent = "Logout";
logoutBtn.style.position = "fixed";
logoutBtn.style.top = "10px";
logoutBtn.style.right = "10px";
logoutBtn.onclick = () => signOut(auth).then(() => window.location.href="login.html");
document.body.appendChild(logoutBtn);

// ================= Existing script.js code =================
// const books = [...];
// grid.appendChild(...);
// etc.
// ==== 14 BOOKS - Add your images + pdf names ==== //
const books = [
    {title:"Text & Test 3 (not pdf)", img:"books/book1.jpg",link:"https://my.cjfallon.ie/preview/student/10873/459"},
    { title:"Text & Test 4", img:"books/book2.jpg", pdf:"pdfs/book2.pdf" },
    { title:"Text & Test 5", img:"books/book3.jpg", link:"https://archive.org/details/texts-and-tests-5" },
    { title:"Biology", img:"books/book4.jpg", pdf:"pdfs/book7.pdf", link:"https://edcolearning.ie/Book/List" },
    { title:"Chemistry (not pdf)", img:"books/book5.jpg", link:"https://digital.folens.ie/programmes/ChemistryLive/3rdEdition/resources/GuestView/CL3_TB_FLIPBOOK/index.html#" },
    { title:"French", img:"books/book6.jpg", pdf:"pdfs/book6.pdf" },
    { title:"Business (#) ", img:"books/book7.jpg", pdf:"pdfs/book7.pdf" ,link:"https://edcolearning.ie/Book/List" },
    { title:"Spanish", img:"books/book8.jpg", pdf:"pdfs/book8.pdf" }, 
    { title:"Art", img:"books/book9.jpg", pdf:"pdfs/book9.pdf" },
    { title:"Accounting", img:"books/book10.jpg", pdf:"pdfs/book10.pdf" },
    { title:"Computer Science (not pdf)", img:"books/book11.jpg", link:"https://www.scribd.com/document/774588258/Computer-Science-Textbook-Leaving-Cert" },
    {title: "Physics (not pdf)", img:"books/book12.jpg", link:"https://digital.folens.ie/programmes/RealWorldPhysics/2ndEdition/resources/GuestView/RWP2_TB_FLIPBOOK/index.html"},
    { title:"Geography", img:"books/book13.jpg", pdf:"pdfs/book13.pdf" },
    { title:"Geography 3/6/8/9 (#)", img:"books/book25.jpg", pdf:"pdfs/book7.pdf", link:"https://edcolearning.ie/Book/List"},
    { title:"History Europe ", img:"books/book14.jpg", pdf:"pdfs/book14.pdf" },
    { title:"History Irish ", img:"books/book20.jpg", pdf:"pdfs/book20.pdf" },
    { title:"Politics & Society (not pdf)", img:"books/book15.jpg", link :"https://online.flippingbook.com/view/382976201/8/" },
    { title:"Irish OL", img:"books/book16.jpg", pdf:"pdfs/book16.pdf" },
    { title:"Irish HL", img:"books/book19.jpg", pdf:"pdfs/book19.pdf" },
     { title:"PE", img:"books/book17.jpg", pdf:"pdfs/book17.pdf" },
      { title:"Home Economics", img:"books/book18.jpg", pdf:"pdfs/book18.pdf" },
    { title:"Music ", img:"books/book21.jpg", pdf:"pdfs/book21.pdf" }, 
    { title:"Music (not a pdf)", img:"books/book26.jpg", link:"https://fliphtml5.com/erswv/coyk/Encore_LC_Composing_Skills_Book/"},
    { title:"English ", img:"books/book22.jpg", pdf:"pdfs/book22.pdf" },
    { title:"LCVP1 ", img:"books/book23.jpg", pdf:"pdfs/book23.pdf" },
     { title:"LCVP2 ", img:"books/book24.jpg", pdf:"pdfs/book24.pdf" },
      
];

const grid = document.getElementById("bookGrid");

// ================= Display Books =================
books.forEach(b=>{
    let card = document.createElement("div");
    card.className = "book";
    card.innerHTML = `
        <img src="${b.img}">
        <p>${b.title}</p>
        ${b.link ? `<a href="${b.link}" target="_blank" class="book-link">Open Link</a>` : ''}
    `;
    card.onclick = () => openPDF(b.pdf);
    grid.appendChild(card);
});


function openPDF(file){
    document.getElementById("pdfPopup").style.display="flex";
    document.getElementById("pdfFrame").src=file;
    document.getElementById("pdfDownload").href=file;
}

function closePDF(){
    document.getElementById("pdfPopup").style.display="none";
}

// ================= Upload Notes =================
function uploadNote(){
    let file=document.getElementById("fileInput").files[0];
    if(!file)return alert("Please select a PDF");
    let li=document.createElement("li");
    li.textContent=file.name;
    document.getElementById("noteList").appendChild(li);
}

// ================= Page Switch =================
function openSection(id){
    document.querySelectorAll(".page").forEach(p=>p.style.display="none");
    document.getElementById(id).style.display="block";
}