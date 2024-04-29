import * as math from './_js/math.js';import * as js from './_js/js.js';import * as arr from './_js/arr.js';import * as client from './_js/client.js';import * as bytes from './_js/bytes.js';import * as str from './_js/str.js';import * as ui from './_js/ui.js';import * as dic from './_js/dic.js';import * as timer from './_js/timer.js';import * as time from './_js/time.js';import * as storage from './_js/storage.js';import * as b64 from './_js/b64.js';import * as sys from './_js/sys.js';import * as iter from './_js/iter.js';import * as domo from './_js/domo.js';import * as cryp from './_js/cryp.js';



const esDic =sys.$checkNull( {
  "???": "???",
  "Back": "Atrás",
  "Click %0 to continue.": "Click %0 para continuar.",
  "Dance Management": "Gestión de música dance",
  "Dance Song": "Música dance",
  "Fast": "Rápido",
  "Good": "Bueno",
  "Group": "Grupo",
  "Groups": "Grupos",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "La sesión de KtWeb ha sido cerrada.\nHay que autenticarse en KtWeb:Main.",
  "Long Dance": "Dance (largo)",
  "Long Dance Songs": "Dance (Temas largos)",
  "More": "Más",
  "Name": "Nombre",
  "Ok": "Normal",
  "Picture": "Imagen",
  "Pictures Management": "Gestión de imágenes",
  "Pictures Management [ %0 / %1 ]": "Gestión de imágenes [ %0 / %1 ]",
  "Quality": "Calidad",
  "Session is expired.": "Las sesión ha expirado.",
  "Short Dance": "Dance (corto)",
  "Short Dance Songs": "Dance (Temas cortos)",
  "Sights": "Vistas",
  "Slow": "Lento",
  "Song": "Tema",
  "Songs Management": "Gestión de música",
  "Speed": "Velocidad",
  "Stand By": "Espera",
  "Time": "Tiempo",
  "Times Management": "Gestión de tiempos",
  "Wallpapers": "Fondos de Pantalla",
  "Wallpapers with Music": "Fondos con música",
  "Wallpapers with Radio": "Fondos con radio",
  "here": "aquí"
});

export  function es() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "es"));};

const enDic =sys.$checkNull( {
  "???": "???",
  "Back": "Back",
  "Click %0 to continue.": "Click %0 to continue.",
  "Dance Management": "Dance Management",
  "Dance Song": "Dance Song",
  "Fast": "Fast",
  "Good": "Good",
  "Group": "Group",
  "Groups": "Groups",
  "KtWeb session is closed.\nAuthenticating from KtWeb:Main.": "KtWeb session is closed.\nAuthenticating from KtWeb:Main.",
  "Long Dance": "Long Dance",
  "Long Dance Songs": "Long Dance Songs",
  "More": "More",
  "Name": "Name",
  "Ok": "Ok",
  "Picture": "Picture",
  "Pictures Management": "Pictures Management",
  "Pictures Management [ %0 / %1 ]": "Pictures Management [ %0 / %1 ]",
  "Quality": "Quality",
  "Session is expired.": "Session is expired.",
  "Short Dance": "Short Dance",
  "Short Dance Songs": "Short Dance Songs",
  "Sights": "Sights",
  "Slow": "Slow",
  "Song": "Song",
  "Songs Management": "Songs Management",
  "Speed": "Speed",
  "Stand By": "Stand By",
  "Time": "Time",
  "Times Management": "Times Management",
  "Wallpapers": "Wallpapers",
  "Wallpapers with Music": "Wallpapers with Music",
  "Wallpapers with Radio": "Wallpapers with Radio",
  "here": "here"
});

export  function en() {sys.$params(arguments.length, 0); Lang[0] =sys.$checkExists(Lang[0],sys.$checkNull( "en"));};


 function dicByKey(s)  {sys.$params(arguments.length, 1); return (   
  sys.$eq(s,"es")? esDic:
  sys.$eq(s,"en")? enDic:
   "Unreachable"
);};

const Lang =sys.$checkNull( ["es"]);

export  function getLang() {sys.$params(arguments.length, 0);  return Lang[0];};


export  function tlt(s)  {sys.$params(arguments.length, 1);
  const T =sys.$checkNull( dic.get(dicByKey(Lang[0]), s));
   return !sys.asBool(T) ? s : T[0];
};


export  function fmt(tp, Rpls)  {sys.$params(arguments.length, 2);
  const R =sys.$checkNull( [tp]);
  for (let i = 0;i < arr.size(Rpls); ++i) R[0] =sys.$checkExists(R[0],sys.$checkNull( str.replace(R[0], "%" + sys.toStr(i), Rpls[i])));
   return R[0];
};
