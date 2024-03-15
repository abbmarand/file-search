<script lang="ts">
    import {
        createTable,
        Render,
        Subscribe,
        createRender,
    } from "svelte-headless-table";
    import { writable } from "svelte/store"; // Import writable store
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./data-table-actions.svelte";
    import axios, { type AxiosResponse } from "axios";
    import { onMount } from "svelte";

    type File = {
        filename: string;
        fileid: string;
        time: string;
        date: string;
        state: string;
        totalsubfiles: number;
    };

    // Create writable store for data array
    let data = writable<File[]>([]);
    let init = false;
    let table;
    let columns;
    let { headerRows, pageRows, tableAttrs, tableBodyAttrs } = {};
    let response: AxiosResponse<any, any>;

    // Function to delete an item
    function deleteItem(id: string) {
        data.update((items) => {
            return items.filter((item) => item.fileid !== id);
        });
    }

    onMount(async () => {
        try {
            response = await axios.get("/api/files");
            let resdata = response.data;
            for (let dat of resdata) {
                dat.date = new Date(dat.date * 1000).toDateString();
                dat.time = `${dat.time}s`;
                data.update((items) => [...items, dat]); // Update data array
            }
            table = createTable(data); // Pass data store to createTable

            columns = table.createColumns([
                table.column({
                    accessor: "fileid",
                    header: "ID",
                }),
                table.column({
                    accessor: "filename",
                    header: "Name",
                }),
                table.column({
                    accessor: "time",
                    header: "Time",
                }),
                table.column({
                    accessor: "date",
                    header: "Date",
                }),
                table.column({
                    accessor: "totalsubfiles",
                    header: "Parts",
                }),
                table.column({
                    accessor: "state",
                    header: "State",
                }),
                table.column({
                    accessor: ({ fileid }) => fileid,
                    header: "",
                    cell: ({ value }) => {
                        return createRender(DataTableActions, {
                            id: value,
                            deleteItem,
                        });
                    },
                }),
            ]);

            ({ headerRows, pageRows, tableAttrs, tableBodyAttrs } =
                table.createViewModel(columns));
            init = true;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
</script>

{#if $data && init}
    <div class="rounded-md border">
        <Table.Root {...$tableAttrs}>
            <Table.Header>
                {#each $headerRows as headerRow}
                    <Subscribe rowAttrs={headerRow.attrs()}>
                        <Table.Row>
                            {#each headerRow.cells as cell (cell.id)}
                                <Subscribe
                                    attrs={cell.attrs()}
                                    let:attrs
                                    props={cell.props()}
                                >
                                    <Table.Head {...attrs}>
                                        <Render of={cell.render()} />
                                    </Table.Head>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Header>
            <Table.Body {...$tableBodyAttrs}>
                {#each $pageRows as row (row.id)}
                    <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                        <Table.Row {...rowAttrs}>
                            {#each row.cells as cell (cell.id)}
                                <Subscribe attrs={cell.attrs()} let:attrs>
                                    <Table.Cell {...attrs}>
                                        <Render of={cell.render()} />
                                    </Table.Cell>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Body>
        </Table.Root>
    </div>
{/if}
