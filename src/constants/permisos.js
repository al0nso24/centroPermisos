//Catálogo: para agregar un permiso nuevo basta con añadir un objeto aquí.
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { getRecordingPermissionsAsync, requestRecordingPermissionsAsync, } from 'expo-audio';

export const PERMISOS = [
    {
        id: 'camara',
        nombre: 'Cámara',
        motivo: 'Para tomar fotos dentro de la app.',
        iconoActivo: 'camera',
        iconoInactivo: 'camera-outline',
        consultar: () => Camera.getCameraPermissionsAsync(),
        solicitar: () => Camera.requestCameraPermissionsAsync(),
    },

    {
        id: 'ubicacion',
        nombre: 'GPS',
        motivo: 'Para mostrar contenido cercano a ti.',
        iconoActivo: 'location',
        iconoInactivo: 'location-outline',
        consultar: () => Location.getForegroundPermissionsAsync(),
        solicitar: () => Location.requestForegroundPermissionsAsync(),
    },

    {
        id: 'microfono',
        nombre: 'Micrófono',
        motivo: 'Para grabar notas de voz.',
        iconoActivo: 'mic',
        iconoInactivo: 'mic-off',
        consultar: () => getRecordingPermissionsAsync(),
        solicitar: () => requestRecordingPermissionsAsync(),
    },
];

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