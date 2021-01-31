
const RESSOURCE_PATH = `${__dirname.substring(0,__dirname.lastIndexOf('\\'))}/modele/`

const CSS_PATH = RESSOURCE_PATH+"css/"
const IMAGE_PATH = RESSOURCE_PATH+"img/"
const JS_PATH = RESSOURCE_PATH+"js/"

class Path
{
    static src_path = RESSOURCE_PATH
}
var exp =
{
    src_path : RESSOURCE_PATH,
    img_path : IMAGE_PATH,
    js_path  : JS_PATH,
 }
module.exports = Path

console.log('Path.js=>',exp)