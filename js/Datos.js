class Datos{
    constructor(detalles, valor){
        this._detalles = detalles;
        this._valor = valor;
    }
    get detalles(){
        return this._detalles;
    }
    set detalles(detalles){
        this._detalles = detalles;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor = valor;
    }
}