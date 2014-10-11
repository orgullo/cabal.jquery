function Cabal(options)
{
	this.makeid= function()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 10; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};
	var cabal=this;
	this.id=this.makeid(); 
	this.elementos=new Array();
	this.todosLosMensajes=new Array();
	this.mensajesElemento = new Array();
	//this.idSelector = obtenerId(this.selector);
	this.resultado=true;
	this.terminar = function(){};
	this.error = function(){};
	this.exito = function(){};
	this.valido =true;
	this.siguienteElemento=null;
	this.posicionElemento=0;
	this.verDialogo=true;
	this.verMensajesElemento=false;
	
	this.add=function(elemento,validaciones)
	{
		$(elemento).each(function()
		{
			cabal.elementos.push(new Array(this,validaciones));
		});
		
	};
	
	this.validar=function(funcExito,funcError)
	{
		this.valido =true;
		this.hideMessagesElement();
		if(funcError!=null)
		{
			this.error = funcError;
		}
		if(funcExito!=null)
		{
			this.exito = funcExito;
		}
		
		this.validarElemento(this.elementos,0);
	};
	
	//funcion recursiva que valida todos los elementos
	this.validarElemento=function(elementos,posicion)
	{
		//alert(posicion);
		this.posicionElemento=posicion;
		try
		{
			var elemento = elementos[posicion];
		}
		catch (e) 
		{
			var elemento = null;
		}
		
		if(elemento == null) //sino hay mas elementos
		{
			if(cabal.valido) //si pasó las validaciones
	    	{
				cabal.exito();
	    	}
	        else
	    	{	
	        	if(cabal.verDialogo)
	        	{
	        		cabal.showMessages(cabal.todosLosMensajes);
	        	}
	        	if(cabal.verMensajesElemento)
	        	{
	        		cabal.focusFirst();
	        	}
				cabal.todosLosMensajes=new Array();
				cabal.error();
			}
		}
		else //validar elemento
		{
			var objetivo = elemento[0];
			var reglas = elemento[1].split(/;/);
			var totalReglas = reglas.length;
			var mensajesObjetivo = new Array();
			var esFuncion=/.*\(.*\)/;
			
			if (totalReglas > 0)
			{
				cabal.validarRegla(objetivo,reglas,0);
			}
			else
			{
				cabal.validarElemento(this.elementos,posicion+1);
			}
		}
	};
	
	//funcion recursiva que valida las reglas de un objetivo
	this.validarRegla=function(objetivo,reglas,posicion)
	{	
		try
		{
			var reglaActual=reglas[posicion];
		}
		catch (e) 
		{
			var reglaActual=null;
		}
		
		if(reglaActual == null) //si no hay mas reglas
		{	
			if(this.mensajesElemento.length>0 && cabal.verMensajesElemento)
			{
				this.showMessagesElement(objetivo,this.mensajesElemento);
			}
			
			this.mensajesElemento=new Array();
			cabal.validarElemento(cabal.elementos, cabal.posicionElemento+1);
		}
		else //validar regla
		{
			var nombreFuncion=reglaActual.replace(/\(.*\)/,"");
			var fn = window[nombreFuncion];
			var opciones=reglaActual.match(/\(.*\)/)[0];
    		opciones=opciones.substr(1,opciones.length-2); //se eliminan parentesis
    		var tipoValidacion=this.tipoValidacion(objetivo);
    		
    		if(tipoValidacion!="ninguna" && typeof fn === 'function')//solo permite las validaciones soportadas
    		{
    			fn(objetivo,opciones,tipoValidacion,function(arrayMensajes)
				{
					if(arrayMensajes.length > 0)
        			{
            			$(arrayMensajes).each(function()
            			{
            				cabal.todosLosMensajes.push(this);
            				cabal.mensajesElemento.push(this);
            				cabal.valido =false;
            			});
        			}
					
					cabal.validarRegla(objetivo,reglas,posicion+1);
				});
    		}
    		else
			{
    			cabal.validarRegla(objetivo,reglas,posicion+1);
			}
		}
		
	};
	
	
	//Identifica el tipo de validación
	this.tipoValidacion = function(objetivo)
	{
		var tipoValidacion="ninguna";
		var tagElemento=$(objetivo).get(0).tagName;
		if(tagElemento=="INPUT")
		{
        	var tipo=$(objetivo).attr('type');
        	if(tipo=="text" || tipo=="password")
    		{
        		tipoValidacion="texto";
    		}
        	else if(tipo=="radio")
    		{
        		tipoValidacion="radio";
    		}
        	else if(tipo=="checkbox")
    		{
        		tipoValidacion="checkbox";
    		}
		}
    	else if(tagElemento=="TEXTAREA")
    	{
    		tipoValidacion="texto";
    	}
    	else if(tagElemento=="SELECT")
    	{
    		tipoValidacion="select";
    	}
		
		return tipoValidacion;
	};
	
	
	this.showMessages=function(messages)
	{	
		
		var msjs ="";
		$(messages).each(function()
		{
			msjs+=this+"\n";
		});
		alert(msjs);
	};
	
	this.showMessagesElement=function(objetivo,messages)
	{
		var idSelector ="joder";
		var msjs = "";
		$(messages).each(function()
		{
			msjs +=" - " + this + "<br>";
		});
		
		var div=$("<div style='display:none' class=\"cabalPrompt cabalPrompt"+cabal.id+"\" >"+msjs+"</div>");

		$("body").append(div);
		var pos   = $(objetivo).offset();
	    var width = $(objetivo).width();
	    var height = $(objetivo).outerHeight();
	    $(div).css({ "left": (pos.left + width) + "px", "top":(pos.top) + "px","position":"absolute" }).fadeIn("slow");
	    
	    $(div).click(function()
    	{	
			//$(div).hide("explode",null,500).remove();
			
	    	$(div).fadeOut('slow', function() {
	    		 $(this).remove();
	    	});
	   	});
	    
	    $(objetivo).one("focus",function()
	    {
	    	//$(div).hide("explode",null,500).remove();
	    	
	    	$(div).fadeOut('slow', function() {
	    		 $(this).remove();
	    	});
	    	
	    });
	    
	};
	
	this.hideMessagesElement = function ()
	{
		$(".cabalPrompt"+cabal.id).fadeOut('slow', function() {
   		 	$(this).remove();
		});
	};
	
	this.hideAll = function ()
	{
		$(".cabalPrompt").fadeOut('slow', function() {
   		 	$(this).remove();
		});
	};
	
	this.focusFirst = function ()
	{
		var elemento = $(".cabalPrompt"+cabal.id+":first"); //busca el primer elemento
		if(elemento.size()==1)
		{
			var docViewTop = $(window).scrollTop();
		    var docViewBottom = docViewTop + $(window).height();
	
		    var elemTop = $(elemento).offset().top;
		    var elemBottom = elemTop + $(elemento).height();
		    var esVisible = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		    
		    if(!esVisible)
		    {
		    	var top;
		    	var adicional=50;
		    	if(elemTop >= 0 && elemTop<=adicional)
		    	{
		    		top = elemTop;
	    		}
		    	else
		    	{
		    		top = elemTop-adicional;
		    	}
		    	$('html, body').animate({scrollTop:top}, 'slow');
		    }
	    }
	};
	
	
}

(function ( $ ) 
{
	
}( jQuery ));