// Hook personalizado: guarda los estados y escucha cambios del sistema.
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native'; //si la app está activa o vuelve al primer plano
import { PERMISOS, textoDeEstado } from '../constants/permisos';

export function usePermisos() {
    const [estados, setEstados] = useState({}); //guarda la respuesta del sistema para cada permiso
    const [aviso, setAviso] = useState(''); //guarda un mensaje cuando detecta un cambio de permiso

    //useRef guarda valores sin provocar un nuevo renderizado.
    const estadosPrevios = useRef({}); //conserva la última consulta
    const solicitando = useRef(false); //indica si la app acaba de abrir un diálogo para pedir permiso

    //useCallback mantiene la misma función entre renderizados
    const actualizar = useCallback(async () => {
        //PERMISOS es el catálogo importado desde permisos.js
        //map inicia todas las consultas
        //Promise.all espera hasta que terminen
        //Así se obtienen las respuestas de cámara, ubicación y micrófono en paralelo
        const respuestas = await Promise.all(PERMISOS.map((p) => p.consultar()));
        const nuevos = {};
        const cambios = [];
        PERMISOS.forEach((permiso, i) => {
            const actual = respuestas[i]; //respuesta actual
            const previo = estadosPrevios.current[permiso.id]; //respuesta anterior
            nuevos[permiso.id] = actual; //aquí guarda la actual

            //La condición previo && evita anunciar un cambio durante la primera consulta
            if (previo && previo.status !== actual.status) {
                cambios.push(`${permiso.nombre}: ${textoDeEstado(actual.status)}`);
            }
        });

        estadosPrevios.current = nuevos; //permite comparar en una consulta futura
        setEstados(nuevos); //actualiza los datos visibles en la interfaz

        //Si ocurre un cambio, se genera un aviso
        if (cambios.length > 0) {
            setAviso(`Cambio detectado desde Configuración → ${cambios.join(', ')}`);
        }
    }, []);

    useEffect(() => {
        actualizar();
        const suscripcion = AppState.addEventListener('change',
            (estadoApp) => {
                //Mientras se muestra un cuadro de permiso la app también "regresa";
                //esa vuelta no cuenta como un cambio hecho en Configuración.
                if (estadoApp === 'active' && !solicitando.current) {
                    actualizar();
                }
            });
        return () => suscripcion.remove();
    }, [actualizar]);

    const solicitar = useCallback(async (permiso) => {
        solicitando.current = true;
        setAviso('');
        try {
            const respuesta = await permiso.solicitar(); //abre la solicitud del sistema
            const nuevos = {
                ...estadosPrevios.current, 
                [permiso.id]: respuesta //dependiendo del id
            };
            estadosPrevios.current = nuevos;
            setEstados(nuevos);
            return respuesta;
        } finally {
            solicitando.current = false; //vuelve a false, incluso si la solicitud falla
        }
    }, []);
    
    return { estados, aviso, solicitar };
}