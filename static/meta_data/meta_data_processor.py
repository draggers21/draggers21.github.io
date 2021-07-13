"""
    Name: meta_data_processor.py
    Authors: Manasvi Gupta, Chetanya Kunndra
    Contact: @Manasvi1997 @Ck1998
    Desc: Converts individual blog data into meta data and creates mapping that is used in the website.
"""

from json import load, dump
from hashlib import sha256
from itertools import groupby
from os import walk, path
from datetime import datetime
from uuid import uuid4


month_dict = {1: 'jan', 2: 'feb', 3: 'mar', 4: 'apr', 5: 'may', 6: 'jun',
    7: 'jul', 8: 'aug', 9: 'sep', 10: 'oct', 11: 'nov', 12: 'dec'}


INDIVIDUAL_BLOG_DATA_LOCATION = "static/meta_data/individual_author_data" 
MASTER_DATA_LOCATION = "static/meta_data/blog_meta_data.json"
BLOG_MASTER_DATA = load(open(MASTER_DATA_LOCATION, "r"))


def generate_hash(string):
    return sha256((string).encode("utf-8")).hexdigest()


def parse_blog_data(individual_blog_data: list):
    for blog in individual_blog_data:
        try:
            semi_hash =  blog.pop('semi_hash')
        except KeyError:
            semi_hash = generate_hash(str(datetime.now())+str(uuid4()))
        
        if not semi_hash:
            semi_hash = generate_hash(str(datetime.now())+str(uuid4()))

        if semi_hash[:4] == "old:":
            blog_hash = semi_hash[4:]
        else:
            blog_hash = generate_hash(semi_hash)
        BLOG_MASTER_DATA[blog_hash] = blog
        blog['semi_hash'] = semi_hash

    return individual_blog_data


def update_blog_meta_data():
    for root, dir, files in walk(INDIVIDUAL_BLOG_DATA_LOCATION):
        for file in files:
            if file.split(".")[-1] == "json" and "blog_data" in file.split(".")[0]:
                try:
                    print(f"[+] Trying to parse file {file} ...")
                    processed_data = parse_blog_data(load(open(path.join(root, file))))
                    dump(processed_data, open(path.join(root, file), "w+"), indent=4)
                except Exception as e:
                    print(f"[-] Could not parse file {file}. Error: {e}")
                    continue
                else:
                    print(f"[+] {file} parsed successfully.")

    try:
        print(f"[+] Trying to write master data to file.")
        dump(BLOG_MASTER_DATA, open(MASTER_DATA_LOCATION, 'w+'))
    except Exception as e:
        print(f"[-]  Master data could not be written to file. Error: {e}")
    else:
        print(f"[+] Master data successfully written to file.")


def update_author_mapping(blog_meta_data):
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

    return sorted_blog_meta_items_by_author


def update_tag_mapping(blog_meta_data):
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


def update_date_mapping(blog_meta_data, sorted_blog_meta_items_by_author):
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


def update_meta_data(blog_meta_data):
    sorted_blog_meta_items_by_author = update_author_mapping(blog_meta_data)
    update_tag_mapping(blog_meta_data)
    update_date_mapping(blog_meta_data, sorted_blog_meta_items_by_author)


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

    print("\n")
