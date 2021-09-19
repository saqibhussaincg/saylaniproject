

// Initialize Firebase
// // firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const firestore = firebase.firestore();



// Sign Up Function Starting

const signup = () => {

    const signupUserName = document.getElementById("exampleInputUser1");
    const signupEmail = document.getElementById("exampleInputEmail1");
    const signupPassword = document.getElementById("exampleInputPassword1");


    firebase.auth().createUserWithEmailAndPassword(signupEmail.value, signupPassword.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...

            console.log(user);
            console.log(user.uid);

            const uid = user.uid;

            //database main save karwa rahey


            const member = {
                userName: signupUserName.value,
                email: signupEmail.value,
                password: signupPassword.value,
                meriChabi: uid
            };

            console.log(member);



            // firebase
            //     .database()
            //     .ref(`users/${uid}`)
            //     .set(member)
            //     .then(() => {
            //         alert("member register hogaya");
            //         location.href = "login.html";
            //     });

            firestore
                .collection("users")
                .doc(user.uid)
                .set({
                    email: user.email,
                    lastLoggedInAt: new Date()
                })
                .then(() => {
                    alert("Data passed in Database");
                });


        })

        // .catch((error) => {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     // ..

        //     alert(errorCode);
        //     alert(errorMessage);
        // });

        .catch((error) => {
            alert("Nai huwa add");
            alert(error);
        });



};

// SignUp Function End

// Login Function Starting 

function login() {

    const loginEmail = document.getElementById("exampleInputEmail");
    const loginPassword = document.getElementById("exampleInputPassword1");


    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            console.log(user.uid);
            console.log(user.email);
            location.href = "gamepage.html";

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorCode)
            alert(errorMessage)
        });

};

const gameDashboard = () => {

    const userName = document.getElementById("userName");

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid);
            console.log(user.email);
            firestore.collection('users').doc(user.uid).get()
                .then((querySnapshot) => {
                    const data = querySnapshot.data();
                    console.log(querySnapshot);
                    console.log(data);
                    userName.innerHTML = data.name;
                })
        } else {
            console.log("user is signed out");
        }
    });

};

//Game

var level = 1;
var lifeCount = 3;
var round = document.getElementById("roundNumber")
var life = document.getElementById("life")

round.innerText = level;
life.innerText = lifeCount;

let popped = 0;

document.addEventListener('mouseover', function (e) {

    if (e.target.classList.contains("bluee")) {

        e.target.style.backgroundColor = "#ededed";
        e.target.textContent = "POP!";
        popped++;
        removeEvent(e);
        checkAllPopped();
    }

    else if (e.target.classList.contains("bluee") || e.target.classList.contains("green") || e.target.classList.contains("brown") || e.target.classList.contains("pink")) {
        console.log("you mised")
        lifeCount--;
        life.innerText = lifeCount;
        if (lifeCount == 0) {
            alert("Game Over")
        }
    }
});

function removeEvent(e) {
    e.target.removeEventListener('mouseover', function () {

    })
};

function checkAllPopped() {
    if (popped === 24) {
        console.log('all popped!');
        let gallery = document.querySelector('#balloon-gallery');
        let message = document.querySelector('#yay-no-balloons');
        gallery.innerHTML = '';
        message.style.display = 'block';
        console.log("winner")
    }
};
