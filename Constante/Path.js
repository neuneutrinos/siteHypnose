
const path = require('path')

const ROOT_PATH = path.resolve(__dirname,'..')
const RESSOURCE_PATH = path.join(ROOT_PATH,'modele')

var exp =
{
    ROOT_PATH:ROOT_PATH,
    RESSOURCE_PATH:RESSOURCE_PATH,
    RESSOURCE_PATH_CSS:path.join(RESSOURCE_PATH,'css'),
    RESSOURCE_PATH_JS:path.join(RESSOURCE_PATH,'js'),
    RESSOURCE_PATH_IMG:path.join(RESSOURCE_PATH,'img'),
    RESSOURCE_PATH_EJS_ROOT:path.join(ROOT_PATH,'front/vue')
}
module.exports = exp