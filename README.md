Plugin jQuery Cabal
===================

Validador de campos para la web (html), el cual es poderoso, extensible y personalizable.

Caracteristicas
---------------

#Soporte de validación para los siguientes elementos #

    * input type text
	* input type password
	* input type radio
	* input type checkbox
	* textarea
	* select

#Funciones independientes# 

  Puedes crear tantas funciones como sean necesarias y su alcance puede ser general o especifico.
  
  *General: Las puedes incluir en tu script de funciones genericas (functions.cabal.x.js) y poder utilizarlas en cualquier lugar.
  *Especifico: puedes crear funciones en el documento que necesites con referencias especificas.
  
#Personalización de visualización de mensajes#

  El plugin permite ver los mensajes de dos maneras. 
  
  * dialogo: muestra los mensajes de validación en un alert()
  * flotantes: Muestra los mensajes flotando cerca al elemento que se esta validando.
  
  Estos dos metodos son publicos, por lo cual puden ser sobreescritos para que los visualices según tus necesidades. 
  Ejemplo: utilizar jquery ui para utilizar un dialogo mas bonito o concordante a tu aplicación.

#Validación mediante selector# 

Lo cual te permite validar la sección de datos que necesites en el momento que necesites.
Puede ser un formulario completo o simplemente un campo bajo una condición especifica.

#Facil de usar#

	1. Incluir en la seción HEAD del DOM (documento html) los siguientes documentos, en el siguiente orden:
	
	   * libreria jquery
	   * css de cabal (jquery.cabal.css)
	   * js de cabal (jquery.cabal.js)
	   * js de la funciones genericas de cabal (functions.cabal.x.js)
	   
	2. En tu documento html marca los elementos a validar utilizando el atributo class. 
	   Ejemplo: 
	   ``` html
	   <input type="text" name="nombre" class="cabal[funcion1(atributos);funcion2(atributos)... funcionN(atributos)]">
       ```
	
	3. Realiza la validación en javasdcript cuando sea necesario, de los elementos que sean necesarios.
	   Ejemplo: 
	   
	   ``` javascript
	   $("#form *").cabal(); 
	   ```
	   
	   Este linea valida todos los elementos que se encuentran en el #form
	
Licencia
---------

MIT license. Open Source.

Notas
-----

* la letra x (equis) en el nombre del archivo <functions.cabal.x.js> se refiere al idioma del archivo. 
  Inicialmente el plugin solo trae soporte en español