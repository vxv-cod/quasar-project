<template>

<!--
  xs (extra small),
  sm (small),
  md (medium),
  lg (large),
  xl (extra large)
  -->
  <!-- <br><br>fistTdWidth {{ fistTdWidth }} -->
  <!-- <br><br><pre>zeroHeaders {{ zeroHeaders }}</pre> -->
  <!-- <br><br>multiSelectRows {{ multiSelectRows }} -->
  <!-- <br><br>selected {{ selected }} -->
  <br><br>visibleColumns {{ visibleColumns }}
  <br><br>computedColsParents {{ computedColsParents }}
  <!-- <br><br><pre>headers {{ headers }}</pre> -->

  <!-- <br><br>rows {{ rows }} -->
<!-- <br><br>loadRows {{ loadRows }} -->
<!-- <br><br>selectAllFil {{ selectAllFil }} -->
<!-- <pre>headers {{ headers }}</pre> -->
<!-- <br><br>columns {{ columns }} -->
<!-- <br><br>sumForColList {{ sumForColList }} -->
<!-- <br><br><pre>headers {{ headers }}</pre> -->

<!-- <br><br>filterColumns {{ filterColumns }}
<br><br>defaultColumns {{ defaultColumns }}
<br><br>columnsIndexRow {{ columnsIndexRow }}
<br><br>columnItem {{ columnItem }} -->
<!--
<br><br>pagination {{ pagination }}
<br><br>pagesNumber {{ pagesNumber }} -->
<!-- <br>rowsPagsInd {{ rowsPagsInd }} -->
<!-- <br>search {{ search }} -->

