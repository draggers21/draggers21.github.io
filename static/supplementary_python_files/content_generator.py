"""
    Name: content_generator.py
    Author: Chetanya Kunndra
    Contact: @Ck1998
    Desc: File to convert rough draft of blogs to html content based on rules defined in README.md
"""

from sre_constants import MARK
from sys import argv
from json import dump
from re import search, finditer, sub


IMAGE_REGEX_PATTERN = r"(add_img):(src)=(.+):(alt)=(.+):(caption)=(.+)"
BOLD_REGEX_PATTERN = r"\*\*"
CODE_REGEX_PATTERN = r"code_start:(lang=)(.*):(code=)(?:\s\n)?((?:.+\n+)+):code_end(?:[\n])?"
ALL_CODE_IN_CONTENT = {}

def create_code_section(lang, code):
    return f"<pre class='line-numbers' style='max-height: 500px;'><code class='language-{lang} match-braces'>{code}</code></pre>"

def create_image_section(src, alt, caption):
    return f"<div class='row'><div class='col' style='text-align: center;'><figure class='figure' style='align-items: center;'><img src='{src}' alt='{alt}' onclick='magnify(this.src)' class='figure-img img-fluid blog-image'><figcaption class='figure-caption blog-fig-caption'>{caption}</figcaption></figure></div></div>"


def create_next_post_button(url):
    return f"<div class='col next-post'><button type='button' class='btn'><a href='{url}'><strong>Next Post &raquo;</strong></a></button></div>"


def create_prev_post_button(url):
    return f"<div class='col prev-post'><button type='button' class='btn'><a href='{url}'><strong>Next Post &raquo;</strong></a></button></div>"


def parse_content(raw_content):
    blog_content = ""
    for line in raw_content:
        if line == "" or search(r"^[\s]*$", line):
            # Check if lines is empty or only consists of spaces. this is equivalent to a page break or a gap, 
            # replace it with <br /><br />
            blog_content += "<br /><br />"
        elif "add_img" == line[:7]:
            # Check if we are supposed to add image onto the page, if yes, extract the matches as per the regex 
            # and create an image element. For reference see : https://regex101.com/r/HDv22c/1
            match = search(IMAGE_REGEX_PATTERN, line)
            if not match:
                raise Exception("Invalid image tag format.")
            else:
                if match.group(2) == "src" and match.group(4) == "alt" and match.group(6) == "caption":
                    src = match.group(3)
                    alt = match.group(5)
                    caption = match.group(7)
                else:
                    raise Exception("Key properties missing in img tag, check again.")
                blog_content += create_image_section(src, alt, caption)
        elif "next_post" == line[:9] or "prev_post" == line[:9]:
            temp_line = "<div class='row'>"
            temp_line += "</div>"
        elif "code_start" == line[:10]:
            # for reference: https://regex101.com/r/trd3S1/1
            match = search(r"code_start:(id)=(.*):code_end", line)
            if match:
                section_id = int(match.group(2))
                blog_content += ALL_CODE_IN_CONTENT[section_id].replace("\n", "<br />")
            else:
                raise Exception("Invalid code section format.")
        else:
            # Check for bold elements in a list.
            matches = finditer(BOLD_REGEX_PATTERN, line)
            temp_line = ""
            all_bold_places = [match.span() for match in matches]
            if all_bold_places:
                for i in range(0, len(all_bold_places), 2):
                    
                    if i == 0:
                        # first point
                        temp_line+= line[0:all_bold_places[i][0]] + "<strong>" + line[all_bold_places[i][1]: all_bold_places[i+1][0]] + "</strong>"
                        if len(all_bold_places) == 2:
                            temp_line += line[all_bold_places[i+1][1]: len(line)]
                        else:
                            temp_line += line[all_bold_places[i+1][1]: all_bold_places[i+2][0]]
                    elif i == int(len(all_bold_places)-2):
                        # last point
                        temp_line += "<strong>"+line[all_bold_places[i][1]: all_bold_places[i+1][0]] + "</strong>" + line[all_bold_places[i+1][1]: len(line)]
                    else:
                        temp_line += "<strong>" + line[all_bold_places[i][1]: all_bold_places[i+1][0]] + "</strong>" + line[all_bold_places[i+1][1]: all_bold_places[i+2][0]]
                
                blog_content += temp_line
            else:
                    blog_content += line

    return blog_content.replace("\n", "")


def process_code_sections(raw_content):
    # See for reference: https://regex101.com/r/Fvd9jE/1
    CODE_COUNT=0
    temp_raw_content = ""
    all_code_sections = finditer(CODE_REGEX_PATTERN, raw_content)
    all_code_sections = [x for x in all_code_sections]
    # print(all_code_sections)
    for i, match in enumerate(all_code_sections):
        # match = all_code_sections[i]
        match_start = match.span()[0]
        match_end = match.span()[1]
        CODE_COUNT = CODE_COUNT+1
        lang = match.group(2)
        code = match.group(4)
        ALL_CODE_IN_CONTENT[CODE_COUNT] = create_code_section(lang, code)
        code_section_id = f"code_start:id={CODE_COUNT}:code_end\n"
        if match.group(1) == "lang=" and match.group(3) == "code=":
            if i == 0:
                if len(all_code_sections) == 1:
                    temp_raw_content += raw_content[0: match_start]+code_section_id+raw_content[match_end: len(raw_content)]
                else:    
                    # first match
                    temp_raw_content += raw_content[0: match_start]+code_section_id+raw_content[match_end: all_code_sections[i+1].span()[0]]
            elif i == len(all_code_sections) - 1:
                # second match
                temp_raw_content += raw_content[all_code_sections[i-1].span()[1]: match_start]+code_section_id+raw_content[match_end: len(raw_content)]
            else:    
                # Any intermediate sections
                temp_raw_content += raw_content[all_code_sections[i-1].span()[1]: match_start]+code_section_id+raw_content[match_end: all_code_sections[i+1].span()[0]]
    return temp_raw_content


def process_raw_content(file_path):
    try:
        print("[+] Trying to read contents of the file...")
        raw_content = open(file_path, "r").read()
    except Exception as e:
        print(f"[-] Could not read contents of the file. Error: {e}")
    else:
        try:
            print("[+] Trying to generate code sections of the blog.")
            semi_raw_content = process_code_sections(raw_content).splitlines()
        except Exception as e:
            print(f"[-] Could not generate code sections. Error: {e}")
        else:
            print("[+] Trying to parse the contents...")
            try:
                blog_content = parse_content(semi_raw_content)
            except Exception as e:
                print(f"[-] Could not parse file content. Error: {e}")
            else:
                print(f"[+] File contents parsed successfully.")
                dump({"blog_content":blog_content}, open("parsed_contents.json", 'w+'))
                print(f"[+] Parsed contents written to 'parsed_contents.json'.")


if __name__ == "__main__":
    try:
        RAW_CONTENT_PATH = argv[1]
    except Exception as e:
        print("[-] Positional argument missing")
        print("[+] Usage:python3 content_generator.py <path_to_file>")
    else:
        process_raw_content(RAW_CONTENT_PATH)