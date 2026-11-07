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
  //estado = estado de cada permiso
  //aviso = mensaje si se detectó algún cambio
  //solicitar = la función para pedir un permiso
  const { estados, aviso, solicitar } = usePermisos();

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <View style={styles.contenido}>
        {/*Si permisos está activo, pasa los estados, el aviso y la función 
        para solicitar permisos*/}
        {pestana === 'permisos' ? (
          <PantallaPermisos estados={estados} aviso={aviso}
            solicitar={solicitar} />
        ) : (
          //Si no, muestra PantallaResumen y le pasa los estados
          <PantallaResumen estados={estados} />
        )}
      </View>
      {/*Cuando se toca una pestaña, BarraPestanas llama a setPestana con su id.
      Actualiza pestana y hace que se muestre la otra pantalla*/}
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