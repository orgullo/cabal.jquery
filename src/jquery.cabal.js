(function ( $ ) 
{
	//Definición del plugin
	$.fn.cabal = function( options, funcError )
	{
		var idSelector = obtenerId(this.selector);
		var resultado=true;
		var terminar = function(){};
		var error = function(){};
		
		if($.type(options)=="string")
		{
			if(options=="hide")
			{
				$.fn.cabal.ocultarMensajesElemento(idSelector);
			}
		}
		else if($.type(options)=="object" || options==null || $.type( options ) === "function")
		{
			var elementosValidar  = new Array();
			$(this).each(function()
			{
				if(this.tagName == "INPUT" || this.tagName == "TEXTAREA" || this.tagName == "SELECT")
				{
					elementosValidar.push(this);
				}
				
			});
			
			if($.type(options)=="object" || options==null)
			{
				var settings = $.extend
				(
					{
						"dialog":true, //mostrar mensajes al final
						"success":terminar,
						"error":error
					},
					options
				);
			}
			else
			{
				var settings =
				{
					"dialog":true,//mostrar mensajes al final
					"success":terminar,
					"error":error
				};
			}
			var mensajes = new Array();
			
			if(!settings["dialog"])
			{
				$.fn.cabal.ocultarMensajesElemento(idSelector);
			}
						
			
			if ($.type( options ) === "function")
			{
				terminar = options;
				if ($.type( funcError ) === "function")
				{
					error = funcError;
				}
			}
			else if($.type(options)=="object")
			{
				terminar = settings.success;
				error = settings.error;
			}
			
			var todosLosMensajes = new Array();
			validar(elementosValidar[0],!settings["dialog"],idSelector,0,elementosValidar,true, terminar,todosLosMensajes,error);
			
		}
	};
	
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
	    var height = $(objetivo).outerHeight();
	    $(div).css({ "left": (pos.left + width) + "px", "top":(pos.top) + "px","position":"absolute" }).fadeIn("slow");
	    
	    return div;
	};
	
	$.fn.cabal.finalizarElemento = function (objetivo, extra)
	{
		$(extra).on("click",function()
    	{	
			//$(extra).hide("explode",null,500).remove();
			
	    	$(extra).fadeOut('slow', function() {
	    		 $(this).remove();
	    	});
	   	});
	    
	    $(objetivo).one("focus",function()
	    {
	    	//$(extra).hide("explode",null,500).remove();
	    	
	    	$(extra).fadeOut('slow', function() {
	    		 $(this).remove();
	    	});
	    	
	    });
	};
	
	//ocultar los mensajes especificos de cada elemento. Esta funcion se relaciona directamente con $.fn.cabal.verMensajeElemento
	$.fn.cabal.ocultarMensajesElemento = function ( idSelector )
	{
		$(".cabalPrompt"+idSelector).fadeOut('slow', function() {
   		 	$(this).remove();
		});
	};
	
	//ocultar los mensajes especificos de cada elemento. Esta funcion se relaciona directamente con $.fn.cabal.verMensajeElemento
	$.fn.cabal.ocultarTodo = function ()
	{
		$(".cabalPrompt").fadeOut('slow', function() {
   		 	$(this).remove();
		});
	};
	
	//Enfoca el primer elemento. Esta funcion se relaciona directamente con $.fn.cabal.verMensajeElemento
	$.fn.cabal.enfocar = function (idSelector)
	{
		var elemento = $(".cabalPrompt"+idSelector+":first"); //busca el primer elemento
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
	
	//Funciones privadas
	function validar(objetivo,mensajes_elemento,idSelector,i,elementos,valido,exito,todosLosMensajes,error)
	{
		var rulesParsing = $(objetivo).attr('class');
        var getRules = /cabal\[(.*)\]/.exec(rulesParsing);
        if (!getRules)
    	{
        	var siguienteObjetivo = elementos[i+1];
	        if (siguienteObjetivo == null)
	    	{

	        	if(valido) // pasó las validaciones
	    		{
	        		exito();
	    		}
	        	else
	    		{
	        		if(!mensajes_elemento)
	    			{
	    				$.fn.cabal.verMensajes(todosLosMensajes);
	    			}
	        		else
        			{
	        			$.fn.cabal.enfocar(idSelector);
        			}
	        		error();
	    		}
	    	}
	        else
	    	{
	        	validar(siguienteObjetivo,mensajes_elemento,idSelector,i+1,elementos,valido,exito,todosLosMensajes,error);
	    	}
    	}
        else
        {
	        var str = getRules[1];	         
	        var rules = str.split(/;/);
	        var totalReglas = rules.length;
	        var elemento=$(objetivo).get(0).tagName;
	        var esFuncion=/.*\(.*\)/;
	        var mensajesObjetivo = new Array();
	        $(rules).each(function(reglaActual)
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
	        				
	        				function siguiente(arrayMensajes)
	        				{
	        					if(arrayMensajes.length > 0)
	                			{
	                    			$(arrayMensajes).each(function()
	                    			{
        	        					todosLosMensajes.push(this);
        	        					mensajesObjetivo.push(this);
	                        			valido =false;
	                    			});
	                			}
	        					if((reglaActual+1) == totalReglas) //pase al siguiente elemento tras validar la ultima regla
	        					{
	        						if(mensajes_elemento)
	                    			{
	        							if(mensajesObjetivo.length > 0)
	    	        					{
	    	                				var extra=$.fn.cabal.verMensajeElemento(objetivo,mensajesObjetivo,idSelector);
	    	                				$.fn.cabal.finalizarElemento(objetivo,extra);
	    	        					}            				
	                    			}
		        					var siguienteObjetivo = elementos[i+1];		        					
		        			        if (siguienteObjetivo == null)
		        			    	{
		
		        			        	if(valido) // pasó las validaciones
		        			    		{
		        			        		exito();
		        			    		}
		        			        	else
		        			    		{
		        			        		if(!mensajes_elemento)
		        			    			{
		        			    				$.fn.cabal.verMensajes(todosLosMensajes);
		        			    			}
		        			        		else
	        			        			{
		        			        			$.fn.cabal.enfocar(idSelector);
	        			        			}
		        			        		error();
		        			    		}
		        			    	}
		        			        else
		        			    	{
		        			        	validar(siguienteObjetivo,mensajes_elemento,idSelector,i+1,elementos,valido,exito,todosLosMensajes,error);
		        			    	}
	        					}
	        				}
	        				
	        				fn(objetivo,opciones,validacion,siguiente);
	        			}
	        		}
	        		else
	    			{
	        			if((reglaActual+1) == totalReglas)
    					{
	        				if(mensajes_elemento)
                			{
	        					if(mensajesObjetivo.length > 0)
	        					{
	                				var extra=$.fn.cabal.verMensajeElemento(objetivo,mensajesObjetivo,idSelector);
	                				$.fn.cabal.finalizarElemento(objetivo,extra);
	        					}
                			}
		        			var siguienteObjetivo = elementos[i+1];
					        if (siguienteObjetivo == null)
					    	{
		
					        	if(valido) // pasó las validaciones
					    		{
					        		exito();
					    		}
					        	else
					    		{
					        		if(!mensajes_elemento)
					    			{
					    				$.fn.cabal.verMensajes(todosLosMensajes);
					    			}
					        		else
				        			{
	    			        			$.fn.cabal.enfocar(idSelector);
				        			}
					    		}
	
					    	}
					        else
					    	{
					        	validar(siguienteObjetivo,mensajes_elemento,idSelector,i+1,elementos,valido,exito,todosLosMensajes,error);
					    	}
    					}
	    			}
	        		
	    		}
			});
        }   
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
			if(options == "hideAll")
			{
				$.fn.cabal.ocultarTodo();
			}
		}
	};
	
}( jQuery ));