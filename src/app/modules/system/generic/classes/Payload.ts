export class Payload {
    body: string;
    fromProjectNumber: string;
    lockScreenVisibility: number;
    notificationID: string;
    priority: number;
    title: string;
    additionalData: AdditionalData = new AdditionalData();


}

export class AdditionalData {
    key: string;
    ruta: string;
    valor: string;
}
