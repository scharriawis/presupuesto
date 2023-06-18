class Egreso extends Datos{
    static contadorEgreso = 0;
    constructor(detalles, valor){
        super(detalles, valor);
        this._id = ++Egreso.contadorEgreso;
    }
    get id (){
        return this._id;
    }
}