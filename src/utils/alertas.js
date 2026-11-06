//Utilidad: alerta con la opción de abrir la configuración de la app
//Alert muestra un cuadro de diálogo
//Linking permite abrir enlaces o ajustes del sistema
import { Alert, Linking } from 'react-native';

//nombre = nombre del permiso
//motivo = para qué necesita la app ese permiso
export function alertaPermisoDenegado(nombre, motivo) {
    Alert.alert(
        `${nombre}: permiso denegado`, //título
        `${motivo} Puedes activarlo en la configuración de la app.`, //mensaje
        [
            { text: 'Ahora no', style: 'cancel' },
            {
                //Linking.openSettings() abre los ajustes del sistema para la app
                text: 'Abrir configuración', onPress: () => Linking.openSettings()
            },
        ]
    );
}