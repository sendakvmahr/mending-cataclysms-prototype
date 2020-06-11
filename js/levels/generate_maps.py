import os
import xml.etree.ElementTree as ET

CURRENT = os.getcwd()
LEVELS_DIR = CURRENT + "/maps"
ASSETS_DIR = CURRENT + "/tilesets/"
MAP_BASE = """
        "{name}" : {{
            "name" : "{name}",
            "tileset": "{tileset}",
            "tilewidth": "{tilewidth}",
            "tileheight": "{tileheight}",
            "width": "{mapwidth}",
            "height": "{mapheight}",
            "objects" : [
{objects}
            ],
            "layers": {{
{layers}
            }}
        }}"""
MAP_LAYER = """
                    "{layername}" : [{layertiles}]"""
MAP_OBJECT = """                {{
{properties}
                }}"""
MAP_OBJECT_PROPERTY = '''
                    "{name}" : "{value}"'''
MAP_FILE_BASE = """define([],
function()
{{
    maps = {{
{maps}
    }}
    return maps;
}});
"""

TILESET_FILE_BASE = """define([],
function()
{{
    tiles = {{
{tiles}
    }}
    return tiles;
}});
"""

TILESET = """\t\t"{name}": {{
\t\t\t"name": "{name}",
\t\t\t"image": "{image}",
\t\t\t"width": "{width}",
\t\t\t"height": "{height}",
\t\t\t"tilecount": "{tilecount}",
\t\t\t"properties": [
{properties}
\t\t\t]
\t\t}},
"""

TILE = """\t\t\t\t{{
{properties}
\t\t\t\t}}"""
TILE_PROPERTY = '''\t\t\t\t\t"{property_name}" : "{property_val}"'''

def readfile(filename):
    # gets str in a file
    file = open(filename)
    results = file.read()
    file.close()
    return results

def gen_files(path):
    # Gets all the files in the specified path
    results = []
    for obj in os.listdir(path):
        new_path = os.path.join(path, obj)
        if os.path.isdir(new_path):
            results += gen_results(new_path)
        else:
            results.append(new_path)
    return results

def generate_single_map(filename):
    # Map to JSON 
    root = ET.parse(filename).getroot()
    name = filename.split("/")[-1].split("\\")[-1][:-4]
    tileset = root.find("tileset").attrib["source"].split("/")[-1][:-4]
    tileheight = root.attrib["tileheight"].split("/")[-1]
    tilewidth = root.attrib["tilewidth"].split("/")[-1]
    mapwidth = root.attrib["width"].split("/")[-1]
    mapheight = root.attrib["height"].split("/")[-1]
    layers = []
    for l in root.findall('layer'):
        layername =  l.attrib["name"]
        layertiles = l.find("data").text.replace("\n", "")
        layers.append(MAP_LAYER.format(layername=layername, layertiles=layertiles))
    objects = []
    for objectgroup in root.findall("objectgroup"):
        for ob in objectgroup.findall("object"):
            properties = ob.attrib
            if ob.find("properties") != None:
                for p in ob.find("properties"):
                    properties[p.attrib["name"]] = p.attrib["value"]
            properties = ",".join([MAP_OBJECT_PROPERTY.format(name=key, value=obj) for key, obj in properties.items()])
            properties = MAP_OBJECT.format(properties=properties)
            objects.append(properties)
    objects = ",".join(objects)
    layers = ",".join(layers)
    result = MAP_BASE.format(name=name, tileset=tileset, tilewidth=tilewidth, \
                tileheight=tileheight, mapwidth=mapwidth, \
                mapheight=mapheight, layers=layers, objects=objects)
    return(result)

def generate_map_files(levels):
    maps = ""
    for level in levels:
        maps += generate_single_map(level) + ",\n"
    file = open("maps.js", "w")
    file.write(MAP_FILE_BASE.format(maps=maps))
    file.close()

def from_xml_tileset(filename):
    # formats relevant information into a json string
    root = ET.parse(filename).getroot()
    tilewidth = int(root.attrib["tilewidth"])
    name = filename.split("/")[-1].replace(".tsx", "")
    _image = root.find("image")
    image = _image.attrib["source"].split("/")[-1]
    width = _image.attrib["width"]
    height = _image.attrib["height"]
    tilecount = int(root.attrib["tilecount"])
    properties = []
    for tile in root.findall('tile'):
        tiles = []
        tiles.append(TILE_PROPERTY.format(property_name="id", property_val=tile.attrib["id"]))
        for p in tile.find("properties").findall("property"):
            tiles.append(TILE_PROPERTY.format(property_name=p.attrib["name"], property_val=p.attrib["value"]))
        properties.append(TILE.format(properties=",\n".join(tiles)))

    properties = ",\n".join(properties)
            
    return TILESET.format(name=name, image=image, properties=properties, \
                          width=width, height=height, tilecount=tilecount)

def rewrite_assets(tilesets):
    tiles = ""
    for tileset in tilesets:
        tiles += from_xml_tileset(tileset)
    file = open("tilesets.js", "w")
    file.write(TILESET_FILE_BASE.format(tiles=tiles))
    file.close()


maps = gen_files(LEVELS_DIR)
generate_map_files(maps)

tilesets = gen_files(ASSETS_DIR)
rewrite_assets(tilesets)
