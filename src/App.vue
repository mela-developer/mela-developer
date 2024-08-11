<template>
  <v-container>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const headers = ref([
  { text: "Header 1", value: "header1" },
  { text: "Header 2", value: "header2" },
  // Add more headers based on your JSON structure
]);

const items = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/shinoka7/shinoka7.github.io/gh-pages/kangoroo.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    items.value = data; // Assuming data is an array of objects
  } catch (error) {
    console.error("There was a problem fetching the data:", error);
  }
};

// Fetch the data when the component is mounted
onMounted(fetchData);
</script>

<style scoped></style>
