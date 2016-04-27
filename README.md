# wplibbox-maker
Generates a custom wplibbox setup

## Helper
To get all template placeholders run 
```
grep -ohRP "(?<=<%= )[a-z.]*(?= %>)" templates/  | sort | uniq
```