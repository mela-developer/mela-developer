<template>
  <div>
    <v-row align="center" align-content="stretch">
      <v-col>
        <v-btn-group divided density="compact" tile>
          <v-btn
            :loading="clearCacheLoading"
            variant="outlined"
            color="primary"
            size="small"
            @click="clearCache"
          >
            Clear Cache
          </v-btn>
          <v-btn
            size="small"
            :loading="exportExcelLoading"
            color="primary"
            @click="exportAsExcel"
          >
            Export Excel
          </v-btn>
          <v-btn
            size="small"
            :loading="exportCsvLoading"
            color="primary"
            @click="exportAsCsv"
          >
            Export CSV
          </v-btn>
          <v-switch
            v-model="exportSelectedOnly"
            label="選択中のみエクスポート"
            density="compact"
            color="primary"
            hide-details
            class="mx-4"
          ></v-switch>
        </v-btn-group>
        <v-progress-circular
          v-show="loading"
          :size="30"
          color="primary"
          indeterminate
          class="mx-2"
        />
      </v-col>
    </v-row>

    <vue-excel-editor ref="grid" v-model="items" readonly filter-row remember>
      <vue-excel-column
        field="施設形態"
        label="施設形態"
        type="string"
        width="100px"
      />
      <vue-excel-column
        field="配属先"
        label="配属先"
        type="string"
        width="100px"
      />
      <vue-excel-column
        field="寮の有無"
        label="寮の有無"
        type="select"
        :options="['有', '無']"
        width="50px"
      />
      <vue-excel-column
        field="年間休日 120 日以上可否"
        label="年間休日 120 日以上可否"
        type="select"
        :options="['可', '否']"
        width="75px"
      />
      <vue-excel-column
        field="ブランクOK"
        label="ブランクOK"
        type="select"
        :options="['', 'OK']"
        width="50px"
      />
      <vue-excel-column
        field="都道府県"
        label="都道府県"
        type="string"
        width="100px"
      />
      <vue-excel-column
        field="市区町村"
        label="市区町村"
        type="string"
        width="100px"
      />
      <vue-excel-column field="職種" label="職種" type="string" width="100px" />
      <vue-excel-column
        field="法人名"
        label="法人名"
        type="string"
        width="200px"
      />
      <vue-excel-column
        field="事業者名"
        label="事業者名"
        type="string"
        width="300px"
      />
      <vue-excel-column field="給与" label="給与" type="string" width="180px" />
      <vue-excel-column
        field="参考"
        label="参考"
        type="string"
        autoFillWidth
        :is-link="() => true"
      />
    </vue-excel-editor>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const KANGOROO_DATA_URL =
  'https://raw.githubusercontent.com/mela-developer/mela-developer/main/data/items_kangoroo.json'
const LEVERWELL_DATA_URL =
  'https://raw.githubusercontent.com/mela-developer/mela-developer/main/data/items_leverwell.json'

const items = ref([])
const grid = ref()

const exportSelectedOnly = ref(false)

const exportExcelLoading = ref(false)
const exportAsExcel = async () => {
  exportExcelLoading.value = true
  try {
    await grid.value.exportTable(
      'xlsx',
      exportSelectedOnly.value,
      'kango_table'
    )
  } catch (error) {
    console.error('Error exporting excel file:', error)
  } finally {
    exportExcelLoading.value = false
  }
}
const exportCsvLoading = ref(false)
const exportAsCsv = async () => {
  exportCsvLoading.value = true
  try {
    await grid.value.exportTable('csv', exportSelectedOnly.value, 'kango_table')
  } catch (error) {
    console.error('Error exporting csv file:', error)
  } finally {
    exportCsvLoading.value = false
  }
}

const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('There was a problem fetching the data:', error)
  }
}

const clearCacheLoading = ref(false)
const clearCache = async () => {
  clearCacheLoading.value = true
  items.value = []
  try {
    const urls = [KANGOROO_DATA_URL, LEVERWELL_DATA_URL]
    const results = await Promise.all(
      urls.map((url) => fetchData(url, { cache: 'no-store' }))
    )
    items.value = results.flat()
  } catch (error) {
    console.error('Error clearing cache:', error)
  } finally {
    clearCacheLoading.value = false
  }
}

const loading = ref(false)
onMounted(async () => {
  loading.value = true

  let kangoRooItems = await fetchData(KANGOROO_DATA_URL)
  let leverWellItems = await fetchData(LEVERWELL_DATA_URL)

  items.value = [...kangoRooItems, ...leverWellItems]

  loading.value = false
})
</script>
