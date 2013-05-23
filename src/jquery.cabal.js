(function ( $ ) 
{
	//Definición del plugin
	$.fn.cabal = function( options )
	{
		var idSelector = obtenerId(this.selector);
		var resultado=true;
		
		if($.type(options)=="string")
		{
			if(options=="ocultarMensajes")
			{
				$.fn.cabal.ocultarMensajesElemento(idSelector);
			}
		}
		else if($.type(options)=="object" || options==null)
		{
			var settings = $.extend
			(
				{
					"mensajes-dialogo":true, //mostrar mensajes al final
					"mensajes-elemento":false // mostrar mensajes por elemento
				},
				options 
			);
			var mensajes = new Array();
			var i=0;
			
			if(settings["mensajes-dialogo"] == false && settings["mensajes-elemento"]== false)
			{
				settings["mensajes-dialogo"]=true; //se asegura que se muestren los mensajes
			}
			else if(settings["mensajes-dialogo"] == true && settings["mensajes-elemento"]== true)
			{
				settings["mensajes-dialogo"]=false; //se asegura que se muestren los mensajes
			}
			
			if(settings["mensajes-elemento"])
			{
				$.fn.cabal.ocultarMensajesElemento(idSelector);
			}
			
			this.each(function()
			{			
				var mensaje=validar(this,settings["mensajes-elemento"],idSelector);
				if(mensaje.length > 0)
				{
					$(mensaje).each(function()
					{
						mensajes[i] = this;
						i++;
					});
				}
				
			});
			
			if(mensajes.length > 0)
			{
				if(settings["mensajes-dialogo"])
				{
					$.fn.cabal.verMensajes(mensajes);
				}
				resultado = false;
			}
			
		}
		return resultado;
	};	
	
	/*
	//opciones por defecto
	$.fn.cabal.defaults = {
		"mensajes-dialogo":true, //mostrar mensajes al final
		"mensajes-elemento":false // mostrar mensajes por elemento
	};*/
	
	//****Funciones Secundarias publicas****
	
	//ver los mensajes de validación en un dialogo
	$.fn.cabal.verMensajes = function ( mensajes )
	{
		var ver="";
		$(mensajes).each(function(index)
		{
			ver+=" - "+this+"\n";
		});
		alert(ver);
	};
	
	//Mostrar los mensajes especificos de cada elemento.Esta funcion se relaciona directamente con $.fn.cabal.ocultarMensajesElemento
	$.fn.cabal.verMensajeElemento = function ( objetivo, mensajes, idSelector )
	{
		var msjs = "";
		$(mensajes).each(function()
		{
			msjs +=" - " + this + "<br>";
		});
		
		var div=$("<div style='display:none' class=\"cabalPrompt cabalPrompt"+idSelector+"\" >"+msjs+"</div>");

		$("body").append(div);
		var pos   = $(objetivo).offset();
	    var width = $(objetivo).width();
	    $(div).css({ "left": (pos.left + width) + "px", "top":pos.top + "px","position":"absolute" }).fadeIn("slow");
	    
	    $(div).click(function()
    	{
	    	$(this).remove();
	   	});
	};
	
	//ocultar los mensajes especificos de cada elemento. Esta funcion se relaciona directamente con $.fn.cabal.verMensajeElemento
	$.fn.cabal.ocultarMensajesElemento = function ( idSelector )
	{
		$(".cabalPrompt"+idSelector).remove();
	};
	
	//ocultar los mensajes especificos de cada elemento. Esta funcion se relaciona directamente con $.fn.cabal.verMensajeElemento
	$.fn.cabal.ocultarTodo = function ()
	{
		$(".cabalPrompt").remove();
	};
	
	//Funciones privadas
	function validar(objetivo,mensajes_elemento,idSelector)
	{
		var resultado= new Array();
		var rulesParsing = $(objetivo).attr('class');
        var getRules = /cabal\[(.*)\]/.exec(rulesParsing);
        if (!getRules)
            return resultado;
        var str = getRules[1];
        var rules = str.split(/;/);
        var elemento=$(objetivo).get(0).tagName;
        var i=0;
        var esFuncion=/.*\(.*\)/;
        $(rules).each(function()
		{        	
        	if(esFuncion.test(this))
    		{
        		var validacion="ninguna";
        		var opciones=this.match(/\(.*\)/)[0];
        		opciones=opciones.substr(1,opciones.length-2); //se eliminan parentesis            		
        		var nombre=this.replace(/\(.*\)/,"");
        		
        		if(elemento=="INPUT")
        		{
	            	var tipo=$(objetivo).attr('type');
	            	if(tipo=="text" || tipo=="password")
	        		{
	            		validacion="texto";
	        		}
	            	else if(tipo=="radio")
	        		{
	            		validacion="radio";
	        		}
	            	else if(tipo=="checkbox")
            		{
	            		validacion="checkbox";
            		}
        		}
            	else if(elemento=="TEXTAREA")
            	{
            		validacion="texto";
            	}
            	else if(elemento=="SELECT")
            	{
            		validacion="select";
            	}            	
        		
        		if(validacion!="ninguna")//solo permite las validaciones soportadas
        		{
        			var arrayMensajes = new Array();
        			var fn = window[nombre];
        			if(typeof fn === 'function') {
        				arrayMensajes=fn(objetivo,opciones,validacion);
        			}
        			
            		if(arrayMensajes.length > 0)
        			{
            			$(arrayMensajes).each(function()
            			{
            				resultado[i] = this;
                			i++;
            			});
            			
            			if(mensajes_elemento)
            			{
            				$.fn.cabal.verMensajeElemento(objetivo,arrayMensajes,idSelector);
            			}
        			}
        		}   		
        		
    		}
		});
		return resultado;
	}
	
	function obtenerId(texto)
	{
		var resultado= "";
		var arregloTexto=texto.split(""); 
		$(arregloTexto).each(function()
		{
			resultado += this.charCodeAt(0);
		});
		return resultado;
	}
	
	$.cabal=function( options )
	{
		if($.type(options)=="string")
		{
			if(options == "ocultarMensajes")
			{
				$.fn.cabal.ocultarTodo();
			}
		}
	};
	
}( jQuery ));