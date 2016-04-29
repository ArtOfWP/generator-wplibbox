# WPLibBox Maker
Generates a custom wplibbox setup using [Yeoman](http://yeoman.io).
## Usage
1) Change directory to where you want the box to be located.
2) Then write ```yo wplibbox your-box-name``` A folder with the 
name *your-box-name* will be created and the required files 
will created there.

## Dev Helper
To get all template placeholders run 
```
grep -ohRP "(?<=<%= )[a-z.]*(?= %>)" templates/  | sort | uniq
```