import codecs

ENCRYPTION = 'rot-13'
encrypted_string = 'YRIRY GJB CNFFJBEQ EBGGRA'
print(f'Encrypted string: {encrypted_string}')
print(f'Decrypted string: {codecs.getencoder(ENCRYPTION)(encrypted_string)[0]}')