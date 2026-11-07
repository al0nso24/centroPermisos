//Pantalla 2: Resumen de los permisos activos
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PERMISOS, colorDeEstado, textoDeEstado } from '../constants/permisos';

export default function PantallaResumen({ estados }) {
    //filtrer recorre el catálogo de permisos y se queda con los que están "granted"
    //El ? evita un error si no hay una respuesta para el permiso
    const activos = PERMISOS.filter((p) => estados[p.id]?.status === 'granted');
    //Calcula que parte de los permisos está concedida
    const porcentaje = (activos.length / PERMISOS.length) * 100;

    return (
        <ScrollView contentContainerStyle={styles.contenedor}>
            <Text style={styles.titulo}>Resumen</Text>
            <View style={styles.tarjeta}>
                {/*PERMISOS.length obtiene cuántos permisos hay*/}
                <Text style={styles.total}>
                    {activos.length} de {PERMISOS.length} permisos activos
                </Text>
                {/*El ancho depende del porcentaje calculado*/}
                {/*Si el 50 % de permisos está concedido, ocupará la mitad de la barra*/}
                <View style={styles.barra}>
                    <View style={[styles.relleno, {
                        width:
                            `${porcentaje}%`
                    }]} />
                </View>
            </View>
            {/*map crea una fila por cada permiso*/}
            {PERMISOS.map((permiso) => {
                const status = estados[permiso.id]?.status;
                const concedido = status === 'granted';
                return (
                    <View key={permiso.id} style={styles.fila}>
                        <Ionicons
                        //Si está concedido, muestra un círculo con check
                            name={concedido ? 'checkmark-circle' : 'closecircle'}
                            size={26}
                            color={colorDeEstado(status)}
                        />
                        <Text
                            style={styles.nombre}>{permiso.nombre}</Text>
                        <Text style={{
                            color: colorDeEstado(status),
                            fontWeight: 'bold'
                        }}>
                            {textoDeEstado(status)}
                        </Text>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: { 
        padding: 20, 
        paddingTop: 70 
    },

    titulo: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 18
    },

    tarjeta: {
        padding: 16,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },

    total: {
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 12
    },

    barra: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#E5E7EB',
    },

    relleno: { 
        height: 10, 
        backgroundColor: '#15803D' 
    },

    fila: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },

    nombre: { 
        flex: 1, 
        fontSize: 16, 
        marginLeft: 12 
    },
});