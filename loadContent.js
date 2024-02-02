// loadContent.js
document.addEventListener('DOMContentLoaded', function () {
    const contentContainer = document.getElementById('content-container');
  
    const executedScripts = new Set();

    function loadContent(page) {
        if (page !== 'pages/game.html') {
            // Check if destroyGame is available and call it
            if (typeof window.destroyGame === 'function') {
                window.destroyGame();
                executedScripts.clear();
            }
        }
        fetch(page)
            .then(response => response.text())
            .then(html => {
                contentContainer.innerHTML = html;
                console.log('Content loaded:', page);
                executeScripts(contentContainer);
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    }


    function executeScripts(container) {
        const scripts = container.querySelectorAll('script');
        scripts.forEach(script => {
            // Check if the script has the id "basketball-script" and has not been executed before
            if (script.id === 'basketball-script' && !executedScripts.has(script.id)) {
                const newScript = document.createElement('script');
                newScript.src = script.src;
                newScript.textContent = script.textContent;
                container.appendChild(newScript);
    
                // Add the script id to the set of executed scripts
                executedScripts.add(script.id);
    
                // Remove the original script to avoid duplicate execution
                script.parentNode.removeChild(script);
            }
        });
    }
    // Load the "about.html" content by default
    loadContent('pages/about.html');

    document.getElementById('about-link').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('pages/about.html');

    });

    document.getElementById('travel-link').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('pages/travel.html');
    });

    document.getElementById('inspirations-link').addEventListener('click', function (e) {
        e.preventDefault();
        
        loadContent('pages/inspirations.html');
    });

    document.getElementById('game-link').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('pages/game.html');
    });

    document.getElementById('phoebe-link').addEventListener('click', function (e) {
        e.preventDefault();
        loadContent('pages/phoebe.html');
    });

    document.body.addEventListener('click', function (event) {
        var expandedCards = document.querySelectorAll('.card.expanded');
        if (!event.target.closest('.card')) {
            expandedCards.forEach(function (card) {
                card.classList.remove('expanded');
            });
        }
    });

    const carousel = document.querySelector('.carousel');
    let scrollValue = 0;
  
    function scrollCarousel(e) {
      if (e.deltaY > 0) {
        scrollValue += 100;
      } else {
        scrollValue -= 100;
      }
  
      carousel.style.transform = `translateY(${scrollValue}px)`;
    }
  
    document.addEventListener('wheel', scrollCarousel);
});

// Function to expand the card
// Function to toggle the expanded state of a card
function expandCard(card) {
    card.classList.toggle('expanded');
}



