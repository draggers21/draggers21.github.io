from json import load, dump
from hashlib import sha256
from itertools import groupby
from os import walk, path


month_dict = {1: 'jan', 2: 'feb', 3: 'mar', 4: 'apr', 5: 'may', 6: 'jun',
    7: 'jul', 8: 'aug', 9: 'sep', 10: 'oct', 11: 'nov', 12: 'dec'}

INDIVIDUAL_BLOG_DATA_LOCATION = "static/meta_data/individual_author_data" 

BLOG_MASTER_DATA = {}


def parse_blog_data(individual_blog_data: list):
    for blog in individual_blog_data:
        blog_author = blog['blog_author']
        blog_location = blog['blog_location']
        blog_summary = blog['blog_summary']
        blog_id = sha256((blog_author+"<>"+blog_location+"<>"+blog_summary).encode("utf-8")).hexdigest()
        BLOG_MASTER_DATA[blog_id] = blog


def update_blog_meta_data():
    for root, dir, files in walk(INDIVIDUAL_BLOG_DATA_LOCATION):
        for file in files:
            if file.split(".")[-1] == "json" and "blog_data" in file.split(".")[0]:
                try:
                    print(f"[+] Trying to parse file {file} ...")
                    parse_blog_data(load(open(path.join(root, file))))
                except Exception as e:
                    print(f"[-] Could not parse file {file}. Error: {e}")
                    continue
                else:
                    print(f"[+] {file} parsed successfully.")

    try:
        print(f"[+] Trying to write master data to file.")
        dump(BLOG_MASTER_DATA, open('static/meta_data/blog_meta_data.json', 'w+'))
    except Exception as e:
        print(f"[-]  Master data could not be written to file. Error: {e}")
    else:
        print(f"[+] Master data successfully written to file.")


def update_meta_data(blog_meta_data):
    # updating author number
    try:
        print("[+] Trying to update author mapping...")
        author_blog_id = {}
        # Update author blog id mapping file
        sorted_blog_meta_items_by_author = sorted(
            list(blog_meta_data.items()), key=lambda k: k[1]['blog_author'])
        for i, g in groupby(sorted_blog_meta_items_by_author, key=lambda k: k[1]['blog_author'].strip()):
            author_blog_id[i] = [x[0] for x in list(g)]
        dump(author_blog_id, open('static/meta_data/author_blog_id_mapping.json', 'w+'))
    except Exception as e:
        print(f"[-] Could not update author mapping. Error: {e}")
        raise Exception
    else:
        print("[+] Author mapping updated successfully.")

    # Update tags to blog id mapping file
    try:
        print("[+] Trying to update tag mapping...")
        tags_list = list(set(sum([g['blog_tags']
                        for g in blog_meta_data.values()], [])))
        tags_blog_id = {key: [] for key in tags_list}
        for blog_id, blog_data in blog_meta_data.items():
            for tag in tags_list:
                if tag in blog_data['blog_tags']:
                    tags_blog_id[tag].append(blog_id)
        dump(tags_blog_id, open('static/meta_data/tags_blog_id_mapping.json', 'w+'))
    except Exception as e:
        print(f"[-] Could not update tag mapping. Error: {e}")
        raise Exception
    else:
        print("[+] Tag mapping updated successfully.")

    # Update date to blog id mapping
    try:
        print("[+] Trying to update date mapping...")
        date_to_blog_id = {}
        sorted_blog_meta_items_by_date = sorted(list(
            blog_meta_data.items()), key=lambda k: k[1]['blog_publish_date'].split("/")[-1])
        for i, g in groupby(sorted_blog_meta_items_by_author, key=lambda k: k[1]['blog_publish_date'].split("/")[-1]):
            yearly_dict = {}
            months = sorted(
                list(g), key=lambda k: k[1]['blog_publish_date'].split("/")[1])
            date_to_blog_id[i] = {}
            for month, list1 in groupby(months, key=lambda k: k[1]['blog_publish_date'].split("/")[1]):
                date_to_blog_id[i][month_dict[int(month)]] = [
                                                f[0] for f in list(list1)]
        dump(date_to_blog_id, open('static/meta_data/date_to_blog_id_mapping.json', 'w+'))
    except Exception as e:
        print(f"[-] Could not update date mapping. Error: {e}")
        raise Exception
    else:
        print("[+] Date mapping updated successfully.")


if __name__ == "__main__":
    
    try:
        update_blog_meta_data()    
    except Exception as e:
        print(f"[-] Master data could not be rendered. Error: {e}")
    else:
        print("[+] Master data rendered successfully.")
        try:
            print("[+] Trying to update meta data...")
            update_meta_data(blog_meta_data=BLOG_MASTER_DATA)
        except Exception as e:
            print(f"[-] Could not update meta data. Error: {e}")
        else:
            print("[+] Meta data updated successfully.")

    print("Commiting changes...\n\n")
