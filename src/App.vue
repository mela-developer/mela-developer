<template>
  <v-app id="inspire" class="fill-container">
    <v-navigation-drawer class="pt-4" color="grey-lighten-3" model-value rail>
      <v-avatar
        v-for="n in 6"
        :key="n"
        :color="`grey-${n === 1 ? 'darken' : 'lighten'}-1`"
        :size="n === 1 ? 36 : 20"
        class="d-block text-center mx-auto mb-9"
      ></v-avatar>
    </v-navigation-drawer>

    <v-main class="fill-container">
      <v-container fuild class="fill-container">
        <v-row>
          <v-col>
            <v-card title="Kangoroo" flat>
              <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
              ></v-text-field>
              <v-data-table
                multi-sort
                :headers="headers"
                :items="items"
                item-value="name"
                :loading="loading"
                :search="search"
                density="compact"
              >
                <template v-slot:loading>
                  <v-skeleton-loader type="table-row@15"></v-skeleton-loader>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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

<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.v-application {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.v-main {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

.fill-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
