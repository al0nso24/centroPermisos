//Punto de entrada: Decide qué pestaña se muestra
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BarraPestanas from './src/components/BarraPestanas';
import { usePermisos } from './src/hooks/usePermisos';
import PantallaPermisos from './src/screens/PantallaPermisos';
import PantallaResumen from './src/screens/PantallaResumen';

export default function App() {
  const [pestana, setPestana] = useState('permisos');
  //El hook vive aquí para que ambas pantallas compartan los mismos datos
  const { estados, aviso, solicitar } = usePermisos();

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <View style={styles.contenido}>
        {pestana === 'permisos' ? (
          <PantallaPermisos estados={estados} aviso={aviso}
            solicitar={solicitar} />
        ) : (
          <PantallaResumen estados={estados} />
        )}
      </View>
      <BarraPestanas activa={pestana} onCambiar={setPestana}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: { 
    flex: 1, 
    backgroundColor: '#F6F6F6' 
  },

  contenido: { 
    flex: 1 
  },
});