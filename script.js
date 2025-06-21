document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const appContainer = document.getElementById('appContainer');
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingLabel = document.getElementById('loadingLabel');
    const testerScreen = document.getElementById('testerScreen');
    const description = document.getElementById('description');
    const tryRemaining = document.getElementById('tryRemaining');
    const numberInput = document.getElementById('number');
    const text = document.getElementById('text');
    const guessButton = document.getElementById('guessNumber');
    
    // Variables du jeu
    let secretNumber = Math.floor(Math.random() * 100) + 1;
    let remainingAttempts = 10;
    let gameOver = false;
    
    // Simulation de chargement
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += 10;
        loadingLabel.textContent = `D-Guess Number - Chargement ${progress}%`;
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            loadingScreen.style.display = 'none';
            testerScreen.style.display = 'flex';
            description.textContent = `Essayez de deviner le nombre (entre 1 et 100) en seulement ${remainingAttempts} coups. SI TU PEUX !`;
        }
    }, 300);
    
    // Fonction pour vérifier le nombre
    function checkGuess() {
        if (gameOver) return;
        
        const userGuess = parseInt(numberInput.value);
        
        // Validation de l'entrée
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            text.textContent = "Veuillez entrer un nombre entre 1 et 100!";
            return;
        }
        
        remainingAttempts--;
        tryRemaining.textContent = `Essais restants: ${remainingAttempts}`;
        
        if (userGuess === secretNumber) {
            text.textContent = `Félicitations! Vous avez trouvé le nombre ${secretNumber}!`;
            text.style.color = "#4CAF50";
            endGame();
        } else if (remainingAttempts === 0) {
            text.textContent = `Game Over! Le nombre était ${secretNumber}.`;
            text.style.color = "#f44336";
            endGame();
        } else if (userGuess < secretNumber) {
            text.textContent = "Trop bas, montez un peu!";
            text.style.color = "#FF9800";
        } else {
            text.textContent = "Trop haut, descendez un peu!";
            text.style.color = "#FF9800";
        }
    }
    
    // Fonction pour terminer le jeu
    function endGame() {
        gameOver = true;
        guessButton.textContent = "Rejouer";
        guessButton.onclick = resetGame;
    }
    
    // Fonction pour réinitialiser le jeu
    function resetGame() {
        secretNumber = Math.floor(Math.random() * 100) + 1;
        remainingAttempts = 5;
        gameOver = false;
        
        text.textContent = "";
        tryRemaining.textContent = `Essais restants: ${remainingAttempts}`;
        numberInput.value = "50";
        guessButton.textContent = "Deviner";
        guessButton.onclick = checkGuess;
    }
    
    // Écouteurs d'événements
    guessButton.addEventListener('click', checkGuess);
    
    numberInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    // Focus sur l'input au chargement
    testerScreen.style.display = 'none';
    setTimeout(() => {
        if (testerScreen.style.display === 'flex') {
            numberInput.focus();
        }
    }, 3500);
});