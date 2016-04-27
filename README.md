# wplibbox-maker
Generates a custom wplibbox setup
## Usage
You need to call ```yo wplibbox your-box-name```

## Dev Helper
To get all template placeholders run 
```
grep -ohRP "(?<=<%= )[a-z.]*(?= %>)" templates/  | sort | uniq
```