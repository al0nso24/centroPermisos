//Catálogo: para agregar un permiso nuevo basta con añadir un objeto aquí.
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { getRecordingPermissionsAsync, requestRecordingPermissionsAsync, } from 'expo-audio';

export const PERMISOS = [
    //Cámara:
    {
        id: 'camara',
        nombre: 'Cámara',
        motivo: 'Para tomar fotos dentro de la app.',
        iconoActivo: 'camera',
        iconoInactivo: 'camera-outline',
        //Revisa si el usuario ya aceptó la cámara
        consultar: () => Camera.getCameraPermissionsAsync(),
        //Le pide permiso al usuario
        solicitar: () => Camera.requestCameraPermissionsAsync(),
    },

    //GPS:
    {
        id: 'ubicacion',
        nombre: 'GPS',
        motivo: 'Para mostrar contenido cercano a ti.',
        iconoActivo: 'location',
        iconoInactivo: 'location-outline',
        //Revisa si el usuario ya aceptó el GPS
        consultar: () => Location.getForegroundPermissionsAsync(),
        //Le pide permiso al usuario
        solicitar: () => Location.requestForegroundPermissionsAsync(),
    },

    //Micrófono:
    {
        id: 'microfono',
        nombre: 'Micrófono',
        motivo: 'Para grabar notas de voz.',
        iconoActivo: 'mic',
        iconoInactivo: 'mic-off',
        //Revisa si el usuario ya aceptó el micrófono
        consultar: () => getRecordingPermissionsAsync(),
        //Le pide permiso al usuario
        solicitar: () => requestRecordingPermissionsAsync(),
    },
];

//Colores de los estados
export const COLORES = {
    permitido: '#15803D',
    denegado: '#B91C1C',
    pendiente: '#6B7280',
};

export function colorDeEstado(status) {
    if (status === 'granted') return COLORES.permitido;
    if (status === 'denied') return COLORES.denegado;
    return COLORES.pendiente;
}

export function textoDeEstado(status) {
    if (status === 'granted') return 'Permitido';
    if (status === 'denied') return 'Denegado';
    return 'Sin solicitar';
}