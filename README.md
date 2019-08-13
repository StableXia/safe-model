# safe-model

前端数据解析

## Installing

Using npm:

```bash
$ npm install axios
```

## Example

```js
import SafeModel from "safe-model"
const paopaoModel = new SafeModel({
  name: {
    type: String,
    property: "paoId",
    value: "三炮"
  },
  age: {
    type: Number,
    property: "age.paopao",
    format: val => `${val}岁`
  }
})

const paopaoState = paopaoModel.parse({
  age: {
    paopao: 18
  }
})
```

## License

MIT
