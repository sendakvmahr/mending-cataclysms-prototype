import os
from glob import glob

ENTITIES_DIR = os.getcwd() + "/js/entities/"
JS_PATH = os.getcwd() + "/js/"
ENTITIES_FILE = ENTITIES_DIR + "EntityMaker.js"
ENTITY_JS = """
define([
    {paths}
    ],
function(
    {objnames}
    )
{{    
    function EntityMaker(entityName, info) {{
    switch(entityName) {{
{cases}
        default:
            console.log("Unknown entity: " + entityName)
            return new Entity.Entity(info);
        }}
    }}              
    return EntityMaker;
}});
"""
CASE_STRING = """        case "{entityName}":
            return new {entityName}.{entityName}(info);
"""

entities = [y.replace(JS_PATH, "").replace(".js", "") for x in os.walk(ENTITIES_DIR) for y in glob(os.path.join(x[0], '*.js'))]
entities.remove("entities/EntityMaker")
paths = ",\n\t".join([repr(e) for e in entities])
objnames = ",\n\t".join([e.split("/")[-1] for e in entities])
cases = "".join([CASE_STRING.format(entityName=e.split("/")[-1]) for e in entities])

output = ENTITY_JS.format(paths=paths, objnames=objnames, cases=cases)

file = open(ENTITIES_FILE, "w")
file.write(output)
file.close()

