encrypted_string = 'OMQEMDUEQMEK'

for i in range(1,27):
    temp_str = ""
    for x in encrypted_string:
        int_val = ord(x) + i
        if int_val > 90:
            # 90 is the numerical value for 'Z'
            # 65 is the numerical value for 'A'
            # If int_val is greater than Z then 
            # the number is greater then 90 then 
            # we must again count the difference 
            # from A.
            int_val = 64 + (int_val - 90)
        temp_str += chr(int_val)    
    print(f"{i} {temp_str}")