<div class="contener" style="">

  <!-- todo Верхняя панель Кнопки -->
  <div class="panel top" >
    <div class="" style="min-width: 35px; border-right: 1px solid white; "
    :style="showEditIcon ? `box-shadow: inset 0px 0px 15px #37474F` : null"
    >

      <!-- Редактируем таблицу -->
      <q-btn flat round color="white" size="sm"
        @click="showEditIcon = !showEditIcon, !showEditIcon ? saveEditData() : null"
        :icon="showEditIcon ? 'mdi-content-save-all-outline' : 'mdi-pencil'"
        :class="showEditIcon ? `text-amber` : null"
      >
        <q-tooltip v-if="!showEditIcon" anchor="top middle" self="bottom middle">Редактировать таблицу</q-tooltip>
        <q-tooltip v-else="showEditIcon" anchor="top middle" self="bottom middle">Сохранить таблицу</q-tooltip>
      </q-btn>

      <q-btn v-show="showEditIcon" @click="undo" flat round color="white" size="sm" icon="undo" :class="showEditIcon ? `text-amber` : null">
        <q-tooltip anchor="top middle" self="bottom middle">Отменить</q-tooltip>
      </q-btn>

      <q-btn v-show="showEditIcon" @click="redo" flat round color="white" size="sm" icon="redo" :class="showEditIcon ? `text-amber` : null">
        <q-tooltip anchor="top middle" self="bottom middle">Вернуть</q-tooltip>
      </q-btn>

      <!-- Отменить ВСЕ изменения -->
      <!-- :class="modifiedCells.every(e => Object.keys(e).length === 0) ? null : `text-amber` " -->
      <q-btn flat round color="white" size="sm" icon="mdi-arrow-u-left-top"
        v-show="showEditIcon"
        @click="cancelEdits"
        :class="showEditIcon ? `text-amber` : null"
      >
        <q-tooltip anchor="top middle" self="bottom middle">Отменить всё</q-tooltip>
      </q-btn>
    </div>

    <div>
      <!-- Сумма по колонкам -->
      <q-btn flat round color="white" size="sm" icon="mdi-sigma"
        @click="showSumRows = !showSumRows"
        :class="showSumRows ? `text-amber` : null"
        >
        <q-tooltip anchor="top middle" self="bottom middle">Сумма по колонкам</q-tooltip>
      </q-btn>

      <!-- Активация фиксации колонок -->
      <q-btn flat round color="white" size="sm" icon="mdi-lock-outline"
        @click="lockOutline = !lockOutline"
        :class="lockOutline ? `text-amber` : null "
        >
        <q-tooltip anchor="top middle" self="bottom middle">Фиксация колонок</q-tooltip>
      </q-btn>

      <!-- Активация фильтрации колонок -->
      <q-btn flat round color="white" size="sm" icon="mdi-filter-variant"
        @click="filterVariant = !filterVariant"
        :class="filterVariant ? `text-amber` : null "
        >
        <q-tooltip anchor="top middle" self="bottom middle">Фильтры по колонкам</q-tooltip>
      </q-btn>

      <!-- Активация Сортировки -->
      <q-btn flat round color="white" size="sm" icon="mdi-sort"
        @click="sortGeneral = !sortGeneral"
        :class="sortGeneral ? `text-amber` : null "
        >
        <q-tooltip anchor="top middle" self="bottom middle">Фильтры по колонкам</q-tooltip>
      </q-btn>

      <!-- Активация Мультивыбора -->
      <q-btn flat round color="white" size="sm" icon="mdi-checkbox-multiple-marked-outline"
        @click="multiSelectRows = !multiSelectRows"
        :class="multiSelectRows ? `text-amber` : null "
        >
        <q-tooltip anchor="top middle" self="bottom middle">Мультивыбор строк</q-tooltip>
      </q-btn>

    </div>

    <q-space />

    <!-- Пагинация -->
    <div class="row justify-center" style="margin: 5px;">
      <q-pagination
          v-model="pagination.page"
          :max="pagesNumber"
          :min="1"
          :max-pages="6"
          boundary-numbers
          color="white"
          active-design="outline"
          size="sm"

        />
    </div>

    <div class="" style="display: flex; ">
      <q-knob
        :min="5"
        :max="loadRows.length"
        :inner-min="5"
        v-model="pagination.rowsPerPage"
        size="20px"
        :thickness="0.2"
        color="black"
        track-color="white"
        style="margin: auto;"
      />
      <input type="number"
        v-model.number="pagination.rowsPerPage"
        style="max-width: 60px; font-size: 16px; margin-left: 5px;"
      >
      <q-tooltip anchor="top middle" self="bottom middle">Строк в таблице</q-tooltip>
    </div>

    <div class="search" style="" >
      <input type="text" placeholder="Поиск по таблице" v-model="search">
      <q-icon v-if="search === ''" name="search" size="sm" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" size="sm" />
    </div>

    <visiableColumn
      :iconBtn="`mdi-view-column`"
      :menuTitle="`Колонки`"
      :columnNames="columnKeys"
      :columnLabels="columnLabels"
      v-model:menuShow="menuShow"
      v-model:visibleColumns="visibleColumns"
    />

    <!-- Полноэкранный режим -->
    <q-btn
      flat round dense
      :icon="'fullscreen'"
      @click="toggleFullscreen"
      size="md"
      color="white"
      style="margin-right: 5px;"
    />

  </div>

  <div class="tableBox">
    <table >
      <!-- todo Заголовок таблицы -->
      <thead >
        <tr v-for="rowH in countRowsHeder" :key="rowH">
          <!-- ---------------------------------------------- -->
          <th
            :ref="rowH === 1 ? 'fistTd' : null"
            v-show="rowH === 1 && multiSelectRows"
            :style="`position: sticky; left: 0; z-index: 7; `"
            :rowspan="2"
            >
            <q-checkbox class="text-white" size="xs" dense style="" color="black"
              @click="toggleAll"
              :model-value="selectedAll"
              />
          </th>
          <!-- ---------------------------------------------- -->
          <!--
            visibleColumns.includes(col.visibleCol) && showCelsHed(col, rowH) ? null : 'display: none; ',
            v-show="showCelsHed(col, rowH)"

           -->
          <th v-for="(col, idx) in headers" :key="col.idCol"
            :id="iconShowHeds(col, rowH) ? col.name : null"
            :ref="col.fixed && iconShowHeds(col, rowH) ? 'fixRef' : 'notfixRef'"
            :rowspan="countRowsHeder.length == 2 && rowH === 1 && col.mergeParentName && col.rowspan === true ? 1 : 2"
            :colspan="rowH === 1 ? computedColsParents[col.mergeParentName] : 1"
            :style="[
              iconShowHeds(col, rowH) ? collFix(col, 5) : null,
            ]"
            v-show="showCelsHed(col, rowH)"
            >
            <div class="thHeaderBox " >
              <!-- Текст в ячейке -->
              <p >
                <!-- {{ col.visibleCol }} -->
                {{
                  rowH === 1 && col.mergeParentName && col.rowspan === true ?
                  col.mergeParentName : col.label
                }}
              </p>
              <!-- Кнопки -->
              <div style="display: flex;">
                <!-- фиксации колонок -->
                <q-btn flat round color="white" size="sm" icon="mdi-lock-outline"
                  v-if="lockOutline && iconShowHeds(col, rowH)"
                  @click="col.fixed = !col.fixed"
                  :class="[
                    lockOutline ? `tryaska` : null,
                    col.fixed ? `text-amber` : null
                    ]"
                  style="margin: auto;"
                />
                <!-- фильтрации колонок -->
                <menuFilter
                  v-if="filterVariant && iconShowHeds(col, rowH)"
                  v-model:menuShow="menuShow"
                  v-model:columnItem="columnItem"
                  :columnTitle="col.label"
                  :columnKey="col.name"
                  :showEditIcon="showEditIcon"
                  :columnValue="[... new Set(columns[col.name])]"
                  :outsideSelect="[... new Set(selectAllFil[col.name])]"
                  :colorBtn="Object.keys(filterColumns).includes(col.name) && col.name !=[] ? `text-amber` : null"
                  :class="filterVariant ? `tryaska` : null"
                  />
                <!-- Сортировка в колонках -->
                <q-btn flat round color="white" size="sm"
                  :icon="['mdi-sort', 'mdi-sort-ascending', 'mdi-sort-descending'][col.countSorted]"
                  v-if="sortGeneral && iconShowHeds(col, rowH)"
                  @click="rows = customSort(col); !sortGeneral ? col.countSorted = 0 : null"
                  :class="[
                    sortGeneral ? `tryaska` : null,
                    col.countSorted !==0 ? `text-amber` : null
                  ]
                  "
                  style="margin: auto;"
                  >
                </q-btn>
              </div>
            </div>
          </th>
        </tr>
      </thead>

      <!-- todo Строки -->
      <tbody >
        <tr v-for="row  in rows" :key="row.idRow"
          @click="!showEditIcon ? selectedRowsChanged(row.idRow) : null"
          :style="[
            rowsPagsInd?.includes(row.idRow) ? null : `display: none`,
          ]"

        >
        <td
          v-if="multiSelectRows"

          :style="[
            `position: sticky; left: 0; z-index: 4; background-color: white`,
            selected.includes(row.idRow) ? 'background-color: #cfd8dc' : null,
          ]"
          >
          <q-checkbox v-model="selected" :val="row.idRow" size="xs" dense color="black" />
        </td>

          <td v-for="col in headers" :key="col.idCol"
            v-text="row[col.name]"
            @input="(val) => tdInput(val, col.name, row.idRow, row[col.name])"
            @contextmenu="console.log('contextmenu => X =', $event.clientX, 'Y =', $event.clientY)"
            :contenteditable="showEditIcon && col.edit"
            :style="[
              `text-align: ${col.align}`,
              collFix(col),
              visibleColumns.includes(col.name) ? null : 'display: none; ',
              modifiedCells[row.idRow][col.name] ? `color: #0091EA; ` : null,
              selected.includes(row.idRow) ? 'background-color: #cfd8dc' : null,
              selected.includes(row.idRow) && col.fixed === true ? 'color: black; box-shadow: none' : null,
              showEditIcon && col.edit === false && !col.fixed ?
                `background-color: #cfd8dc; color: #455A64` : null,
            ]"
          >
          </td>
        </tr>
      </tbody>

      <tfoot >
        <tr v-if="showSumRows" class="tfootBottonSum">
          <th>
            <p ><q-btn flat round color="black" size="sm" icon="mdi-sigma"></q-btn></p>
          </th>
          <th v-for="name in sumForColList" :key="name">
            <p >{{ showSumRows ? name : null }}</p>
          </th>
        </tr>
        <tr class="tfootBotton">
          <td :colspan="visibleColumns.length + 1">
            <!-- Футер -->
          </td>
        </tr>
      </tfoot>

    </table>

    </div>
      <!-- <div class="panel botton" v-if="!showSumRows">
        <p>Нижний Div</p>
      </div> -->
      <blackout :menuShow="menuShow"/>
    </div>

  <!-- <q-resize-observer @resize="(size) => {console.log('resize-observer = ', size)}" /> -->




