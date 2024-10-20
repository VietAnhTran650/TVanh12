import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, updateDoc, deleteDoc, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];

// Fetch products from Firestore in real-time
onSnapshot(collection(db, 'products'), (snapshot) => {
    productTable.innerHTML = '';
    snapshot.forEach((docId) => {
        const row = productTable.insertRow();
        row.setAttribute('data-id', docId.id);
        row.innerHTML = `
            <td>${docId.data().name}</td>
            <td>${docId.data().price}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;

        // Edit product
        row.querySelector('.edit').addEventListener('click', () => {
            const newName = prompt("Enter new name:", docId.data().name);
            const newPrice = prompt("Enter new price:", docId.data().price);

            if (newName !== null && newPrice !== null) {
                try {
                    const productRef = doc(db, 'products', docId.id);
                    updateDoc(productRef, { name: newName, price: newPrice });
                    console.log('Product successfully updated');
                } catch (error) {
                    console.error('Error updating product: ', error);
                }
            }
        });

        // Delete product
        row.querySelector('.delete').addEventListener('click', async () => {
            const id = docId.id;
            try {
                await deleteDoc(doc(db, 'products', id));
                console.log(`Product with ID ${id} successfully deleted`);
            } catch (error) {
                console.log('Error deleting product: ', error);
            }
        });
    });
});