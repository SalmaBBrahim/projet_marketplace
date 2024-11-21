import { storage } from './firebaseConfig'; // Importer la configuration Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Fonction pour uploader une image et obtenir l'URL
export const uploadImage = async (file) => {
  try {
    // Créer une référence dans le stockage Firebase
    const storageRef = ref(storage, '/assets/catalogue/' + file.name);

    // Télécharger l'image dans Firebase Storage
    const uploadResult = await uploadBytes(storageRef, file);

    // Obtenir l'URL de l'image téléchargée
    const imageUrl = await getDownloadURL(uploadBytes.ref);
    return imageUrl; // Retourner l'URL de l'image
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image:", error);
    throw new Error("Erreur lors du téléchargement de l'image");
  }
};
