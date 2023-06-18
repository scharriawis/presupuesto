const ingresos = [
    new Ingreso ('Salario', 2000),
    new Ingreso ('Venta Coche', 1500),
];

const egresos = [
    new Egreso ('Renta departamento', 900),
    new Egreso ('ropa', 400)
];

let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () =>{
    let sumaIngresos  = 0;
    for (let ingreso of ingresos){
        sumaIngresos += ingreso.valor;
    }
    return sumaIngresos;
}

let totalEgresos = () =>{
    let sumaEgresos = 0;
    for (let egreso of egresos){
        sumaEgresos += egreso.valor;
    }
    return sumaEgresos;
}

let cargarCabecero = () =>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentaje = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = moneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentaje);
    document.getElementById('ingresos').innerHTML = moneda(totalIngresos());
    document.getElementById('egresos').innerHTML = moneda(totalEgresos());
}

let moneda = (valor) =>{
    return valor.toLocaleString('es-CO', {style: 'currency', currency: 'COP', minimumFractionDigits:2});
}

let formatoPorcentaje = (valor) =>{
    return valor.toLocaleString('es-CO', {style: 'percent', minimumFractionDigits:2});
}

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for (let ingreso of ingresos){
        ingresosHTML += crearIngreso(ingreso); 
    }
    document.getElementById('listaIngreso').innerHTML = ingresosHTML;
}

const crearIngreso = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.detalles}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${moneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-outline" onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                    </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) =>{
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () =>{
    let egresosHTML = '';
    for (let egreso of egresos){
        egresosHTML += crearEgreso(egreso);
    }
    document.getElementById('listaEgreso').innerHTML = egresosHTML;
}

const crearEgreso = (egreso) =>{
    let egresoHTML =`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.detalles}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${moneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-outline" 
                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) =>{
    let indiceEliminar = egresos.findIndex (egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let detalle = forma['detalle'];
    let valor = forma['valor'];
    if (detalle.value !== '' && valor.value !== ''){
        if (tipo.value === 'ingreso'){
            ingresos.push(new Ingreso (detalle.value , +valor.value));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso (detalle.value, +valor.value)); // +valor.values espara convertir texto en numero y admite decimales example 10.5
            cargarCabecero();
            cargarEgresos();
        }
    }
}