</template>


<script setup>
  import { Input } from "postcss";
  import menuFilter from "./vxv_Table_column_filter.vue"
  import visiableColumn from "./vxv_Table_visiable_column.vue"
  import blackout from "./blackout.vue"


  import loadRowsHeaders from "/public/data/vxv_Table.json"
  // import loadRowsHeaders from "/public/data/vxv_Table copy.json"



  // Загружаем тестовые данные
  // import loadData from "../store/projects.json"
  // const loadRowsXXX = []
  // loadData.map(e => {
  //   const temp = {}
  //   temp['ID'] = e.ID
  //   e.Contracts?.forEach(x => {
  //     temp['SHIFR'] = x.SHIFR
  //     temp['NAME'] = x.NAME
  //   })
  //   loadRowsXXX.push(temp)
  // })

  // const loadRowsHeaders = {
  //   loadHeaders : [
  //     {
  //       name: "idRow",
  //       align: "center",
  //       label: "ID",
  //       dataType: "number",
  //     },
  //     {
  //       name: "ID",
  //       required: true,
  //       label: "ID",
  //       align: "center",
  //       dataType: "number",

  //     },
  //     {
  //       name: "NAME",
  //       required: true,
  //       label: "Наименование объекта",
  //       align: "left",
  //       dataType: "string",
  //     },
  //     {
  //       name: "SHIFR",
  //       align: "center",
  //       label: "Carbs (g)",
  //       dataType: "string",
  //     },
  //   ],

  //   loadRows : loadRowsXXX
  // }




  // import { useMousePosition } from "./useMousePosition.js"
  // import datajs from "src/store/ContractsJs/data.js"
  // console.log("datajs = ", datajs);



  // import { useMousePosition } from "./useMousePosition.js"
  import { ref, reactive, computed, watch,
    onMounted,
    watchPostEffect,
    onUpdated,
    watchEffect,
    isRef,
    toRefs,
  } from 'vue'
  console.log("---------------------------------------------------------")

  // Загружаем данные
  const {loadRows, loadHeaders} = loadRowsHeaders

  // Проверяем есть ли дочерние колонки
  const mergColsBool = computed(() => loadHeaders.some( e => Object.keys(e).includes('columns')))
  const countRowsHeder = ref([1])

  // Наполняем свойствами колонки (zeroHeaders)
  let zeroHeaders = [
    {
      "name": "idRow",
      "align": "center",
      "label": "idRow",
      'edit' : false
    },
    {
      "name": "countersRow",
      "align": "center",
      "label": "№ п/п",
      'edit' : false
    },
  ]

  // При условии наличия вложеннцх колонок
  if(mergColsBool) {
    countRowsHeder.value = [1, 2]
    loadHeaders.forEach((e, i) => {
      if(e.columns) {
        e.columns.forEach((el, i) => {
          el['colspan'] = i === 0 ? true : false
          el['rowspan'] = i === 0 ? true : false
          el['mergeParentName'] = e.label
          el['numberMergeCell'] = i + 1
          zeroHeaders.push(el)
        })
      } else {zeroHeaders.push(e)}
    })
  }

  // Добираем свойствами колонки (zeroHeaders)
  zeroHeaders.forEach((e, i) => {
    e['sortable'] = true
    e['descending'] = false
    e['countSorted'] = 0
    e['fixed'] = false
    e['label'].includes('%') ? e['sort'] = (a, b) => parseInt(a, 10) - parseInt(b, 10) : null
    e['idCol'] = i,
    e['edit'] = e.edit === false ? false : true
  })

  // Добираем свойствами строки
  loadRows.forEach((e, i) => {
    e['idRow'] = i
    e['countersRow'] = i + 1
  })

  // Рекативим строки и колонки
  const rows = ref(loadRows)
  const headers = ref(zeroHeaders)
  const columnKeys = reactive(headers.value.map(e => e.name)).filter(e => e !== 'idRow')
  const columnLabels = reactive(headers.value.map(e => e.label)).filter(e => e !== 'idRow')
  const columnKeysReverse = [...columnKeys].reverse()

  // onMounted(() => {console.log('- onMounted -')})

  // ------------------------------------------------------------------------------------------------
  // Показать/скрыть колонки
  const visibleColumns = ref(zeroHeaders.map(e => e.name).filter(e => e !== 'idRow'))
  // visibleColumns.value.splice(visibleColumns.value.findIndex(e => e === 'idRow'), 1)
  // visibleColumns.value = visibleColumns.value.filter(e => e !== 'idRow')

  // Объект из повторяющихся значений и их количества из списка
  function arrayCountValues (arr) {
    var v, freqs = {};
    for (var i = arr.length; i--; ) {
      v = arr[i];
      if (freqs[v]) freqs[v] += 1;
      else freqs[v] = 1;
    }
    return freqs;
  }

  // Находим родителей вложенных колонок и считаем дочек
  const computedColsParents = computed(() => {
    let obj = {}
    let arr = []
    headers.value.forEach((col, i) => {
      if(col.mergeParentName && visibleColumns.value.includes(col.name)){
        arr.push(col.mergeParentName)
      }
    })
    obj = arrayCountValues(arr)
    return obj
  })

  // Функция отображения ячеек заголовка таблицы
  function showCelsHed(col, rowH) {
    let ParentNameBool = Object.keys(computedColsParents.value)?.includes(col.mergeParentName)
    if(visibleColumns.value.includes(col.name)) {
      if(countRowsHeder.value.length == 2) {
        if(rowH === 1) {return !col.numberMergeCell || col.numberMergeCell === 1 ? true : false}
        if(rowH === 2) {return col.mergeParentName ? true : false}
      } else {return true}
    } else {
      return rowH === 1 && col.numberMergeCell === 1 && ParentNameBool ? true : false
    }
  }

  // Определяем ячейки в звголовке таблицы для вставки кнопок (без учета родителей)
  function iconShowHeds(col, rowH) {
    if(countRowsHeder.value.length == 2) {
      return rowH === 1 && !col.mergeParentName || rowH === 2 && col.mergeParentName ? true : false
    } else {return true}
  }

  // ------------------------------------------------------------------------------------------------
  // Редактирование таблицы

  const showEditIcon = ref(false)
  const modifiedCells = ref([])

  modifiedCells.value = rows.value.map(() => new Object())

  function tdInput(val, name, index, old) {
    let value = val.target.textContent
    !isNaN(value) ? value = Number(value.replace(',', '.')) : null
    value !== old ? modifiedCells.value[index][name] = value : delete modifiedCells.value[index][name]
  }

  function saveEditData() {
    console.log("saveEditData")
    modifiedCells.value.map((e, i) => {
      if(Object.keys(e).length !== 0) {
        let idRowSearch = rows.value.findIndex(e => e.idRow === i)
        Object.entries(e).forEach(([key, val]) => {
          rows.value[idRowSearch][key] = val
          defaultColumns.value[key][i] = val
        })
      }
      modifiedCells.value[i] = new Object()
    })

    columnKeys.map(col => {
      columns.value[col] = defaultColumns.value[col].filter((e, i) =>
        columnsIndexRow.value[col].includes(i)
      )
    })

    selectAllFil.value = perevorot(rows.value)
  }

  const undo = () => document.execCommand('undo')
  const redo = () => document.execCommand('redo')

  function cancelEdits() {
    showEditIcon.value = false
    modifiedCells.value.map(e => undo())
  }

  function toggleFullscreen() {
    let elem = document.querySelector('table')
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Ошибка при попытке включить полноэкранный режим: ${err.message} (${err.name})`,
        );
      });
    } else {
      document.exitFullscreen();
    }
  }

  // ------------------------------------------------------------------------------------------------
  //. Фильтр по колонкам

  const menuShow = ref(false)
  const filterVariant = ref(false)

  const columns = ref({})
  const selectAllFil = ref({})
  const columnItem = ref({})
  const filterColumns = ref({})
  const idxListfilter = ref([])

  const perevorot = (val) => {
    // Переопределение массива из строк в столбцы
    const obj = {}
    columnKeys.map(col => obj[col] = val.map(e => e[col]))
    return obj
  }

  const defaultColumns = computed(() => perevorot(loadRows))
  // const columns = computed(() => perevorot(rows.value))

  // const columnsIndexRow = ref({})
  // let objTemp = {}
  // columnKeys.map(col => {
  //     objTemp = {}
  //     rows.value.map( (e, i) => objTemp[e['idRow']] = e[col] )
  //     columnsIndexRow.value[col] = objTemp
  //   }
  // )

  const columnsIndexRow = ref({})
  columnKeys.map(col => columnsIndexRow.value[col] = rows.value.map(e => e['idRow'] ))

  Object.entries(defaultColumns.value).map(([key, vals]) => {
      columns.value[key] = vals.slice()
      // colorEditCells.value[key] = vals.slice()
      selectAllFil.value[key] = vals.slice()
    })

  watch(() => columnItem.value, (item) => {
    selected.value = []
    // Определяем ключ и значение отправленное из диалога фильтра
    let itemKey = Object.keys(item)[0].slice()
    let itemVals = Object.values(item)[0].slice()

    //  Собираем объект из выбранных строк в фильтрах по столбцам
    filterColumns.value[itemKey] = itemVals
    // Значение автовыбора всех строк в текущем фильтре

    if(Object.values(filterColumns.value).length >= 1) {
      let key0 = Object.keys(filterColumns.value)[0]
      const Rows0 = defaultColumns.value[key0].slice()
      idxListfilter.value = []

      // Находим индескы из исходного списка по полученным значениям выбора в фильтрах
      defaultColumns.value[itemKey].forEach((e, i) => {if (itemVals.includes(e)) {idxListfilter.value.push(i)}})

      // Из полного списка строк в таблице фильтруем те, которые есть в списке выбранных индексов
      rows.value = loadRows.filter((e, i) => idxListfilter.value.includes(i) )

      //  Корректируем фильтра в столбцах, согласно полученным индексам
      Object.entries(defaultColumns.value).forEach(([key, vals]) => {
        // colorEditCells.value[key] = vals.filter((e, i) => idxListfilter.value.includes(i))

        if (key !== itemKey) {
          let arr = vals.filter((e, i) => idxListfilter.value.includes(i))
          // columns.value[key] = arr.slice()
          columns.value[key] = [... new Set(arr)]
          selectAllFil.value[key] = [... new Set(arr)]
          columnsIndexRow.value[key] = [...idxListfilter.value]
          // Удаляем все фильтра кроме 1го
          if (key !== key0) {delete filterColumns.value[key]}
          } else {selectAllFil.value[key] = itemVals}
        })
      // Для первого фильтра всегда полный список строк
      columns.value[key0] = [...Rows0]
      columnsIndexRow.value[key0] = Rows0.map((e, i) => i)

    }
    // Убираем читсим список для снятия цвета кнопки фильтра
    if(itemVals.length === [... new Set(columns.value[itemKey])].length) {
        delete filterColumns.value[itemKey]
      }
      idxListfilter.value = []
  }, { deep: true })

  // Сбрасываем все фильтра
  watch(() => filterVariant.value, (bool) => {
    if(bool === false) {
      if(Object.keys(filterColumns.value).length !== 0) {
        let key0 = Object.keys(filterColumns.value)[0].slice()
        Object.keys(filterColumns.value).reverse().map(e =>
          columnItem.value = {[key0] : [... new Set(columns.value[e])]}
        )
      }
    }
  })

// ----------------------------------------------------------------------------------------------
// Выбор строк таблицы
let selected = ref([])
// Мультивыбор
const multiSelectRows = ref(false)

const selectedRowsChanged = (item) => {
  if(multiSelectRows.value === true) {
    if (selected.value.includes(item) == false) {selected.value.push(item)}
    else {selected.value.splice(selected.value.indexOf(item), 1)}
  } else {
    selected.value = [item]
  }
}

watch(() => multiSelectRows.value, (val) => {
  val ? null : selected.value = []
})

function toggleAll () {
    if (selected.value.length) {selected.value = []}
    else {selected.value = rows.value.map(e => e.idRow)}
  }

const selectedAll = computed(() => {
  if(selected.value.length > 0 && selected.value.length !== rows.value.length) {return null}
  if(selected.value.length === 0) {return false}
  if(selected.value.length === rows.value.length) {return true}
})

// ------------------------------------------------------------------------------------------------
//. Фиксация колонок

const lockOutline = ref(false)
const fixRef = ref([])
// const notfixRef = ref([])
const fistTd = ref('')
const fistTdWidth = ref(1)

// Стили для фиксируемых колонок
const collFix = (column, idx=4) => {
  if (column.fixed) {
    return {
      'position':'sticky',
      'z-Index': idx,
      'left':`${column.left + fistTdWidth.value}px`,
      'right':`${column.right}px`,
      'color':'white',
      'background-color': '#78909C',
      'outline': '1px solid #ccc',
      'box-shadow': '5px 0px 10px #78909C',
    }
  }
}

// После рендера страницы корректируем fistTdWidth
watchPostEffect(() => {
  // console.log('fistTd.value = ', fistTd.value);
  fistTdWidth.value = fistTd.value[0].clientWidth
  console.log('watchPostEffect = ', fistTd.value[0].clientWidth);
})

// При обновлении таблицы корректируем fistTdWidth
onUpdated(() => {console.log('onUpdated_Table')
  fistTdWidth.value = fistTd.value[0].clientWidth
  IndentsTD('left')
  IndentsTD('right')
})

// Следим за изменением размера экрана и обновляем fistTdWidth
window.addEventListener("resize", (e) => {
  fistTdWidth.value = fistTd.value[0].clientWidth
  IndentsTD('left')
  IndentsTD('right')
})

const IndentsTD = (side) => {
  // Собираем списки с ширинами колонок и их именами
  let widths = []
  let keys = []
  const columnKeysList = side === 'right' ? columnKeysReverse : columnKeys
  if(fixRef.value !== null) {columnKeysList.forEach(x =>{
    fixRef.value ?.forEach(e => {
      if(x === e.id) {
        widths.push(e.clientWidth)
        // keys.push(e.id)
        keys.includes(e.id) ? null : keys.push(e.id)
      }})
  })}
  // Определяем отступы от границ
  let sumitem = 0
  keys?.forEach((e, i) => {
    sumitem += widths[i]
    headers.value.forEach(header => {
      if(header.name === e) {header[side] = sumitem - widths[i]
        header['width'] = widths[i]
    }})
  })
  sumitem = 0
}

watch(() => fixRef.value, (val) =>
  {
    IndentsTD('left')
    IndentsTD('right')
  },
  { deep: true }
)

// Сбрасываем все фиксации
watch(() => lockOutline.value, (bool) => {
  if(bool === false) {
    headers.value.forEach(e => e.fixed = false)
  }
})

// ------------------------------------------------------------------------------------------------
// Пагинация
const pagination = ref({
  page: 1,
  rowsPerPage: loadRows.length,
})

// Метод Math.ceil() - округление вверх. Округляет аргумент до ближайшего большего целого.
const pagesNumber = computed(() => Math.ceil(rows.value.length / pagination.value.rowsPerPage))

const rowsPagsInd = computed(() => {
  const arr = rows.value.map(e => e.idRow)
  const res = []
  const chunkSize = pagination.value.rowsPerPage
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res[pagination.value.page - 1]
})

// ------------------------------------------------------------------------------------------------
// Сортировка таблицы
const sortGeneral = ref(false)
function customSort(col) {
    console.log("Сортировка таблицы")
    const sortBy = col.name
    const dataType = col.dataType
    const descending = col.descending
    col.countSorted += 1
    if(col.countSorted === 3) {
      col.countSorted = 0
      const idRowList = rows.value.map((e, i) => e.idRow)
      return loadRows.filter(e => idRowList.includes(e.idRow))
    } else {
      const data = [...rows.value]
      if (sortBy) {
        data.sort((a, b) => {
          const x = descending ? b : a
          const y = descending ? a : b
          if (dataType === 'string') {
            // string sort
            return x[ sortBy ] > y[ sortBy ] ? 1 : x[ sortBy ] < y[ sortBy ] ? -1 : 0
          }
          else {
            // numeric sort
            return parseFloat(x[ sortBy ]) - parseFloat(y[ sortBy ])
          }
        })
      }
      headers.value.forEach(e => {
        if(e.name !== sortBy) {
          e.countSorted = 0
          e.descending = false
        } else {
          col.descending = !col.descending
        }
      })
      return data
    }
}

watch(() => sortGeneral.value, (val) => {
  if(val === false) {
    headers.value.map(e => {
      e.countSorted = 0
      e.descending = false
    })
    const idRowList = rows.value.map((e, i) => e.idRow)
    rows.value = loadRows.filter(e => idRowList.includes(e.idRow))
  }
})



// ------------------------------------------------------------------------------------------------
// Поиск по таблице
const search = ref('')

watch(() => search.value, (v) => {
  rows.value = loadRows.filter(e => {for (let i in e) {if ((e[i] || '')
  .toString().toLowerCase().includes((v || '').toString().toLowerCase())) {return e}}})

  // selected.value = selected.value.filter(e => {if (rows.value.includes(e)) {return e}})
  // modifiedCells.value = rows.value.map(() => new Object())
})

// ------------------------------------------------------------------------------------------------
// Сумма по колонкам
const showSumRows = ref(false)

function sumForColFUN(arr) {
  if(arr.some(tag => isNaN(tag))) {return null}
  else {
    let xxx = arr.reduce((sum, current) => sum + current, 0)
    if(Number.isInteger(xxx)) {return xxx} else {return xxx.toFixed(2)}
  }
}

const sumForColList = computed(() => {
  const obj = {}
  const colrow = perevorot(rows.value)
  visibleColumns.value.map(name => obj[name] = sumForColFUN(colrow[name]))
  return  obj
})
// ------------------------------------------------------------------------------------------------



// ------------------------------------------------------------------------------------------------
</script>

<style lang="sass" >
$color: #90A4AE
$box-shadow: $blue-grey-5
$column: 2
$max-width: 600px
$border: 1px solid $blue-grey-1
$outline: 0.5px solid white


input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  // -webkit-appearance: textfield

.tableBox
  scrollbar-width: thin
  scrollbar-color: $blue-grey-8 $color
  &::-webkit
    &-scrollbar               // скроллбар
      width: 6px
      &-button                // кнопка
        background: $blue-grey-8
        height: 6px
      &-track                 // трек
        background: $color
      &-track-piece           // видимая часть трека
        background: $color
      &-thumb                 // ползунок
        background: $blue-grey-8

body
  background: #ccf

input[type='number']
  -moz-appearance: textfield
  background-color: $blue-grey
  border: none
  margin: 0
  padding: 0
  width: 22px
  font-size: small
  text-align: center
  color: white
  opacity: 0.8

.search
  display: flex
  margin: 0 10px
  background-color: $blue-grey
  outline: $border
  color: white
  // color: red
  input
    background-color: inherit
    border: none
    margin: 0
    padding: 0 10px
    font-size: 12px
    // text-align: center
    display: inline-block
    color: inherit
    width: 100%
    opacity: 1
  input:focus, input:focus + .q-icon
    outline: $outline
    background-color: white
    color: black
  .q-icon
    color: inherit
    opacity: 0.8
.search:hover
  background-color: $color
  color: black

.contener
  margin: 5px
  background-color: white
  height: inherit
  // height: 100%
  height: 300px
  outline: $outline
  transition-property: display opacity height
  transition-duration: 0.3s
  .panel
    border: $outline
    display: flex
    background-color: $blue-grey
    min-height: 35px
    align-items: center
    position: sticky
    z-index: 4
    left: 0
    top: 0
    &.botton
      box-shadow: 0px -5px 10px $box-shadow
      bottom: 0
      background-color: $color
      margin-top: 1px
      outline: $outline
    p
      padding: 0 5px
      margin: auto 5px

  .tableBox
    overflow: auto
    height: inherit
    position: relative
    table
      border-collapse: collapse
      vertical-align: middle
      text-align: center
      width: 100%
      height: inherit
      transition-property: display opacity height
      transition-duration: 0.5s
      p
        height: 100&
        vertical-align: middle
        margin: auto
      thead
        background-color: $color
        box-shadow: 0px 5px 10px $box-shadow
        position: sticky
        top: 0
        z-index: 5
        height: 35px
        th
          background-color: $color
          padding: 5px
          user-select: none
          outline: $outline
        .thHeaderBox
          display: flex
          vertical-align: middle
          text-align: center
          z-index: 5

      tbody
        td
          height: inherit
          z-index: 1
          outline: $border
          background-color: white
          padding: 5px 5px
          transition-property: display opacity
          transition-duration: 0.5s
        // td:nth-child(3)
        //   text-align: left
      tfoot
        position: sticky
        left: 0
        right: 0
        top: 0
        bottom: 0
        z-index: 4

        tr
          background-color: $blue-grey-3
          align-items: center
          outline: $outline
          th
            margin: 0
            padding: 0
            // max-height: 25px
            outline: $outline
            transition-property: display opacity
            transition-duration: 0.5s
        .tfootBotton
          box-shadow: 0px -5px 10px $box-shadow
          background-color: $blue-grey
          min-height: 25px
          height: 25px
          outline: $outline
          z-index: 5




  // .ext-view-off
  //   display: none


// .tryaska:hover
.tryaska
  animation: example-fab-animate 0.8s cubic-bezier(.36,.07,.19,.97) both
  transform: translate3d(0, 0, 0)
  backface-visibility: hidden
  perspective: 1000px
@keyframes example-fab-animate
  10%, 90%
    transform: translate3d(-1px, 0, 0)
  20%, 80%
    transform: translate3d(2px, 0, 0)
  30%, 50%, 70%
    transform: translate3d(-4px, 0, 0)
  40%, 60%
    transform: translate3d(4px, 0, 0)






</style>
