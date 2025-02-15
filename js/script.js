const folderId = '';  // Wstaw ID folderu z Google Drive. FolderID znajduje się po adresie https://drive.google.com/drive/folders/
const apiKey = '';  // Wstaw tutaj swój klucz API Google. Znajdziesz go po ustawieniu Google Cloud.
const corsProxy = "https://cors-anywhere.herokuapp.com/";

// Pobranie referencji do modala
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("fullImage");
const closeModal = document.querySelector(".close");

// Funkcja pobierająca listę plików z Google Drive
async function fetchImages() {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`;
  const response = await fetch(url);
  const data = await response.json();

  // Pobieramy wszystkie elementy z klasą 'gallery'
  const galleries = document.querySelectorAll('.gallery');

  galleries.forEach(gallery => {
    data.files.forEach(file => {
      if (file.mimeType.startsWith('image/')) {
        const imgElement = document.createElement('img');
        imgElement.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
        imgElement.alt = file.name;
        imgElement.style.width = '300px';
        imgElement.style.height = '300px';
        imgElement.style.margin = '10px';
        imgElement.style.cursor = 'pointer';
        gallery.appendChild(imgElement);
        
        // Obsługa kliknięcia - otwieranie modala
        imgElement.addEventListener('click', function () {
          modal.style.display = "block";
          modalImg.src = this.src;
        });
      } else {
        const textElement = document.createElement('p');
        textElement.textContent = `Plik: ${file.name}`;
        gallery.appendChild(textElement);
      }
    });
  });
}

// Zamknięcie modala po kliknięciu na "X"
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

// Zamknięcie modala po kliknięciu poza obraz
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Wywołanie funkcji
fetchImages().catch(error => console.error('Błąd podczas pobierania obrazów:', error));