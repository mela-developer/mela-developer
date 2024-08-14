<template>
  <vue-excel-editor v-model="items" readonly filter-row remember>
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
</template>

<script setup>
import { ref, onMounted } from "vue";

const items = ref([]);
const loading = ref(false);
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/mela-developer/mela-developer/main/data/items_kangoroo.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    items.value = data;
  } catch (error) {
    console.error("There was a problem fetching the data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<style scoped></style>
