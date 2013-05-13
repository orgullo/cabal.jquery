#Plugin jQuery Cabal

Validador de campos para la web (html), el cual es poderoso, extensible y personalizable.

#Caracteristicas

##Soporte de validación para los siguientes elementos

  * input type text
  * input type password
  * input type radio
  * input type checkbox
  * textarea
  * select

##Funciones independientes

Permite crear tantas funciones como sean necesarias y su alcance puede ser general o especifico.
  
  * General: Se incluyen en el archivos de funciones globales (functions.cabal.x.js) para utilizarlas en cualquier lugar.
  * Especifico: puede crear funciones en el documento que sea necesario con referencias especificas del propio documento.
  
##Personalización de visualización de mensajes

  El plugin permite ver los mensajes de dos maneras.
  * dialogo: muestra los mensajes de validación en un alert()
  * flotantes: Muestra los mensajes flotando cerca al elemento que se esta validando.
  
Estos metodos son publicos y pueden ser sobreescritos deacuerdo a las necesidades. 
Ejemplo: utilizar jquery ui para utilizar un dialogo mas estilizado o concordante a tu aplicación.

##Validación mediante selector

Los elementos a validar son indicados mediante los selectores de jQuery, lo cual permite validar la sección de datos necesario en el momento necesario.
Los elementos a validar puede ser desde un formulario completo hasta un simple campo.

##Facil de usar

1. Incluir en la seción HEAD del DOM (documento html) los siguientes documentos, en el siguiente orden:
  * libreria jquery
  * css de cabal (jquery.cabal.css)
  * js de cabal (jquery.cabal.js)
  * js de la funciones genericas de cabal (functions.cabal.x.js)

2. En tu documento html marca los elementos a validar utilizando el atributo class. Ejemplo:
    ```htm
    <input type="text" name="nombre" class="cabal[funcion1(atributos);funcion2(atributos)... funcionN(atributos)]">
    ```

3. Realiza la validación en javasdcript cuando sea necesario, de los elementos que sean necesarios.
   Ejemplo:

	```javascript
	   $("#form *").cabal();
	```

Esta linea valida todos los elementos que se encuentran en el #form y retorna un valor booleano (true/false) indicando el resultado de la validación.

#Licencia

MIT license. Open Source.

#Notas

  * la letra x (equis) en el nombre del archivo <functions.cabal.x.js> se refiere al idioma del archivo. 
  Inicialmente el plugin solo trae soporte en español
