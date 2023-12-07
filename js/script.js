const cardsPerPage = 4; // Nombre de cartes par page
const dataContainer = document.getElementById('data-container'); // Conteneur des cartes
const pagination = document.getElementById('pagination'); // Conteneur de la pagination
const firstButton = document.getElementById('first'); // Bouton première page
const prevButton = document.getElementById('prev'); // Bouton précédent
const nextButton = document.getElementById('next'); // Bouton suivant
const lastButton = document.getElementById('last'); // Bouton dernière page
const pageNumbers = document.getElementById('page-numbers'); // Numéro de page
const pageLinks = document.querySelectorAll('.pagination .page-link'); // Liens de la pagination
	
// Récupération des cartes
const cards = 
	Array.from(dataContainer.getElementsByClassName('card')); 

const totalPages = Math.ceil(cards.length / cardsPerPage); // Nombre de pages
let currentPage = 1; // Page de départ

// Affichage des cartes
function displayPage(page) { 
	const startIndex = (page - 1) * cardsPerPage; 
	const endIndex = startIndex + cardsPerPage; 
	cards.forEach((card, index) => { 
		if (index >= startIndex && index < endIndex) { 
			card.style.display = 'block'; 
		} else { 
			card.style.display = 'none'; 
		} 
	}); 
} 

function updatePagination() {
    pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
    firstButton.disabled = currentPage === 1;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
    lastButton.disabled = currentPage === totalPages;

    // Ajout de la classe 'disabled' pour le style
    firstButton.classList.toggle('disabled', currentPage === 1);
    prevButton.classList.toggle('disabled', currentPage === 1);
    nextButton.classList.toggle('disabled', currentPage === totalPages);
    lastButton.classList.toggle('disabled', currentPage === totalPages);

    pageLinks.forEach((link) => {
        const page = parseInt(link.getAttribute('data-page'));
        link.classList.toggle('active', page === currentPage);
    });
}

firstButton.addEventListener('click', () => {
    currentPage = 1;
    displayPage(currentPage);
    updatePagination();
});

prevButton.addEventListener('click', () => { 
	if (currentPage > 1) { 
		currentPage--; 
		displayPage(currentPage); 
		updatePagination(); 
	} 
}); 

nextButton.addEventListener('click', () => { 
	if (currentPage < totalPages) { 
		currentPage++; 
		displayPage(currentPage); 
		updatePagination(); 
	} 
}); 

lastButton.addEventListener('click', () => {
    currentPage = totalPages;
    displayPage(currentPage);
    updatePagination();
});

pageLinks.forEach((link) => { 
	link.addEventListener('click', (e) => { 
		e.preventDefault(); 
		const page = parseInt(link.getAttribute('data-page')); 
		if (page !== currentPage) { 
			currentPage = page; 
			displayPage(currentPage); 
			updatePagination(); 
		} 
	}); 
}); 

// Affichage de la première page
displayPage(currentPage); 
updatePagination();