# Preview

##Methods
Название | Поведение
------------ | -------------
`setTableInst` | сохраняет ссылку на _**Handsontable**_ в дату
`addRow` | добавляет ряд в таблицу и высчитывает новую высоту таблицы
`afterChangeObserver` | коллбэк для вычисления высчитываемых полей из конструктора отчетов срабатывает после изменения любой ячейки таблицы
`setDataAtCells` | сохраняет в таблицу новые **значения** ячеек
`storageData` | сохраняет данные таблицы в хранилище _**REPORT_CONSTRUCTOR/completedReport**_
##Computed
Название | Поведение
------------ | -------------
`mergedSettings` | вовзращает смерженный объект из `defaultSettings` и `normalizedConfig.settings`
`normalizedConfig` | возвращает объект настроек колонок для таблицы, Упорядоченный масив коллбэков, список заголовков для которых вычисляются значния
`reportColumns` | возвращает из хранилща _**REPORT_CONSTRUCTOR/reportColumns**_

##Data
Название | Поведение
------------ | -------------
hotInstance | ссылка на _**Handsontable**_
data | значения по умолчанию для _**Handsontable**_
staticHoSettings | настройки по умолчанию для _**Handsontable**_
