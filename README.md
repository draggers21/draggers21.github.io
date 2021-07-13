# draggers21.github.io


## IMPORTANT - 
1. DO NOT EDIT AND PUSH THE FILE **static/core/js/link_handling.js** and the file **static/core/js/config/prod_config.js**.
2. YOU CAN EDIT THE FILE **static/core/js/config/dev_config.js** BUT DO NOT PUSH IT TO CODE BASE. It is for your use only.
3. Replace the value of **BASE_URL** in **dev_config.js** as per your usage.
4. **link_handling.js** just replaces the href of all the anchor tags on a page and adds a base url to current href. This is done for SEO purposes and to streamline development environment.


## Steps to setup repo -
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
    2. Separate each different entity with blank spaces. A blank space before and a blank space after. As a general practice separate two different paragraph, a paragraph and an image or a code with a blank line in between different sections.
   
    3. **ADDING IMAGES:** To add an image use the following code syntax- 
        ```
        add_img:src=<Source of the image>:alt=<Alternate title of the image, this is used for SEO, Mandatory>:caption=<Caption for the image, always add caption, looks good :)>
        ```
        Eg: 
        add_img:src=static/images/OverTheWire-WriteUps/Leviathan/leviathan1to2/leviathan1to2_2.webp:alt=SSHing into the server:caption=SSHing into the server.
        
        **Please note: DO NOT USE ANY QUOTATION MARKS IN 'src' or 'alt' fields, but you are free to use ONLY SINGLE QUOTES in caption fields.**
        Eg: 
        add_img:src=static/images/OverTheWire-WriteUps/Leviathan/leviathan1to2/leviathan1to2_2.webp:alt=SSHing into the server:caption=SSHing 'into' the server.

    4. **ADDING CODE:** To add code to your blog. Use the following syntax - 
        ```
        add_code:lang=<Language>:code=/* Can be a multiline code */:code_end
        ```
        Example: 
        Code can be multiline - 
        ```
        add_code:lang=java:code= 
        class main{ 
        public static void main(String...args){
        System.out.println("1")}}
        :code_end
        ```
        ```
        add_code:lang=python:code= 
        def function():
            pass
        for i in range(45):
            print(i)
        :code_end
        ```

        Or a single line code.
        ```
        add_code:lang=javascript:code=alert("1"):code_end
        ```

        to see the list of all supported languages, see **ALL_SUPPORTED_LANGUAGES.md**
    5. **MAKING TEXT BOLD:** In order to put something in bold, within a paragraph (yes just paragraphs, bold images do not make any sense.), enclose the required content within    **"\*\*"**, just like in markdown.
        Eg: Consider this sentence - "I need to make \*\*this\*\* bold.
            When rendered it will be replaced as ```I need to make <strong>this</strong> bold.```
    6. **ADDING LINKS:** To add links to your blog. Use the following syntax - 
        ```
        add_link:url=<Url you want ot link>:text=<Text you want to display>:link_end
        ```
        1. External links - 
            External links can be added as it is and do not require any special attention.
           Example: 
            ```
            add_link:url=https://google.com:text=This is Google and an external link:link_end
            ```
            ```
            add_link:url=https://youtube.com:text=This is Youtube and an external link:link_end
            ```
        2. Internal links -
            Please note internal links do not need the leading website url, this is handled by **link_handling.js in static/core/js**. To link internal pages (index.html, view.html, search.html, error.html) simple use the html file name along with the required GET parameters. 

            - **view.html** - requires the **id** parameter, **id** here is the blog id.
            - **search.html** - requires the **query** parameter, **query** here is the search query.
            - **error.html** -  requires the **err_code** parameter, **err_code** represents the error code one ran into. To see all available error codes, view **static/core/js/constants.js**
        
            Examples-
            ```
            add_link:url=index.html:text=This is the home page of the blog and an internal link:link_end
            ```
            ```
            add_link:url=view.html?id=1:text=This is will show you the blog, with blog id 1.:link_end
            ```

    7. **ADDING PREVIOUS POST AND NEXT POST BUTTONS:** To add a previous post and next button at the end of the blog, use the following code:
       For "Next Post button" -
       ```
       next_post:url=<Url of the blog>:text=<Text you want to display>
       ```
       Example: 
       ```
       next_post:url=http://127.0.0.1:5500/view.html?id=1:text=This is first blog
       ```
       
       For "Previous Post button" -
       ```
       prev_post:url=<Url of the blog>:text=<Text you want to display>
       ```
       Example: 
       ```
       prev_post:url=http://127.0.0.1:5500/view.html?id=2:text=This is second blog
       ```
        Same applies to internal and external links in buttons as it applies in section 6. 
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
8.  **In case you have any doubts, ping/DM Chetanya Kunndra.** 


#### **DO NOT UNDER ANY CIRCUMSTANCES CHANGE THE JSON FILES PRESENT IN static/meta_data/ (this does not refer to the json files, present in individual_author_data directory, those can be changed). This refers to the following files -**
**1. author_blog_id_mapping.json**
**2. blog_meta_data.json**
**3. date_to_blog_id_mapping.json**
**4. tags_blog_id_mapping.json**

## Other Supplementary Python files - 
1. **image_converter.py**: Converts all **.png** and **.jpg** files located in a directory to **.webp** files. **WEBP** files are web optimized and better suited for websites. (SEO and performance wise too).
    **Usage: python3 image_converter.py <Path to directory>**
    It will read the contents of the directory and convert all the png/jpg files to webp format. Remove the old files after conversion to save memory.