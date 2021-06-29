import json
from itertools import groupby

month_dict = {1:'jan',2:'feb',3:'mar',4:'apr',5:'may',6:'jun',7:'jul',8:'aug',9:'sep',10:'oct',11:'nov',12:'dec'}
blog_meta_data = json.load(open('static/meta_data/blog_meta_data.json'))
author_blog_id = {}


#Update author blog id mapping file
sorted_blog_meta_items_by_author = sorted(list(blog_meta_data.items()),key=lambda k:k[1]['blog_author'])
for i,g in groupby(sorted_blog_meta_items_by_author,key = lambda k:k[1]['blog_author'].strip()):
    author_blog_id[i] = [x[0] for x in list(g)]


#Update tags to blog id mapping file
tags_list = list(set(sum([g['blog_tags'] for g in blog_meta_data.values()],[])))
tags_blog_id = {key: [] for key in tags_list}
for blog_id,blog_data in blog_meta_data.items():
    for tag in tags_list:
        if tag in blog_data['blog_tags']:
            tags_blog_id[tag].append(blog_id)

#Update date to blog id mapping
date_to_blog_id = {}
sorted_blog_meta_items_by_date = sorted(list(blog_meta_data.items()),key=lambda k:k[1]['blog_publish_date'].split("/")[-1])
for i,g in groupby(sorted_blog_meta_items_by_author,key = lambda k:k[1]['blog_publish_date'].split("/")[-1]):
    yearly_dict = {}
    months = sorted(list(g),key = lambda k:k[1]['blog_publish_date'].split("/")[1])
    date_to_blog_id[i] = {}
    for month,list1 in groupby(months,key=lambda k:k[1]['blog_publish_date'].split("/")[1]):
        date_to_blog_id[i][month_dict[int(month)]] = [f[0] for f in list(list1)]

json.dump(author_blog_id,open('static/meta_data/author_blog_id_mapping.json','w+'))
json.dump(date_to_blog_id,open('static/meta_data/date_to_blog_id_mapping.json','w+'))
json.dump(tags_blog_id,open('static/meta_data/tags_blog_id_mapping.json','w+'))
