# Notes

> Inside cell, you will need a div wrapper before being able to set independent style

Incorrect:
```
<Cell>
  <Independent>
</Cell>
```

Correct:
```
<Cell>
  <div>
    <Independent>
  </div>
</Cell>
```