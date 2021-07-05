# draggers21.github.io

## **Steps to setup repo -**
1. Use VS Code. (Has a very handy extension marketplace).
2. Install **Live Server** extension from the VS Code's Extension Tab. Once installed, reload workspace and you will see a **'Go Live'** button in bottom right section of VS Code. Use it to launch a small live server and see how the website is working. (In order to view the website in full capacity/properly, we need a live server as the JS used in the project uses the **fetch** api to get JSON files and process them, it won't work otherwise.)
3. Now copy the **pre-commit** file located in the project root, to the destination **.git/hooks**.
    Linux users, use command - 
    ```
    cp pre-commit .git/hooks/**
    ```

    Windows users, use command (Check option **Show hidden files.** in file menu or somewhere, haven't used Windows in a long while. this folder is hidden by default)- 
    ```
    xcopy pre-commit .git/hooks/**
    ```
    Or you can just copy paste the files like normal.

    Mac users, use command - 
    ```
    cp pre-commit .git/hooks/**
    ```

    What this file does is that it will run the following command right before committing your code to git-
    ```
    python3 static/meta_data/meta_data_processor.py
    git add .
    ```

    the python file **meta_data_processor.py**, process individual author blog data located in **static/meta_data/individual_author_data/** directory, and creates the meta data that is used in the website. 


## **Steps to add blogs -**
1. All blog related JSON files are stored in **static/blog/** directory. If you are creating a blog on a new topic, consider creating a separate directory for it and add all related JSON files to it. 
2. To create a blog, create a JSON file with any name you like.
3. Write up a draft of your blog using the following rules **(see files in static/samples/ for reference)**-
   1. Separate two paragraphs with a blank line. 
        Eg: 
        ```
        This is para 1.

        This is para 2
        ```
        This will be converted to - 
        ```
        This is para 1.
        <br /><br />
        This is para 2
        ```

        If no separate line is added between two paragraphs, they will be added in the line and treated as same paragraphs and will look like this.
        ```
        This is para 1.This is para 
        ```
    2. To add an image use the following code syntax- 
        ```
        add_img:src=<Source of the image>:alt=<Alternate title of the image, this is used for SEO, Mandatory>:caption=<Caption for the image, always add caption, looks good :)>
        ```
        Eg: 
        1. add_img:src=static/images/OverTheWire-WriteUps/Leviathan/leviathan1to2/leviathan1to2_2.webp:alt=SSHing into the server:caption=SSHing into the server.
        
        **Please note: DO NOT USE ANY QUOTATION MARKS IN 'src' or 'alt' fields, but you are free to use ONLY SINGLE QUOTES in caption fields.**
        Eg: 
        1. add_img:src=static/images/OverTheWire-WriteUps/Leviathan/leviathan1to2/leviathan1to2_2.webp:alt=SSHing into the server:caption=SSHing 'into' the server.

    3. To add code to blog use this following code snippet -
        **Yet to add :(:(**
    4. Separate image and paragraphs using a single blank line. In general separate any two different entities by a single blank line.
    5. In order to put something in bold, within a paragraph (yes just paragraphs, bold images do not make any sense.), enclose the required content within    **"\*\*"**, just like in markdown.
        Eg: Consider this sentence - "I need to make \*\*this\*\* bold.
            When rendered it will be replaced as ```I need to make <strong>this</strong> bold.```
        
4. Now once your rough draft is ready, use the python file **content_generator.py** located in the **static/supplementary_python_files** directory.
    **Usage: python3 content_generator.py <path to your rough draft>**
    This will generate a JSON file whose contents will be **{blog_content:"<rendered rough draft in html>"}**, copy the whole content, directly to the JSON file you created in step 2.
5. Now go to **static/meta_data/individual_author_data/** and create a JSON file using your name. **For Eg. blog_data_john_doe.JSON**. This JSON file will hav an array of dictionaries. **(See sample files in static/sample)**. Each individual dictionary will contain the information about your blog. **PLEASE STICK TO THE FORMAT DESCRIBED IN THE SAMPLE FILES!!!**
6. Once all this has been done, use the following commands to push your blog onto git. **(Be sure to be in the project root)**
    ```
    git add .
    git commit -m "<Commit message>"
    git push
    ```
    The pre-commit file will take care of the rest. 
7. Any corresponding images or any images in general are to be added into **static/images** folder, create a separate directory (If making a blog on a new topic) and add all images to that folder. Use the **image_converter.py** file located in **static/tatic/supplementary_python_files**, to convert images to web optimized images, i.e. **.webp**. See **Other Supplementary Python files** section below for usage.
8. **In case you have any doubts, ping/DM Chetanya Kunndra.** 


#### **DO NOT UNDER ANY CIRCUMSTANCES CHANGE THE JSON FILES PRESENT IN static/meta_data/ (this does not refer to the json files, present in individual_author_data directory, those can be changed). This refers to the following files -**
**1. author_blog_id_mapping.json**
**2. blog_meta_data.json**
**3. date_to_blog_id_mapping.json**
**4. tags_blog_id_mapping.json**

## Other Supplementary Python files - 
1. **image_converter.py**: Converts all **.png** and **.jpg** files located in a directory to **.webp** files. **WEBP** files are web optimized and better suited for websites. (SEO and performance wise too).
    **Usage: python3 image_converter.py <Path to directory>**
    It will read the contents of the directory and convert all the png/jpg files to webp format. Remove the old files after conversion to save memory.