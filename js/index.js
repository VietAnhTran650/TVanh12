import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDm7HPwaZp9mHWxa9su0DkxezlVed_IMZY",
  authDomain: "tranvietanh-141a9.firebaseapp.com",
  projectId: "tranvietanh-141a9",
  storageBucket: "tranvietanh-141a9.appspot.com",
  messagingSenderId: "249653017996",
  appId: "1:249653017996:web:005291e07cbff7e88baaa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => { // cập nhật
  const handleSignOut = () => { //đăng xuất
    signOut(auth);
    localStorage.removeItem("displayName"); // xoá displayName
  };
  onAuthStateChanged(auth, (user) => { 
    const inforElement = document.getElementById("information"); // lấy thông tin
    const displayName = localStorage.getItem("displayName");// lấy thông tin
    console.log(displayName);

    
    
    // if (user) {
    //   const displayName = user.displayName || "User";
    //   console.log(displayName);
      
    //   const buttonSignOut = document.getElementById("buttonSignOut");// lấy thông
    //   buttonSignOut.addEventListener("click", handleSignOut); //cho btn lắng nghe sự kiện
    // } else
     if (displayName) {

      //html
      inforElement.innerHTML = `
                <div>
                    <span class='hello10'>Hello, </span>
                    <span id="displayNameokok">${displayName}</span>
                    <button id='buttonSignOut'>Sign out</button>
                </div>
            `;
      const buttonSignOut = document.getElementById("buttonSignOut");
      buttonSignOut.addEventListener("click", handleSignOut);
      // window.location.href = '.html'
    } else {
      //htmld
      inforElement.innerHTML = `
          
        `;
    }
  });
});