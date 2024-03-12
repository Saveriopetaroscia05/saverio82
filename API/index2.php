<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Users</title>
    <link rel="stylesheet" href="stile.css">
</head>

<body>
    <h1 class="tracking-in-contract-bck">Elenco Utenti</h1>
    <ul id="userList"></ul>
    <button class="apiBtn">Carica Utenti</button>

    <script>
    var usersLoaded = false; // Variabile per tracciare lo stato dei dati degli utenti

    function renderUsers(data) {
        console.log("Dati utenti ricevuti:", data); // Stampa i dati ricevuti nel log
        var userList = document.getElementById('userList');

        if (!usersLoaded) {
            userList.innerHTML = '';
            data.payload.forEach(function(user) {
                var listItem = document.createElement('li');
                listItem.textContent = 'ID: ' + user.id + ', Name: ' + user.name + ', Email: ' + user.email +
                    ', Password: ' + user.password;
                userList.appendChild(listItem);
            });
            usersLoaded = true; // Imposta il flag a true dopo aver caricato i dati degli utenti
        }
    }

    document.querySelector('.apiBtn').addEventListener('click', function(e) {
        e.preventDefault();
        if (!usersLoaded) { // Verifica se i dati degli utenti sono già stati caricati
            fetch('users.php')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Errore HTTP: ' + response.status);
                    }
                    return response.json();
                })
                .then(function(data) {
                    console.log("Dati utenti ricevuti:", data); // Stampa i dati utenti ricevuti nel log
                    renderUsers(
                        data); // Chiama la funzione per visualizzare i dati solo se non sono stati caricati
                })
                .catch(function(error) {
                    console.log("Errore:", error); // Stampa eventuali errori nel log
                });
        }
    });
    </script>

</body>

</html>