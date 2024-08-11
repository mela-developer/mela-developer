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
import { ref, computed, onMounted } from "vue";

const search = ref("");
const headers = ref([
  { title: "施設形態", key: "施設形態" },
  { title: "配属先", key: "配属先" },
  { title: "寮の有無", key: "寮の有無" },
  { title: "車通勤の可否", key: "車通勤の可否" },
  { title: "年間休日 120 日以上可否", key: "年間休日 120 日以上可否" },
  { title: "ブランクOK", key: "ブランクOK" },
  { title: "都道府県", key: "都道府県" },
  { title: "市区町村", key: "市区町村" },
  { title: "職種", key: "職種" },
  { title: "法人名", key: "法人名" },
  { title: "事業者名", key: "事業者名" },
  { title: "給与", key: "給与" },
  { title: "参考", key: "参考" },
]);

const items = ref([]);
const loading = ref(false);
const fetchData = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/shinoka7/shinoka7.github.io/main/data/kangoroo.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    items.value = data; // Assuming data is an array of objects
  } catch (error) {
    console.error("There was a problem fetching the data:", error);
  } finally {
    loading.value = false;
  }
};

const theme = ref("light");
function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

// Fetch the data when the component is mounted
onMounted(fetchData);
</script>

<style scoped></style>
