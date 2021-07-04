"""
    Name: image_converter.py
    Author: Chetanya Kunndra
    Contact: @Ck1998
    Desc: File to convert png and jpg to webp
"""

from PIL import Image
import os
from sys import argv


def jpg_to_webp(file_name):
    Image.open(file_name+'.jpg').convert("RGB").save(file_name+'.webp', 'webp')


def png_to_webp(file_name):
    Image.open(file_name+'.png').convert("RGB").save(file_name+'.webp', 'webp')


def start_conversion(path):
    for root,dirs,files in os.walk(path, topdown=True):
        for file in files:
            file_name = file.split(".")[0]
            ext = file.split(".")[1]
            try:
                if ext == "png":
                    png_to_webp(root+file_name)
                elif ext == "jpg":
                    jpg_to_webp(root+file_name)
            except Exception as e:
                print(f"[-] Could not convert file: {root+file_name}. Error: {e}")
            else:
                print(f"[+] Successfully converted file: {root+file_name}.")        


if __name__ == "__main__":
    path = argv[1]
    if not path:
        print("[-] Key positional argument missing.")
        print("[+] Usage python3 image_converter.py <path to directory containing images.>")
    else:
        print(f"[+] Trying to convert image files located in: {path}")
        try:
            start_conversion(path)
        except Exception as e:
            print(f"[-] Could not convert some files. Error - {e}")
        else:
            print("[+] All files converted successfully.")
