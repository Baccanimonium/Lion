# Утилиты

```
storybook:serve
```
##
Перечень
--

```
<utils>
  ├─ Formats/                       # Преобразование значений.
  │  ├─ normalizeOutputNumber.js    # <Number> (value) => !NaN || !infinity ? value : 'n/a'
  │  ├─ removeQuotes.js             # <String> ("\"someString\"") => "someString"
  │  ├─ stringify.js                # <Map||Set, Boolean> (value, appendKey) => appendKey ? { mapKey: "values" } : "values"
  │  ├─ stringReplaceBetween.js     # <Sting>, <Number>, <Number> <Sting> (str, startIndex, endIndex, replacment) => replaced characters between indexes from string
  ├─ valiadtor.js                   # Validator object, docs: (https://github.com/skaterdav85/validatorjs)
```
