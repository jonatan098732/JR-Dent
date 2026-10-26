/* JR DENT — Catálogo inicial basado en los artículos y precios publicados
   en la web original (26-10-2026). Edita aquí precios, fichas e imágenes.
   LAS OFERTAS ESTÁN SUJETAS A CONFIRMACIÓN DE STOCK Y MODELO. */
const SOURCE_ASSETS = 'https://jonatan098732.github.io/JR-Dent/';
const image = filename => filename.startsWith('assets/') ? filename : SOURCE_ASSETS + filename;
const PRODUCTS = [
  {id:'promo-2-turbinas',name:'Promoción · 2 piezas de mano',category:'Promociones',brand:'NSK / KaVo',price:500,oldPrice:null,img:'promo-turbinas.webp',description:'Llévate 2 piezas de mano por S/ 500. Consulta los modelos disponibles NSK o KaVo antes de confirmar.',badge:'OFERTA ESPECIAL',featured:true,options:['NSK','KaVo','Consultar combinación'],special:true},
  {id:'promo-micromotores',name:'Micromotores de colores · Promoción',category:'Promociones',brand:'Consultar modelo',price:290,img:'promo-micromotores.webp',description:'Promoción desde S/ 290 según modelos y colores disponibles. Confirma las piezas incluidas por WhatsApp.',badge:'NOVEDAD',featured:true,options:['Azul','Morado','Plateado','Consultar colores'],special:true},
  {id:'lampara-led-b',name:'Lámpara LED B',category:'Lámparas',brand:'Woodpecker',price:200,img:'eq1k.jpg',description:'Lámpara de fotocurado LED B. Confirma modos, potencia y ficha técnica.',featured:true},
  {id:'uds-j1',name:'Ultrasonido UDS J1',category:'Ultrasonidos',brand:'Woodpecker',price:480,img:'eq7.jpg',description:'Ultrasonido para destartraje. Consulta puntas y accesorios incluidos.'},
  {id:'uds-e-led',name:'Ultrasonido UDS-E LED',category:'Ultrasonidos',brand:'Woodpecker',price:780,img:'eq10.jpg',description:'Equipo para destartraje, endodoncia y periodoncia con luz LED y sistema de agua.',featured:true},
  {id:'br-touch',name:'Endomotor BR-TOUCH',category:'Endomotores',brand:'BR-TOUCH',price:1699.99,img:'eq8.jpg',description:'Endomotor para endodoncia rotatoria. Consulta compatibilidad, modos y torque.'},
  {id:'rayos-x-xpect',name:'Rayos X portátil Xpect Vision',category:'Rayos X y RVG',brand:'Xpect Vision',price:3600,img:'eq3k.jpg',description:'Equipo portátil de rayos X. Confirma accesorios incluidos, registro, garantía y requerimientos de uso.'},
  {id:'uds-m',name:'Ultrasonido UDS-M',category:'Ultrasonidos',brand:'Woodpecker',price:419.99,img:'eq2.jpg',description:'Ultrasonido UDS-M para destartraje y endodoncia, según configuración.'},
  {id:'led-f',name:'Lámpara LED F',category:'Lámparas',brand:'Woodpecker',price:579.99,img:'eq12.jpg',description:'Lámpara de fotocurado con medidor de luz y accesorio para blanqueamiento.'},
  {id:'led-d',name:'Lámpara LED D',category:'Lámparas',brand:'Woodpecker',price:239.99,img:'eq13.jpg',description:'Lámpara LED D de fotocurado. Confirma especificaciones y accesorios.'},
  {id:'mini-ray',name:'Mini Ray Woodpecker',category:'Rayos X y RVG',brand:'Woodpecker',price:3099.99,img:'eq14.jpg',description:'Equipo portátil de rayos X Mini Ray. Consulta características y garantía.'},
  {id:'uds-j2',name:'Ultrasonido UDS J2',category:'Ultrasonidos',brand:'Woodpecker',price:580,img:'eq9.jpg',description:'Ultrasonido de destartraje con luz LED.'},
  {id:'i-led-ii',name:'Lámpara I-LED II',category:'Lámparas',brand:'Woodpecker',price:689.99,img:'eq4.jpg',description:'Lámpara de fotocurado de alta potencia. Consulta ficha técnica del equipo.'},
  {id:'uds-u6',name:'Ultrasonido UDS-U6',category:'Ultrasonidos',brand:'Woodpecker',price:820,img:'eq11.jpg',description:'Ultrasonido táctil para destartraje, endodoncia y periodoncia con luz LED.'},
  {id:'pana-max-plus',name:'Pana Max Plus NSK',category:'Piezas de mano',brand:'NSK',price:260,img:'mano1.jpg',description:'Pieza de mano de alta velocidad tipo Pana Max Plus. Confirma conexión y modelo.',featured:true},
  {id:'being-led',name:'Pieza de alta Being LED',category:'Piezas de mano',brand:'Being',price:380,img:'mano2.jpg',description:'Turbina de alta velocidad con sistema push button.'},
  {id:'pana-air',name:'Pana Air NSK',category:'Piezas de mano',brand:'NSK',price:160,img:'mano7.jpg',description:'Turbina de alta velocidad de cambio de fresa con llave.'},
  {id:'kavo-push',name:'KaVo Push Button',category:'Piezas de mano',brand:'KaVo',price:349.99,img:'mano8.jpg',description:'Pieza de mano de alta velocidad push button con luz. Confirma el modelo exacto.'},
  {id:'contra-sigma',name:'Contraángulo Sigma',category:'Piezas de mano',brand:'Sigma',price:150,img:'mano9.jpg',description:'Contraángulo de baja velocidad para procedimientos clínicos.'},
  {id:'alta-sigma',name:'Pieza de alta Sigma',category:'Piezas de mano',brand:'Sigma',price:419.99,img:'mano11.jpg',description:'Pieza de alta velocidad con iluminación LED y salidas de agua.'},
  {id:'being-llave',name:'Pieza Being cambia fresa',category:'Piezas de mano',brand:'Being',price:240,img:'mano10.jpg',description:'Turbina Being con cambio de fresa mediante llave.'},
  {id:'recta-nsk',name:'Pieza recta NSK',category:'Piezas de mano',brand:'NSK',price:170,img:null,description:'Pieza recta de baja velocidad; imagen pendiente de incorporar.'},
  {id:'marathon',name:'Micromotor Marathon',category:'Micromotores',brand:'Marathon',price:450,img:null,description:'Micromotor para laboratorio y clínica; confirmar modelo e imagen del producto.'},
  {id:'rodaje-nsk',name:'Rodaje cerámico NSK (genérico)',category:'Repuestos',brand:'NSK',price:40,img:'p1.jpg',description:'Rodaje cerámico genérico tipo NSK. Verifica medidas y compatibilidad.'},
  {id:'rodaje-kavo',name:'Rodaje cerámico KaVo',category:'Repuestos',brand:'KaVo',price:40,img:'p2.jpg',description:'Rodaje cerámico tipo KaVo. Verifica medidas y compatibilidad.'},
  {id:'eje-push',name:'Eje Push Button',category:'Repuestos',brand:'Multimarca',price:80,img:'p3.jpg',description:'Eje push button para rotor. Verificar modelo de turbina.'},
  {id:'rotor-contra',name:'Rotor de contraángulo',category:'Repuestos',brand:'NSK',price:80,img:'p4.jpg',description:'Rotor de pieza de baja velocidad tipo contraángulo.'},
  {id:'rodaje-alemania',name:'Rodaje cerámico de Alemania',category:'Repuestos',brand:'Multimarca',price:80,img:'p5k.jpg',description:'Rodaje cerámico. Confirma medidas y procedencia específica.'},
  {id:'paletas-micro',name:'Paletas para micromotor',category:'Repuestos',brand:'Multimarca',price:70,img:'p6.jpg',description:'Paletas genéricas para micromotor; verificar compatibilidad.'},
  {id:'rodaje-wyh',name:'Rodaje tipo W&H',category:'Repuestos',brand:'W&H',price:60,img:'p7.jpg',description:'Rodaje cerámico compatible según referencia.'},
  {id:'seguro-contra',name:'Seguro de contraángulo',category:'Repuestos',brand:'NSK',price:15,img:'p8.jpg',description:'Seguro para contraángulo; confirmar referencia.'},
  {id:'tapa-nsk',name:'Tapa NSK Pana Air',category:'Repuestos',brand:'NSK',price:20,img:'p9.jpg',description:'Tapa para turbina Pana Air. Confirma la versión del modelo.'},
];
const CATEGORIES = [
  {name:'Piezas de mano',subtitle:'Turbinas y contraángulos',icon:'tool',img:'mano1.jpg'},
  {name:'Ultrasonidos',subtitle:'Destartraje y endodoncia',icon:'activity',img:'eq10.jpg'},
  {name:'Lámparas',subtitle:'Fotocurado LED',icon:'sun',img:'eq1k.jpg'},
  {name:'Rayos X y RVG',subtitle:'Diagnóstico dental',icon:'scan',img:'eq3k.jpg'},
  {name:'Repuestos',subtitle:'Componentes y accesorios',icon:'settings',img:'p1.jpg'},
  {name:'Micromotores',subtitle:'Precisión y potencia',icon:'zap',img:'assets/promo-micromotores.webp'}
];
