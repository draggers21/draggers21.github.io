from base64 import decodebytes
from sys import argv


if __name__ == "__main__":
    encoded_string = argv[1]
    if not encoded_string:
        print("[-] Missing positional argument - Encoded String.")
        print("[+] Usage: python3 base64decoder.py <encoded string>")
    else:
        decoded_string = decodebytes(bytes(encoded_string.encode('utf-8'))).decode('utf-8')
        print(f"Encoded string - {encoded_string}")
        print(f"Decoded string - {decoded_string}")