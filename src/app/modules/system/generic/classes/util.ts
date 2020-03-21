import {Injectable} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {DURATION_TOAST} from './constant';
import {Payload} from './Payload';


@Injectable({
    providedIn: 'root'
})
export class Util {

    constructor(private notify: ToastController, private navCtrl: NavController) {


    }

    identificacionPayload(payload: Payload) {
        if (payload && payload.additionalData && payload.additionalData.ruta) {
            this.navCtrl.navigateForward(payload.additionalData.ruta);
        }

    }

    public isNull(value, ifnull) {
        if (value === null || value === undefined) {
            return ifnull;
        }
        return value;
    }


    public buscarObjetoPorCampo(lista: [], campo: string, valor: string) {
        let obj;
        if (!valor || valor === null) {
            return obj;
        }
        if (lista && lista.length) {

            for (let i = 0; i < lista.length; i++) {
                if (String(lista[i][campo]).trim() === String(valor).trim()) {
                    obj = lista[i];
                    break;
                }
            }
        }
        return obj;
    }


    public async presentToast(mensaje, color) {
        const toast = await this.notify.create({
            message: mensaje,
            duration: DURATION_TOAST,
            color
        });
        toast.present();
    }


    public toXML = function(json: any) {
        return null;
    };


    public listarObjetoPorCampo = function(lista: any[], campo: string, valor: string) {
        const list = [];
        if (lista) {
            for (const iterador of lista) {
                if (iterador[campo] === valor) {
                    list.push(iterador);
                }
            }
        }
        return list;
    };

    stringToDate = function(_date, _format, _delimiter) {
        const formatLowerCase = _format.toLowerCase();
        const formatItems = formatLowerCase.split(_delimiter);
        const dateItems = _date.split(_delimiter);
        const monthIndex = formatItems.indexOf('mm');
        const dayIndex = formatItems.indexOf('dd');
        const yearIndex = formatItems.indexOf('yyyy');
        let month = parseInt(dateItems[monthIndex], 2);
        month -= 1;
        const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
        return formatedDate;
    };


    stringToDateFormat = function(fecha: string): String {
        const newDate = new Date(fecha);
        return this.formatoFecha(newDate);
    };

    formatoFecha = function(fecha): string {
        if (!fecha) {
            return this.formatoFecha(new Date());
        }
        const mm = fecha.getMonth() + 1; // getMonth() is zero-based
        const dd = fecha.getDate();
        return [
            (dd > 9 ? '' : '0') + dd,
            (mm > 9 ? '' : '0') + mm,
            fecha.getFullYear()
        ].join('/');
    };


    modificarValoresBooleanos = function(lista, campo) {
        if (lista) {
            if (lista) {
                for (let i = 0; i < lista.length; i++) {
                    const valores = lista[i];
                    for (const aux in valores) {
                        if (aux === campo) {
                            lista[i][aux] = this.toBoolean(lista[i][aux]);
                        }
                    }

                }
            }
        }
        return lista;

    };


    private xmlToJsonFormat = function(xml) {
        const data = this.xmlToJson(xml);
        if (!data.root) {
            return null;
        }

        if (data.root.entidad.length) {
            return data;
        } else {
            const dato = data.root.entidad;
            data.root.entidad = [];
            data.root.entidad.push(dato);
            return data;
        }
    };

    entidadDesdeXML = function(data) {
        if (!data || data == null) {
            return null;
        }
        const parseXml = this.parseXml(data);
        const obj = this.xmlToJson(parseXml);
        if (!obj && !obj.root && !obj.root.entidad && !obj.root.entidad.row) {
            return null;
        }
        return obj.root.entidad.row;
    };

    private formatearListaXml = function(lst) {
        const lista = [];
        if (lst == null) {
            return null;
        }
        for (const entry of lst) {
            lista.push(entry.row);
        }
        return lista;
    };
    private parseXml = function(data) {
        let parser, xmlDoc;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(data, 'text/xml');
        return xmlDoc;
    };

    public listaDesdeXML = function(data) {
        const parseXml = this.parseXml(data);
        const obj = this.xmlToJsonFormat(parseXml);
        if (!obj) {
            return null;
        }
        return this.formatearListaXml(obj.root.entidad);
    };

    private xmlToJson = function(xml) {
        // Create the return object
        let obj = {};

        if (xml.nodeType === 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj['row'] = {};
                for (let j = 0; j < xml.attributes.length; j++) {
                    const attribute = xml.attributes.item(j);
                    obj['row'][attribute.nodeName.replace('_x0020_', ' ')] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }

        // do children
        if (xml.hasChildNodes()) {
            for (let i = 0; i < xml.childNodes.length; i++) {
                const item = xml.childNodes.item(i);
                const nodeName = item.nodeName;
                if (typeof (obj[nodeName]) === 'undefined') {
                    obj[nodeName] = this.xmlToJson(item);
                } else {
                    if (typeof (obj[nodeName].push) === 'undefined') {
                        const old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(this.xmlToJson(item));
                }
            }
        }
        return obj;
    };


}

