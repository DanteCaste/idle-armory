/*jslint browser: true*/
var dinero = 1050; // tu dinero actual
var nivelMadera=0; //indica el nivel que estan las "minas" de dicho recurso, a mayor nivel, mas ingresos de ese recurso
var dificultadMadera=1; //indica cuantos click son necesarios para obtener la ganancia de dicho recurso
var progresoMadera=0; //indica el porcentaje de click faltantes para obtener ganancia de un recurso que ya hice
var nivelHierro=0;
var dificultadHierro=2;
var progresoHierro=0;
var nivelAcero=0;
var dificultadAcero=5;
var progresoAcero=0;
var cantidadCarpinteros=0;//indica la cantidad de artesanos que tengo trabajdno en una "mina", los cuales haran click por mi, mienstras mas tenga, mas dinero
var loopMadera;//acaba va ir la funcion que se tiene que loopear para hacer trabjar a los artesanso de un recurso
var cantidadHerreros=0;
var loopHierro;
var cantidadOperarios=0;
var loopAcero;

function Recurso(){
	this.nivel=0;
	this.artesano=0;
	this.dificultad=0;
	this.ganancia;
	this.progreso=0;
	this.costo=0;//costo de subir un nivel el recurso
	this.calcularCostoArtesano;
	this.costoArtesano;
	this.calcularCostoLevear;
	this.loopArtesano;	
}
Recurso.prototype.subirNivel = function(recurso){
	//alert(this.nivel);
	if (dinero >= this.costo) {
	this.nivel++;
	dinero = dinero - this.costo;
	}
	this.calcularCostoLevear(recurso);	
	elemento = document.querySelector("#dinero");
	elemento.innerHTML = dinero;
}
Recurso.prototype.comprarArtesano = function(artesano,recurso){
	if (dinero >= this.costoArtesano){
		this.artesano=this.artesano+1;
		dinero = dinero - this.costoArtesano;
		var self = this;
		window.clearInterval(this.loopArtesano);
		this.loopArtesano = setInterval(function(){self.fabricar(recurso)},(1000/this.artesano));
	}
	this.calcularCostoArtesano(artesano);
	elemento = document.querySelector("#dinero");
	elemento.innerHTML = dinero;
}
Recurso.prototype.fabricar = function(recurso){
	if (this.nivel>0){
		this.progreso = this.progreso +(100/this.dificultad);
		if(this.progreso >= 100){
			dinero = dinero + (this.ganancia())
			var elemento = document.querySelector("#dinero");
			elemento.innerHTML =dinero;
			this.progreso=0;
		}
		var elemento = document.querySelector("#porcentaje"+recurso);
		elemento.innerHTML = this.progreso;
	}
}

function setRecurso(mina,recurso,artesano){	//A esta funcion le paso como parametros, la instancia de la mina de un recurso, el nombre del artesano, el nombre del recurso, y lo linkea con los eventos correspondientes
	mina.calcularCostoLevear(recurso);
    var elemento;
    elemento = document.querySelector("#fabricar" + recurso);
    elemento.addEventListener('click', function(){mina.fabricar(recurso)}, false);
	elemento = document.querySelector("#levear" + recurso);
    elemento.addEventListener('click', function(){mina.subirNivel(recurso)}, false);//HACER ESTO EN TODOS!!!!	
	elemento = document.querySelector("#porcentaje" + recurso);
	elemento.innerHTML = mina.progreso;    
    mina.calcularCostoArtesano(artesano);
    elemento = document.querySelector("#comprar" + artesano);
    elemento.addEventListener('click', function(){mina.comprarArtesano(artesano,recurso)}, false);    
    elemento = document.querySelector("#cantidad" + artesano);    
    elemento.innerHTML = mina.artesano;   
    elemento = document.querySelector("#costo" + artesano);
    elemento.innerHTML = mina.costoArtesano;
}

var minaMadera = new Recurso(); //Instanciacion de minaMadera
minaMadera.dificultad=1;
minaMadera.calcularCostoLevear = function (recurso){ // el costo de aumentar en uno el nivel de la "mina" de dicho recurso
    this.costo = 10*Math.pow(2,this.nivel);
    var elemento = document.querySelector("#costo"+ recurso);
	elemento.innerHTML = this.costo;
        
}

minaMadera.calcularCostoArtesano = function(artesano){
	var costoArtesanoCalculado = 75*Math.pow(3,this.artesano);
	this.costoArtesano = costoArtesanoCalculado;
	var elemento = document.querySelector("#cantidad"+artesano);
    elemento.innerHTML = this.artesano;
    elemento = document.querySelector("#dinero");
	elemento.innerHTML = dinero;
	elemento = document.querySelector("#costo"+artesano);
    elemento.innerHTML = this.costoArtesano;
}
minaMadera.ganancia=function(){
	return this.nivel*2;
}
minaHierro = new Recurso(); //Instanciacion de minaHierro
minaHierro.dificultad = 2;
minaHierro.calcularCostoLevear = function (recurso){ // el costo de aumentar en uno el nivel de la "mina" de dicho recurso
    this.costo = 100*Math.pow(2,this.nivel);
    var elemento = document.querySelector("#costo"+ recurso);
	elemento.innerHTML = this.costo;       
}
minaHierro.calcularCostoArtesano = function(artesano){
	var costoArtesanoCalculado = 100*Math.pow(3,this.artesano);
	this.costoArtesano = costoArtesanoCalculado;
	var elemento = document.querySelector("#cantidad"+artesano);
    elemento.innerHTML = this.artesano;
    elemento = document.querySelector("#dinero");
	elemento.innerHTML = dinero;
	elemento = document.querySelector("#costo"+artesano);
    elemento.innerHTML = this.costoArtesano;
}
minaHierro.ganancia=function(){
	return this.nivel*5;
}
minaAcero = new Recurso(); //Instanciacion de minaAcero
minaAcero.dificultad = 5;
minaAcero.calcularCostoLevear = function(recurso){
	this.costo = 200*Math.pow(2,this.nivel);
	var elemento = document.querySelector("#costo"+ recurso);
	elemento.innerHTML = this.costo;
}
minaAcero.calcularCostoArtesano = function(artesano){
	var costoArtesanoCalculado = 125*Math.pow(3,this.artesano);
	this.costoArtesano = costoArtesanoCalculado;
	var elemento = document.querySelector("#cantidad"+artesano);
    elemento.innerHTML = this.artesano;
    elemento = document.querySelector("#dinero");
	elemento.innerHTML = dinero;
	elemento = document.querySelector("#costo"+artesano);
    elemento.innerHTML = this.costoArtesano;
}
minaAcero.ganancia=function(){
	return this.nivel*20;
}

function mostrarAlerta() {
    'use strict';
    /*global alert */
    alert('fabrico');
}
function hacerClic() {
    'use strict';
    /*global alert */
    //alert('fabricoOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    
    var elemento;
    
    setRecurso(minaMadera,"Madera","Carpintero");
    setRecurso(minaHierro,"Hierro","Herrero");
 	setRecurso(minaAcero,"Acero","Operario");
	
	elemento = document.querySelector("#dinero");
	elemento.innerHTML = dinero;
	
}

window.addEventListener('load', hacerClic, false);
