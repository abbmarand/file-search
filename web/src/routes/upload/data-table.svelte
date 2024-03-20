<script lang="ts">
    import {
        createTable,
        Render,
        Subscribe,
        createRender,
    } from "svelte-headless-table";
    import { writable } from "svelte/store"; // Import writable store
    import * as Table from "$lib/components/ui/table";
    import { addPagination, addSortBy } from "svelte-headless-table/plugins";
    import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
    import DataTableActions from "./data-table-actions.svelte";
    import axios, { type AxiosResponse } from "axios";
    import { onMount } from "svelte";
    import { Button } from "$lib/components/ui/button";

    type File = {
        filename: string;
        fileid: string;
        time: string;
        date: number;
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

    function deleteItem(id: string) {
        data.update((items) => {
            return items.filter((item) => item.fileid !== id);
        });
    }

    export function addItem(newItem: File) {
        data.update((items) => {
            newItem.date = new Date(newItem.date * 1000).toDateString();
            return [...items, newItem];
        });
    }

    onMount(async () => {
        try {
            response = await axios.get("/api/files");
            let resdata = response.data;
            for (let dat of resdata) {
                dat.date = new Date(dat.date * 1000).toDateString();
                data.update((items) => [...items, dat]); // Update data array
            }
            init = true;
            table = createTable(data, {
                sort: addSortBy(),
            });

            columns = table.createColumns([
                table.column({
                    accessor: "filename",
                    header: "Name",
                }),
                table.column({
                    accessor: "time",
                    header: "Time(s)",
                    plugins: {
                        sort: {
                            disable: false,
                        },
                    },
                }),
                table.column({
                    accessor: "date",
                    header: "Date",
                    plugins: {
                        sort: {
                            disable: false,
                        },
                    },
                }),
                table.column({
                    accessor: "totalsubfiles",
                    header: "Subfiles",
                    plugins: {
                        sort: {
                            disable: false,
                        },
                    },
                }),
                table.column({
                    accessor: "state",
                    header: "State",
                    plugins: {
                        sort: {
                            disable: false,
                        },
                    },
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
                                    let:props
                                >
                                    <Table.Head {...attrs}>
                                        {#if cell.id === "date"}
                                            <Button
                                                variant="ghost"
                                                on:click={props.sort.toggle}
                                            >
                                                <Render of={cell.render()} />
                                                <ArrowUpDown
                                                    class={"ml-2 h-4 w-4"}
                                                />
                                            </Button>
                                        {:else if cell.id === "time"}
                                            <Button
                                                variant="ghost"
                                                on:click={props.sort.toggle}
                                            >
                                                <Render of={cell.render()} />
                                                <ArrowUpDown
                                                    class={"ml-2 h-4 w-4"}
                                                />
                                            </Button>
                                        {:else if cell.id === "totalsubfiles"}
                                            <Button
                                                variant="ghost"
                                                on:click={props.sort.toggle}
                                            >
                                                <Render of={cell.render()} />
                                                <ArrowUpDown
                                                    class={"ml-2 h-4 w-4"}
                                                />
                                            </Button>
                                        {:else if cell.id === "state"}
                                            <Button
                                                variant="ghost"
                                                on:click={props.sort.toggle}
                                            >
                                                <Render of={cell.render()} />
                                                <ArrowUpDown
                                                    class={"ml-2 h-4 w-4"}
                                                />
                                            </Button>
                                        {:else}
                                            <Render of={cell.render()} />
                                        {/if}
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
