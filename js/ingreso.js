class Ingreso  extends Datos{
    static contadorIngreso = 0;
    constructor(detalles, valor){
        super(detalles, valor);
        this._id = ++Ingreso.contadorIngreso;
    }
    get id(){
        return this._id;
    }
}