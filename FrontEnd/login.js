//Ces lignes récupèrent les info de connexion de l'utilisateur
const validerLogin = document.querySelector('.login-form');
validerLogin.addEventListener('submit');


const userLoginCredential = {
    email: event.target.querySelector("[name=e-mail").value,
    password: event.target.querySelector("[name=password]").value,
 };
 
 const userLoginAPI = {
    method : POST,
    headers : { 'Content-Type': 'application/json' },
    body: JSON.stringify(userLoginCredential),
 }

 fetch('http://localhost:5678/api/users/login', userLoginAPI)
 .then
//  La méthode serait :
//  -Récupérer les données saisies (eventlistener)
//  -Envoyer ces données par la méthode POST :  
//  verbe : POST;
//  body : Charge utile, qui serait les données;
//  header : content-type : application/json 
// exemple : 
// fetch("/pieces/1/avis", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: '{"commentaire": "Top produit !"}'
// });
