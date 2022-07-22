<template>
    <div class="grid grid-flow-row auto-rows-auto gap-3">
        <div class="grid grid-flow-col auto-cols-auto">
            <div>
                <label for="showEntries" class="mr-3">Show</label>
                <select class="select select-bordered" v-model="showedEntries" @change="paginateEntries(1)" ref="show">
                    <option v-for="sh in showEntries" :key="sh" :value="sh">{{ sh }}</option>
                </select>
            </div>
            <div class="flex justify-end">
                <input type="search" placeholder="Search" class="input input-bordered w-full max-w-xs"
                    v-model="searchInput" @keyup="searchEvent" />
            </div>
        </div>
        <div>
            <table class="table-fixed w-full">
                <!-- head -->
                <thead class="bg-gray-100 font-bold text-xs leading-4 uppercase align-middle">
                    <tr>
                        <td class="p-4 rounded-l-lg">Tanggal</td>
                        <td class="p-4">Nama</td>
                        <td class="p-4">Rating</td>
                        <td class="p-4">Review</td>
                        <td class="p-4 rounded-r-lg">Komentar</td>
                    </tr>
                </thead>
                <tbody class="align-top">
                    <tr v-if="filteredEntries.length < 1">
                        <td colspan="5" class="text-center text-gray-500 p-4">
                            Ulasan penumpang kosong
                        </td>
                    </tr>
                    <tr v-for="p in filteredEntries" :key="p.id">
                        <td class="p-4 border-b border-gray-50">{{ changeDateFormat(p.feedback.created_at) }}</td>
                        <td class="p-4 border-b border-gray-50">{{ p.user_penumpang.name }}</td>
                        <td class="p-4 border-b border-gray-50">
                            <font-awesome-icon icon="star" class="text-lg text-yellow-400"
                                v-for="i in Number(p.feedback.rating)" :key="i" />
                        </td>
                        <td class="p-4 border-b border-gray-50">{{ p.feedback.review }}</td>
                        <td class="p-4 border-b border-gray-50">{{ p.feedback.komentar }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="grid grid-flow-col auto-cols-auto">
            <div>
                <p>Show {{ showInfo.from }} to {{ showInfo.to }} of {{ showInfo.of }}</p>
            </div>
            <div class="flex justify-end btn-group">
                <button
                    class="btn bg-white border-green-500 text-black hover:bg-green-500 hover:text-white hover:border-green-500"
                    @click.prevent="changePage(1)">First</button>
                <button
                    class="btn bg-white border-green-500 text-black hover:bg-green-500 hover:text-white hover:border-green-500"
                    v-for="sp in showPagination" :key="sp" :class="{
                        'bg-green-500': sp == currentPage,
                        'text-white': sp == currentPage,
                    }" @click.prevent="changePage(sp)">{{ sp }}</button>
                <button
                    class="btn bg-white border-green-500 text-black hover:bg-green-500 hover:text-white hover:border-green-500"
                    @click.prevent="changePage(allPages)">Last</button>
            </div>

        </div>
    </div>


</template>

<script>
import moment from "moment";
import { $array } from 'alga-js';

export default {
    props: {
        entries: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            showEntries: [5, 10, 20, 30, 40, 50, 100],
            showedEntries: 5,
            filteredEntries: [],
            currentPage: 1,
            positionOfEllipsis: 1,
            searchInput: '',
            searchEntries: [],
        }
    },
    computed: {
        tableHeader() {
            return this.columns || [];
        },
        allPages() { // buat nampilin ada berapa page
            const getCurrentEntries = this.searchEntries.length <= 0 ? this.entries : this.searchEntries;
            return $array.pages(getCurrentEntries, this.showedEntries);
        },
        tableData() { // buat filter data sesuai entries
            if (this.entries) {
                return $array.paginate(this.entries, this.currentPage, this.showedEntries);
            }
            return [];
        },
        showInfo() {
            const getCurrentEntries = this.searchEntries.length <= 0 ? this.entries : this.searchEntries;
            return $array.show(getCurrentEntries, this.currentPage, this.showedEntries);
        },
        showPagination() {
            return $array.pagination(this.allPages, this.currentPage, this.positionOfEllipsis);
        }
    },
    methods: {
        paginateEntries(page) {
            this.currentPage = page;
            if (this.searchInput.length >= 3) {
                this.searchEntries = $array.search(this.entries, this.searchInput);
                this.filteredEntries = $array.paginate(this.searchEntries, this.currentPage, this.showedEntries);
            } else {
                this.searchEntries = [];
                this.filteredEntries = $array.paginate(this.entries, this.currentPage, this.showedEntries);
            }
        },
        changePage(page) {
            this.paginateEntries(page);
        },
        searchEvent() {
            this.paginateEntries(1);
        },
        changeDateFormat(date) {
            return moment(date, "YYYY-MM-DD").format("dddd, DD MMMM YYYY HH:MM");
        },
    },
    created() {
        this.paginateEntries(1);
    }
}

</script>

<style scoped>
.green-kiri-active {
    background-color: #39ac00;
    color: white;
}
</style>