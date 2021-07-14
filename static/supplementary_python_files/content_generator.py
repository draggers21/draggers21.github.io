"""
    Name: content_generator.py
    Author: Chetanya Kunndra
    Contact: @Ck1998
    Desc: File to convert rough draft of blogs to html content based on rules defined in README.md
"""

from sys import argv
from json import dump
from re import search, finditer, sub


# Global Constants 

IMAGE_REGEX_PATTERN = r"(add_img):(src)=(.+):(alt)=(.+):(caption)=(.+)"
BOLD_REGEX_PATTERN = r"\*\*"
CODE_START_REGEX = r"add_code:"
CODE_CONTENT_REGEX = r"(lang=(.*)):(code=)(?:[\s\n]+)?((?:.+\n*)+)?"
CODE_END_REGEX = r":code_end"
ALL_CODE_IN_CONTENT = {}
ADD_LINK_REGEX = r"add_link:"
LINK_END_REGEX = r":link_end"
LINK_COMPONENTS_REGEX = r"(url)=(.*):(text)=(.*)"


def create_code_section(lang, code):
    code = code.replace(r"&", "&amp;").replace(r">", "&gt;").replace(r"<", "&lt;")
    return f"<pre class='line-numbers' style='max-height: 500px;'><code class='language-{lang} match-braces'>{code}</code></pre>"


def create_image_section(src, alt, caption):
    return f"<div class='row'><div class='col' style='text-align: center;'><figure class='figure' style='align-items: center;'><img src='{src}' alt='{alt}' onclick='magnify(this.src)' class='figure-img img-fluid blog-image'><figcaption class='figure-caption blog-fig-caption'>{caption}</figcaption></figure></div></div>"


def create_anchor_link(url, text):
    return f"<a href='{url}' target='_blank' rel='noopener'>{text}</a>"


def process_bold_text(line):
    # Check for bold elements in a list.
    matches = finditer(BOLD_REGEX_PATTERN, line)
    all_bold_places = [match.span() for match in matches]
    if all_bold_places:
        temp_line = ""
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

        return temp_line
    else:
        return line


def process_anchor_tags(line):
    # For reference see: https://regex101.com/r/nsqLKi/1
    
    total_add_links = list(finditer(ADD_LINK_REGEX, line))
    total_end_links = list(finditer(LINK_END_REGEX, line))
    # print(total_add_links, total_end_links)
    if not total_add_links and not total_end_links:
        return line
    elif len(total_add_links) != len(total_end_links):
        raise Exception("Incomplete anchor tag code.")
    else:
        temp_line = ""
        for i in range(len(total_add_links)):
            add_link_start = total_add_links[i].span()[0]
            add_link_end = total_add_links[i].span()[1]
            end_link_start = total_end_links[i].span()[0]
            end_link_end = total_end_links[i].span()[1]
            link_content = line[add_link_end:end_link_start]

            link_content_match = search(LINK_COMPONENTS_REGEX, link_content)
            if not link_content_match:
                raise Exception("Incorrect anchor code format, key components missing")
            else:
                url = link_content_match.group(2)
                text = link_content_match.group(4)

                generated_anchor_link = create_anchor_link(url, text)

                if i == 0:
                    if len(total_add_links) == 1:
                        temp_line += line[0: add_link_start]+generated_anchor_link+line[end_link_end: len(line)]
                    else:
                        temp_line += line[0: add_link_start]+generated_anchor_link
                elif i == len(total_add_links) - 1:
                    if len(total_add_links) == 2:
                        temp_line += line[total_end_links[i-1].span()[1]: add_link_start]+generated_anchor_link+line[end_link_end: len(line)]
                    else:
                        temp_line += line[total_end_links[i-1].span()[1]:add_link_start]+generated_anchor_link+line[end_link_end: len(line)]
                else:
                    temp_line += line[total_end_links[i-1].span()[1]: add_link_start]+generated_anchor_link

        return temp_line

 
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
        elif "code_start" == line[:10]:
            # for reference: https://regex101.com/r/trd3S1/1
            match = search(r"code_start:(id)=(.*):code_end", line)
            if match:
                section_id = int(match.group(2))
                blog_content += ALL_CODE_IN_CONTENT[section_id]
            else:
                raise Exception("Invalid code section format.")
        else:
            # Check for bold elements in a list.
            line = process_bold_text(line)
            line = process_anchor_tags(line)
            blog_content += line.replace("\n", "")
    return blog_content


