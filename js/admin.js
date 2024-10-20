import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm7HPwaZp9mHWxa9su0DkxezlVed_IMZY",
  authDomain: "tranvietanh-141a9.firebaseapp.com",
  projectId: "tranvietanh-141a9",
  storageBucket: "tranvietanh-141a9.appspot.com",
  messagingSenderId: "249653017996",
  appId: "1:249653017996:web:005291e07cbff7e88baaa9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const form = document.getElementById("data-form");
const nameInput = document.getElementById("name");
const imgInput = document.getElementById("imgproduct")
const wratingInput = document.getElementById("wrating");
const priceInput = document.getElementById("price");
console.log(priceInput);

const dataList = document.getElementById("data-list");

// Add or update data in Firestore
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const price = priceInput.value;
  const img = imgInput.value;
  const wrating = wratingInput.value;

  if (form.dataset.id) {
    // Update existing document
    const id = form.dataset.id;
    try {
      const userRef = doc(db, "products", id);
      await updateDoc(userRef, { name, price });
      nameInput.value = "";
      priceInput.value = "";
      imgInput.value = "";
      wratingInput.value = "";
      form.dataset.id = "";
      form.querySelector("button").textContent = "Update";
      console.log("Document successfully updated");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } else {
    // Add new document
    try {
      await addDoc(collection(db, "products"), { name, price, img, wrating });
      nameInput.value = "";
      priceInput.value = "";
      imgInput.value = "";
      wratingInput.value = "";
      console.log("Document successfully added");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
});

// Fetch data from Firestore in real-time
onSnapshot(collection(db, "products"), (snapshot) => {
  dataList.innerHTML = "";
  snapshot.forEach((docId) => {
    const li = document.createElement("div");
    li.setAttribute("data-id", docId.id);
    li.innerHTML = `
    <span class="nameok">${docId.data().name}</span>
    <span class="priceok">${docId.data().price}</span>
    <img src="${docId.data().img}">
    <span class="wrating">${docId.data().wrating}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
`;
dataList.appendChild(li);
    // Edit data
    li.querySelector(".edit").addEventListener("click", () => {
      nameInput.value = docId.data().name;
      priceInput.value = docId.data().price;
      imgInput.value = docId.data().img;
      wratingInput.value = docId.data().wrating;
      form.dataset.id = docId.id;
      form.querySelector("button").textContent = "Update";
    });

    // Delete data
    li.querySelector(".delete").addEventListener("click", async () => {
      const id = docId.id;
      try {
        await deleteDoc(doc(db, "products", id));
        console.log(`Product with ID ${id} successfully deleted`);
      } catch (error) {
        console.log("Error deleting product: ", error);
        console.log("URL hình ảnh:", docId.data().img);
      }
    });
  });
});