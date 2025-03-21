import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  ActivityIndicator 
} from 'react-native';

// Componente principal de la aplicación
export default function App() {
  // Estado para almacenar los personajes
  const [characters, setCharacters] = useState([]);
  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores en la carga de datos
  const [error, setError] = useState(null);

  // useEffect para ejecutar la función fetchCharacters una sola vez al montar el componente
  useEffect(() => {
    fetchCharacters();
  }, []);

  // Función asincrónica para obtener los personajes de la API
  const fetchCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setCharacters(data.results); // Guardamos los resultados en el estado
      setLoading(false); // Indicamos que la carga ha finalizado
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('No se pudieron cargar los personajes. Por favor, intenta más tarde.');
      setLoading(false);
    }
  };

  // Función para renderizar cada tarjeta de personaje en la lista
  const renderCharacterCard = ({ item }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.characterImage}
        resizeMode="cover"
      />
      <View style={styles.characterInfo}>
        <Text style={styles.characterName}>Nombre del Personaje: {item.name}</Text>
        <Text style={styles.characterDetail}>Estado actual: {item.status}</Text>
        <Text style={styles.characterDetail}>Especie: {item.species}</Text>
        <Text style={styles.characterDetail}>Género: {item.gender}</Text>
        <Text style={styles.characterDetail}>ID: {item.id}</Text>
        <Text style={styles.characterDetail} numberOfLines={2}>URL: {item.url}</Text>
      </View>
    </View>
  );

  // Si los datos están cargando, mostramos un indicador de carga
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#56A956" />
        <Text style={styles.loaderText}>Cargando personajes...</Text>
      </View>
    );
  }

  // Si hubo un error, mostramos un mensaje de error
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#293844" />
      
      {/* Encabezado de la aplicación */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Api React Native</Text>
        <Text style={styles.headerText}>
          Desde la Api publica de Rick and Morty, extraigo Nombre, State, Genero, Id, URL, Png
        </Text>
        <Text style={styles.headerSubtitle}>Estudiante: Juan David Escobar Corrales</Text>
      </View>

      {/* Lista de personajes usando FlatList */}
      <FlatList
        data={characters}
        renderItem={renderCharacterCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.charactersList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfd96',
  },
  header: {
    margin: 10,
    padding: 15,
    backgroundColor: '#b2e2f2',
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  charactersList: {
    padding: 10,
  },
  card: {
    backgroundColor: '#77dd77',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  characterImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  characterInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  characterDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b2e2f2',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#293844',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f00',
    textAlign: 'center',
  },
});