def process_code_sections(raw_content):
    # See for reference: https://regex101.com/r/Fvd9jE/1
    CODE_COUNT=1
    all_code_start = list(finditer(CODE_START_REGEX, raw_content))
    all_code_end = list(finditer(CODE_END_REGEX, raw_content))
    
    if not all_code_start and not all_code_end:
        return raw_content
    elif len(all_code_start) != len(all_code_end):
        raise Exception("Incomplete code tags.")
    else:
        temp_raw_content = ""
        for i in range(len(all_code_start)):
            code_start_start = all_code_start[i].span()[0]
            code_start_end = all_code_start[i].span()[1]
            code_end_start = all_code_end[i].span()[0]
            code_end_end = all_code_end[i].span()[1]

            code_content = raw_content[code_start_end:code_end_start]
            
            code_content_match = search(CODE_CONTENT_REGEX, code_content)
            if not code_content_match:
                raise Exception("Invalid code format missing key values")
            else:
                lang = code_content_match.group(2)
                code = code_content_match.group(4)
                ALL_CODE_IN_CONTENT[CODE_COUNT] = create_code_section(lang, code)
                code_section_id = f"code_start:id={CODE_COUNT}:code_end"

                if i == 0:
                    if len(all_code_start) == 1:
                        temp_raw_content += raw_content[0: code_start_start]+code_section_id+raw_content[code_end_end: len(raw_content)]
                    else:
                        temp_raw_content += raw_content[0: code_start_start]+code_section_id
                elif i == len(all_code_start) - 1:
                    if len(all_code_start) == 2:
                        temp_raw_content += raw_content[all_code_end[i-1].span()[1]:code_start_start]+code_section_id+raw_content[code_end_end: len(raw_content)]
                    else:
                        temp_raw_content += raw_content[all_code_end[i-1].span()[1]: code_start_start]+code_section_id+raw_content[code_end_end: len(raw_content)]
                else:
                    temp_raw_content += raw_content[all_code_end[i-1].span()[1]:code_start_start]+code_section_id

                CODE_COUNT = CODE_COUNT+1

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
            # Converting semi raw content to array of lines that will be used in parse_contents
            semi_raw_content = process_code_sections(raw_content).splitlines()
        except Exception as e:
            print(f"[-] Could not generate code sections. Error: {e}")
        else:
            print("[+] Code section generated successfully.")
            print("[+] Trying to parse the contents...")
            try:
                blog_content = parse_content(semi_raw_content)
                # appending the previous and next post section after the blog has been processed.
            except Exception as e:
                print(f"[-] Could not parse file content. Error: {e}")
            else:
                print(f"[+] File contents parsed successfully.")
                parsed_file_name = ["." if x == "" else x for x in RAW_CONTENT_PATH.split(".")[:-1]]
                parsed_file_name = "".join(parsed_file_name)+"_parsed.json"
                dump({"blog_content":blog_content}, open(parsed_file_name, 'w+'))
                print(f"[+] Parsed contents written to '{parsed_file_name}'.")


if __name__ == "__main__":
    try:
        RAW_CONTENT_PATH = argv[1]
    except Exception as e:
        print("[-] Positional argument missing")
        print("[+] Usage:python3 content_generator.py <path_to_file>")
    else:
        process_raw_content(RAW_CONTENT_PATH)
