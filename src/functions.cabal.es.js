/*Permite validar si un campo es obligatorio*/
//obligatorio(mensaje)
function obligatorio(objetivo,opciones,validacion)
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
	
	return mensajes;
}

//Valida que una fecha cumpla el formato ISO8601 YYYY-MM-DD
//uso fecha8601 (mensaje)
function fecha8601(objetivo,opciones,validacion)
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
	
	return mensajes;
}

//Valida que un campo de texto solo contenga los números del 0-9
//uso: enteros(mensaje)
function enteros(objetivo,opciones,validacion)
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
	
	return mensajes;
}

//Valida que un campo no tenga mas de una cantidad especificada de caracteres
// ejemplo uso: max (valorMaximo,mensaje)
function max(objetivo,opciones,validacion)
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
	
	return mensajes;
}

//compara dos elementos y valida si contienen el mismo valor
//uso igualdad(selector,mensaje)
function igualdad(objetivo,opciones,validacion)
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
		
		$(campo1).css({"background":"white"});
		$(campo2).css({"background":"white"});
		if(!($(campo1).val()==$(campo2).val()))
		{
			$(campo1).css({"background":"red"});
			$(campo2).css({"background":"red"});
			mensajes[0] = mensaje;
		}
	}
	
	return mensajes;
}

//compara dos fechas y valida que la fecha uno sea menor a la fecha 2
//uso fechaMenor(selector,mensaje)
function fechaMenor(objetivo,opciones,validacion)
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
	
	return mensajes;
}