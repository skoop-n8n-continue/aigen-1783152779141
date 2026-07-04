document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const playBtn = document.getElementById('play-btn');
    const gameScreen = document.getElementById('game-screen');
    const placeBtn = document.getElementById('place-btn');
    const stackContainer = document.getElementById('stack-container');
    const manContainer = document.getElementById('man-container');
    const heldBlock = document.getElementById('held-block');
    const camera = document.getElementById('camera');
    const restartBtn = document.getElementById('restart-btn');
    const blockCountDisplay = document.getElementById('block-count');

    let blockCount = 0;
    const blockHeight = 80;
    let isAnimating = false;

    // Start Game
    playBtn.addEventListener('click', () => {
        restartBtn.classList.remove('hidden');
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    });

    // Place Block
    placeBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        placeBtn.disabled = true;

        const currentStackHeight = blockCount * blockHeight;

        // Animate held block to stack
        heldBlock.style.transition = 'all 0.3s ease';
        heldBlock.style.transform = `translate(-120px, -${currentStackHeight}px)`;
        heldBlock.style.width = '80px';
        heldBlock.style.height = '80px';
        heldBlock.style.opacity = '0';

        setTimeout(() => {
            // Add block to stack
            const newBlock = document.createElement('div');
            newBlock.className = 'dirt-block';
            stackContainer.appendChild(newBlock);

            blockCount++;
            blockCountDisplay.innerText = blockCount;

            // Change background based on block count
            if (blockCount >= 40) {
                document.body.style.backgroundImage = 'url("https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n_continue%2Faigen-1783152779141%2Fassets%2Fminecraft_earth-1783158939948.png")';
            } else if (blockCount >= 30) {
                document.body.style.backgroundImage = 'url("https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n_continue%2Faigen-1783152779141%2Fassets%2Fminecraft_space-1783158502771.png")';
            } else if (blockCount >= 10) {
                document.body.style.backgroundImage = 'url("https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n_continue%2Faigen-1783152779141%2Fassets%2Fminecraft_sky-1783158287915.png")';
            }

            // Adjust camera to keep top block in view
            // Move camera down by the height of one block
            const newStackHeight = blockCount * blockHeight;
            camera.style.transform = `translateY(${newStackHeight}px)`;

            // Reset held block
            heldBlock.style.transition = 'none';
            heldBlock.style.transform = 'translate(0, 0)';
            heldBlock.style.width = '50px';
            heldBlock.style.height = '50px';
            heldBlock.style.opacity = '1';

            setTimeout(() => {
                isAnimating = false;
                placeBtn.disabled = false;
            }, 500);

        }, 300); // Wait for placing animation
    });

    // Restart Game
    restartBtn.addEventListener('click', () => {
        // Reset state variables
        blockCount = 0;
        blockCountDisplay.innerText = blockCount;
        document.body.style.backgroundImage = ''; // Reset background to CSS default
        isAnimating = false;
        placeBtn.disabled = false;

        // Reset DOM elements
        stackContainer.innerHTML = ''; // Remove all placed blocks
        camera.style.transform = `translateY(0px)`; // Reset camera

        // Reset held block position immediately
        heldBlock.style.transition = 'none';
        heldBlock.style.transform = 'translate(0, 0)';
        heldBlock.style.width = '50px';
        heldBlock.style.height = '50px';
        heldBlock.style.opacity = '1';
        
        // Hide game and show start screen
        gameScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        restartBtn.classList.add('hidden');
    });
});