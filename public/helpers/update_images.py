import os
from glob import glob

IMAGES_DIR = os.getcwd() + "/images/"
IMAGES_OUTPUT = os.getcwd() + "/js/assets/loadImages.js"
OUTPUT_FORMAT = """
let imageNames = [
{images}
]

let images = {{}};
let loaded = 0;
let numImages = imageNames.length;
if (imageNames.length == 0) {{
    start();
}}
else {{
    for (let i = 0; i < numImages; i++) {{
        let index = imageNames[i];
        images[index] = new Image();
        images[index].src = "images/" + index + ".png";
        images[index].onload = function(){{ 
            loaded++;
            if (loaded === numImages) {{
                start();
            }}
        }}
    }}
}}       
"""



images =  [y for x in os.walk(IMAGES_DIR) for y in glob(os.path.join(x[0], '*.png'))]
img_strs = []

for image in images:
    image_name = image.replace(IMAGES_DIR, "").replace(".png", "")
    img_strs.append(repr(image_name))

output = OUTPUT_FORMAT.format(images="\t" + ",\n\t".join(img_strs))

file = open(IMAGES_OUTPUT, "w")
file.write(output)
file.close()

