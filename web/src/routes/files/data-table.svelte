<script lang="ts">
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import axios, { type AxiosResponse } from "axios";
    import { onMount } from "svelte";

    type File = {
        filename: string;
        id: number;
        time: number;
        date: number;
    };

    let data: Payment[] = [
        {
            filename: "loading",
            id: "data",
            time: 0,
            date: 0,
        },
        // ...
    ];
    let init = false;
    let table;
    let columns;
    let { headerRows, pageRows, tableAttrs, tableBodyAttrs } = {};
    let response: AxiosResponse<any, any>;
    onMount(async () => {
        try {
            response = await axios.get("/api/files");
            data = response.data;
            table = createTable(readable(data));

            columns = table.createColumns([
                table.column({
                    accessor: "id",
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
                    accessor: ({ id }) => id,
                    header: "",
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

{#if data && init}
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
