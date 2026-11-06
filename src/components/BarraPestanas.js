//Barra inferior para moverse entre las dos pantallas
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PESTANAS = [
    { id: 'permisos', titulo: 'Permisos', icono: 'shieldcheckmark' },
    { id: 'resumen', titulo: 'Resumen', icono: 'list' },
];

export default function BarraPestanas({ activa, onCambiar }) {
    return (
        <View style={styles.barra}>
            {PESTANAS.map((pestana) => {
                //Si está activo usa el color azul
                const color = pestana.id === activa ? '#2563EB' : '#6B7280';

                return (
                    <Pressable
                        key={pestana.id} //cada elemento de la lista
                        style={styles.pestana}
                        //Llama a onCambiar y le pasa el id de la pestaña tocada
                        onPress={() => onCambiar(pestana.id)}
                    >
                        <Ionicons name={pestana.icono} size={24} color={color} />
                        <Text style={[styles.texto, { color }]}>{pestana.titulo}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    //Distribuye las pestañas horizontalmente
    barra: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 34,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },

    //Hace que cada botón ocupe una parte igual del ancho y centra su contenido
    pestana: { 
        flex: 1, 
        alignItems: 'center' 
    },

    texto: { 
        fontSize: 12, 
        marginTop: 2, 
        fontWeight: '600' 
    },
});