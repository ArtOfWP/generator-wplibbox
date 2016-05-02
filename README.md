# WPLib Box Maker
Generates a custom wplibbox setup using [Yeoman](http://yeoman.io).
## Usage
1) Change directory to where you want the box to be located.
2) Then write ```yo wplibbox your-box-name``` A folder with the 
name *your-box-name* will be created and the required files 
will created there. wplib.box will list all your installed sites. 
*your-box-name* will be added as a new site as *your-box-name*.dev.

### Add a site
1) Change directory to your box.
2) Then write ```yo wplibbox:add-site mynewsite.dev```
3) A new site will be added as **your-box/www/mynewsite-dev**.

## Dev Helper
To get all template placeholders run 
```
grep -ohRP "(?<=<%= )[a-z.]*(?= %>)" templates/  | sort | uniq
```