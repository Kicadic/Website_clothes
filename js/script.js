
    const folderId = 'ID_FOLDERU';  // Wstaw ID folderu z Google Drive. FolderID znajduje się po adresie https://drive.google.com/drive/folders/
    const apiKey = 'TWOJ_KLUCZ_API';  // Wstaw tutaj swój klucz API Google. Znajdziesz go po ustawieniu Google Cloud.

    // Funkcja pobierająca listę plików z Google Drive
  
    // apiKey
    async function fetchImages() {
      const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType)`; 
      const response = await fetch(url);
      const data = await response.json();

      const gallery = document.getElementById('gallery');

      data.files.forEach(file => {
        if (file.mimeType.startsWith('image/')) {
          const imgElement = document.createElement('img');
          imgElement.src = `https://drive.google.com/uc?id=${file.id}`;
          imgElement.alt = file.name;
          gallery.appendChild(imgElement);
        }
      });
    }

    fetchImages().catch(error => console.error('Błąd podczas pobierania obrazów:', error));