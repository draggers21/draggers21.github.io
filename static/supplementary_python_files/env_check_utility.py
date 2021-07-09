"""
    Name: config_checker.py
    Author: Chetanya Kunndra
    Contact: @Ck1998
    Desc: A small utility to check whether the env is set to prod before pushing the code.
"""
from re import search, sub

# See for reference: https://regex101.com/r/J3romj/1
MATCHING_REGEX = r'let ENV = "dev";'
FILE_LOCATION = "static/core/js/link_handling.js"

if __name__ == "__main__":
    try:
        print("[+] Check link_handling.js file for ENV changes.")
        file_content = open(FILE_LOCATION, "r+").read()
        if search(MATCHING_REGEX, file_content):
            print("[+] ENV change detected, changing ENV to default value.")
            file_content = sub(MATCHING_REGEX, 'let ENV = "prod";', file_content)
            open(FILE_LOCATION, "w+").write(file_content)
        else:
            print("[+] No ENV change. ALL OK!")
    except Exception as e:
        print(f"[+] Could check and rectify for ENV variable in link_handling.js. Error: {e}")
    else:
        print("[+] link_handling.js file checked successfully.")

    print("\n\n")