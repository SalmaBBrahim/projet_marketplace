import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/firebase';  // Assurez-vous que firebase est correctement importé

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Récupérer les produits depuis Firestore
    const fetchProducts = async () => {
      try {
        const snapshot = await firebase.firestore().collection('produits').get();
        const productList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">Liste des produits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{product.nom}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-900 font-semibold">Prix: {product.prix}€</p>
            <p className="text-gray-600">Catégorie: {product.categorie}</p>
            <p className="text-gray-600">Taille: {product.taille}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
