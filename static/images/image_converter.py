from PIL import Image
import os
import sys

path = sys.argv[1]

for root,dirs,files in os.walk(path, topdown=True):
    for file in files:
        file_name = file.split(".")[0]
        ext = file.split(".")[1]
        if ext == "png":
            Image.open(root+file_name+'.png').convert("RGB").save(root+file_name+'.webp', 'webp')
