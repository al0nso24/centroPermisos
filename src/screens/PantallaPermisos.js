//Pantalla 1: Lista de permisos con sus botones
import { ScrollView, StyleSheet, Text } from 'react-native';
import TarjetaPermiso from '../components/TarjetaPermiso';
import { PERMISOS } from '../constants/permisos'; //catálogo de permisos.js
import { alertaPermisoDenegado } from '../utils/alertas'; //mensaje de alertas.js

//estados = el estado conocido de cada permiso
//aviso = un mensaje opcional, por ejemplo, si un permiso cambió desde Configuración
//solicitar = función que pide al sistema el permiso elegido
export default function PantallaPermisos({ estados, aviso, solicitar }) {
    const alPulsar = async (permiso) => {
        //Espera la respuesta del sistema
        const respuesta = await solicitar(permiso);
        if (respuesta.status !== 'granted') {
            //Muestra una alerta con el nombre y el motivo del permiso
            alertaPermisoDenegado(permiso.nombre, permiso.motivo);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.contenedor}>
            <Text style={styles.titulo}>Centro de Permisos</Text>
            <Text style={styles.subtitulo}>
                Solo pedimos un permiso cuando tú lo activas.
            </Text>
            {/*Se dibuja si no está vacío*/}
            {aviso !== '' && <Text
                style={styles.aviso}>{aviso}</Text>}
            {PERMISOS.map((permiso) => ( //map recorre el catálogo
                <TarjetaPermiso
                    key={permiso.id} //identificador único
                    permiso={permiso} //guarda los datos del permiso
                    respuesta={estados[permiso.id]} //estado actual del permiso
                    onSolicitar={alPulsar}
                />
            ))}
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
        fontWeight: 'bold' 
    },

    subtitulo: {
        fontSize: 14, 
        color: '#555555', 
        marginTop: 4,
        marginBottom: 18
    },

    aviso: {
        padding: 12,
        marginBottom: 14,
        borderRadius: 10,
        color: '#92400E',
        backgroundColor: '#FEF3C7',
    },
});