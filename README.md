## LowDB Demo

# Setup: 

In your terminal run the following:

```
npm install lowdb --save
```

In your server require the following: 

```
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
```

Then add: 

```
const adapter = new FileSync('db.json')
const db = low(adapter)
```



# Helpful links: 

[Docs](https://github.com/typicode/lowdb)
