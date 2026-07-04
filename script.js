document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const playBtn = document.getElementById('play-btn');
    const gameScreen = document.getElementById('game-screen');
    const placeBtn = document.getElementById('place-btn');
    const stackContainer = document.getElementById('stack-container');
    const manContainer = document.getElementById('man-container');
    const heldBlock = document.getElementById('held-block');
    const camera = document.getElementById('camera');

    let blockCount = 0;
    const blockHeight = 80;
    let isAnimating = false;

    // Start Game
    playBtn.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
    });

    // Place Block
    placeBtn.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        placeBtn.disabled = true;

        // Animate held block to stack
        heldBlock.classList.add('placing');

        setTimeout(() => {
            // Add block to stack
            const newBlock = document.createElement('div');
            newBlock.className = 'dirt-block';
            stackContainer.appendChild(newBlock);

            blockCount++;

            // Reset held block
            heldBlock.classList.remove('placing');

            // Move man up to match stack height (he stays on the ground, but relative to camera he goes up if camera doesn't follow)
            // Wait, standard infinite jumper: move man up, then move camera down to follow.

            const currentStackHeight = blockCount * blockHeight;

            // Move the man up
            manContainer.style.bottom = `${100 + currentStackHeight}px`;

            // Adjust camera to keep the man and top block in view
            // Move camera down by the height of one block
            camera.style.transform = `translateY(${currentStackHeight}px)`;

            setTimeout(() => {
                isAnimating = false;
                placeBtn.disabled = false;
            }, 500); // Wait for man/camera transition

        }, 300); // Wait for placing animation
    });
});