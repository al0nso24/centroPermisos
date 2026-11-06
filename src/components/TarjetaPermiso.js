//Tarjeta con icono dinámico: cambia de forma y color segúnel estado
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colorDeEstado, textoDeEstado } from '../constants/permisos';

//permiso = info del permiso (nombre, motivo, ícono)
//respuesta = estado devuelto por el sistema operativo
//onSolicitar = función que se ejecuta cuando se toca Activar
export default function TarjetaPermiso({ permiso, respuesta, onSolicitar }) {
    //Si respuesta todavía no existe, evita un error y status queda como undefined
    const status = respuesta?.status;
    const concedido = status === 'granted'; //es true solo si el sistema responde "granted"
    const color = colorDeEstado(status); //color correspondiente
    //Si el permiso es concedido elige el ícono activo
    const icono = concedido ? permiso.iconoActivo : permiso.iconoInactivo;

    return (
        <View style={styles.tarjeta}>
            {/*Muestra un icono de Expo Vector Icons, usando el nombre y el color*/}
            <Ionicons name={icono} size={34} color={color} />
            <View style={styles.textos}>
                <Text style={styles.nombre}>{permiso.nombre}</Text>
                <Text style={styles.motivo}>{permiso.motivo}</Text>
                <Text style={[styles.estado, {
                    color
                }]}>{textoDeEstado(status)}</Text>
            </View>
            {/*Si el permiso no es concedido*/}
            {!concedido && (
                <Pressable style={styles.boton} onPress={() => onSolicitar(permiso)}>
                    <Text style={styles.textoBoton}>Activar</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tarjeta: {
        flexDirection: 'row', //centra verticalmente los elementos
        alignItems: 'center',
        padding: 14,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },

    textos: { 
        flex: 1, 
        marginLeft: 14 
    },

    nombre: { 
        fontSize: 17, 
        fontWeight: 'bold' 
    },

    motivo: { 
        fontSize: 13, 
        color: '#555555', 
        marginTop: 2 
    },

    estado: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        marginTop: 4 
    },

    boton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#2563EB',
    },

    textoBoton: { 
        color: '#FFFFFF', 
        fontWeight: 'bold' 
    },
});