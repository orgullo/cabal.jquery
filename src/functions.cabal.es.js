/*Permite validar si un campo es obligatorio*/
//obligatorio(mensaje)
function obligatorio(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	if(validacion=="texto")
	{
		regular=/.+$/;
		if(!regular.test($(objetivo).val()))
		{
			if(opciones)
			{
				mensajes[0] = eval(opciones);
			}
			else
			{
				mensajes[0] = "campo obligatorio";
			}
		}
	}
	
	if(validacion=="select")
	{
		if($(objetivo).attr("MULTIPLE"))
		{
			if($(select).val()==null)
			{
				if(opciones)
				{
					mensajes[0] = eval(opciones);
				}
				else
				{
					mensajes[0] = "campo obligatorio";
				}
			}
		}
		else
		{
			if($(objetivo).val()=="")
			{
				if(opciones)
				{
					mensajes[0] = eval(opciones);
				}
				else
				{
					mensajes[0] = "campo obligatorio";
				}
			}
		}
	}
	
	if(validacion=="radio" || validacion=="checkbox" )
	{
		var nombreRadio=$(objetivo).attr('name');
		if(!nombreRadio)
		{
			if(!$(objetivo).attr('checked'))
			{
				if(opciones)
				{
					mensajes[0] = eval(opciones);
				}
				else
				{
					mensajes[0] = "campo obligatorio";
				}
			}        			
		}
		else
		{
			if($("[name='"+nombreRadio+"']:checked").length==0)
			{
				if(opciones)
				{
					mensajes[0] = eval(opciones);
				}
				else
				{
					mensajes[0] = "Seleccione una opción";
				}
			}
		}
	}
	
	fin(mensajes);
}

//Valida que una fecha cumpla el formato ISO8601 YYYY-MM-DD
//uso fecha8601 (mensaje)
function fecha8601(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	if(validacion=="texto")
	{
		regular=/^([0-9]{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1])))$|^$/;
		if(!regular.test($(objetivo).val()))
		{
			if(opciones)
			{
				mensajes[0] = eval(opciones);
			}
			else
			{
				mensajes[0] = "El formato valido de fecha es YYYY-MM-DD";
			}			
		}
	}
	
	fin(mensajes);
}

//Valida que un campo de texto solo contenga los números del 0-9
//uso: enteros(mensaje)
function enteros(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	if(validacion=="texto")
	{
		regular=/^[0-9]*$/;
		if(!regular.test($(objetivo).val()))
		{
			if(opciones)
			{
				mensajes[0] = eval(opciones);
			}
			else
			{
				mensajes[0] = "Solo números enteros";
			}			
		}
	}
	
	fin(mensajes);
}

//Valida que un campo no tenga mas de una cantidad especificada de caracteres
// ejemplo uso: max (valorMaximo,mensaje)
function max(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	if(validacion=="texto")
	{
		var total = $(objetivo).val().length;
		var maximo;
		var mensaje = '';
		
		if(opciones=="")
		{
			maximo=100;
			mensaje='No puede tener mas de '+maximo+' caracteres';
		}
		else
		{
			opciones=opciones.split(",");
			if(opciones[0]!=null)
			{
				maximo=eval(opciones[0]);
			}
			
			if(opciones[1]!=null)
			{
				mensaje=eval(opciones[1]);
			}
			else
			{
				mensaje='No puede tener mas de '+maximo+' caracteres';
			}
				
		}
		
		if(total>maximo)
		{
			mensajes[0] = mensaje;
		}
	}
	
	fin(mensajes);
}

//compara dos elementos y valida si contienen el mismo valor
//uso igualdad(selector,mensaje)
function igualdad(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	if(validacion=="texto")
	{
		opciones=opciones.split(",");
		
		var campo1=objetivo;
		var campo2=$(eval(opciones[0]));
		var mensaje= "Los campos no son iguales";
		if(opciones[1]!=null)
		{
			mensaje= eval(opciones[1]);
		}
		
		//$(campo1).css({"background":"white"});
		//$(campo2).css({"background":"white"});
		if(!($(campo1).val()==$(campo2).val()))
		{
			//$(campo1).css({"background":"red"});
			//$(campo2).css({"background":"red"});
			mensajes[0] = mensaje;
		}
	}
	
	fin(mensajes);
}

//compara dos fechas y valida que la fecha uno sea menor a la fecha 2
//uso fechaMenor(selector,mensaje)
function fechaMenor(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	if(validacion=="texto")
	{
		opciones=opciones.split(",");
		
		var campo1=objetivo;
		var campo2=$(eval(opciones[0]));
		
		var fecha1 = new Date($(campo1).val());
		var fecha2 = new Date($(campo2).val());
		
		var mensaje= "La segunda fecha debe ser mayor a la primera";
		if(opciones[1]!=null)
		{
			mensaje= eval(opciones[1]);
		}
		
		//$(campo1).css({"background":"white"});
		//$(campo2).css({"background":"white"});
		
		if(fecha2 < fecha1)
		{
			//$(campo1).css({"background":"red"});
			//$(campo2).css({"background":"red"});
			mensajes[0] = mensaje;
		}
	}
	
	fin(mensajes);
}

//Valida que una fecha sea correcta y cumpla un formato especifico,
//por defecto el formato es DD/MM/YYYY
//uso fecha (mensaje,formato)
function fecha(objetivo,opciones,validacion,fin)
{
	var mensajes= new Array();
	
	var formato='DD/MM/YYYY'; //valor por defecto
	var mensaje='';
	var strFecha='';
	
	if(validacion=="texto")
	{
		if ($(objetivo).val()!="")
		{
			if(opciones!="")
			{
				opciones=opciones.split(",");
				
				if(eval(opciones[0])!="")
				{
					mensaje= eval(opciones[0]);
				}
				
				if(eval(opciones[1])!="")
				{
					formato= eval(opciones[1]);
					formato=formato.toUpperCase();
				}
			}
			
			strFecha = _getFecha8601($(objetivo).val(),formato);
			
			regular=/^([0-9]{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2][0-9])|(3[0-1])))$|^$/;
			if(!regular.test(strFecha))
			{
				if(mensaje)
				{
					mensajes[0] = mensaje;
				}
				else
				{
					mensajes[0] = "El formato valido de fecha es "+formato;
				}
			}
		}
	}
	
	fin(mensajes);
}

//acepta formatos tipo DD MM YYYY
function _getFecha8601(fecha,formato)
{		
	if(fecha!="")
	{
		var delimitador = /[^MDY]/.exec(formato)[0];
		
		var date=fecha.split(delimitador);
		var format= formato.split(delimitador);
		
		var m='', d='', y='';
		
	    for (var i = 0, len = format.length; i < len; i++) 
	    {
	      if (/M/.test(format[i])) m = date[i];
	      if (/D/.test(format[i])) d = date[i];
	      if (/Y/.test(format[i])) y = date[i];
	    }
	    return y+'-'+m+'-'+d;
	}
	else
	{
		return "";
	}    
}

