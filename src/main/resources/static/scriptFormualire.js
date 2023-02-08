console.log("bonjour");

document.getElementById("enregistrer").addEventListener("click", enregistrerNouveauClient);

function enregistrerNouveauClient(event) {

    event.preventDefault();

    // On définit la catégorie à sauvegarder
    let code = document.getElementById("code").value;
    let societe = document.getElementById("societe").value;
    let contact = document.getElementById("contact").value;
    const categorieASauvegarder = {code, societe, contact};

    console.log("Données envoyées : %o", categorieASauvegarder);
    const options = {
        method: "POST",
        headers: { // On indique qu'on envoie du JSON
            "Content-Type": "application/json"
        },
        // On envoie les données au format JSON
        // dans le corps de la requête
        body: JSON.stringify(categorieASauvegarder)
    };
    fetch("api/categories", options)
    // Si pas d'erreur réseau, on convertit le json reçu en objet javascript
    .then(response => response.json())
    // On affiche le résultat (même s'il y a eu une erreur de l'API)
    .then(showResult)
    // en cas d'erreur réseau
    .catch(showError);

    }

function showResult(resultJson) {
    console.log("Réponse de l'API : %o", resultJson);
}

function showError(error) {
    console.error("L'API signale l'erreur %o", error);
}

/**
* Faire un appel AJAX avec l'API fetch
* Permet de récupérer erreur réseau et erreur de l'API
* usage :
* doAjaxRequest(url, options).then(showResult).catch(showError);
* @param {string} url L'URL de l'API
* @param {object} options Les options de la requête AJAX
* @returns {Promise} Une promesse qui sera résolue avec le résultat de l'appel AJAX
* @throws {object} Une exception qui sera levée si l'API a signalé une erreur
*/
async function doAjaxRequest(url, options) {
    // On fait l'appel AJAX
    const response = await fetch(url, options);
    // On récupère le résultat transmis en format JSON
    const result = await response.json();
    // L'API a signalé une erreur, on lève une exception
    if (!response.ok) throw result;
    // Tout s'est bien passé, on renvoie le résultat
    return result;
}
