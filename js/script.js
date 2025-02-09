const folderId = '';  // Wstaw ID folderu z Google Drive. FolderID znajduje się po adresie https://drive.google.com/drive/folders/
const apiKey = '';  // Wstaw tutaj swój klucz API Google. Znajdziesz go po ustawieniu Google Cloud.
const corsProxy = "https://cors-anywhere.herokuapp.com/";

// Funkcja pobierająca listę plików z Google Drive
async function fetchImages() {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`;
  const response = await fetch(url);
  const data = await response.json();

  const gallery = document.getElementById('gallery');

  data.files.forEach(file => {
    // Sprawdzamy, czy typ MIME to obraz
    if (file.mimeType.startsWith('image/')) {
      const imgElement = document.createElement('img');
      // URL do wyświetlenia obrazu
      imgElement.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`;
      imgElement.alt = file.name;  // Alternatywny tekst
      imgElement.style.width = '200px';  // Opcjonalnie: ustawienia stylów
      imgElement.style.margin = '10px';
      gallery.appendChild(imgElement);
      console.log('Generowany URL:', imgElement.src);
    } else {
      // Jeśli nie jest obrazem, wyświetlamy nazwę pliku jako tekst
      const textElement = document.createElement('p');
      textElement.textContent = `Plik: ${file.name}`;
      gallery.appendChild(textElement);
    }
  });
}

// Wywołanie funkcji
fetchImages().catch(error => console.error('Błąd podczas pobierania obrazów:', error));