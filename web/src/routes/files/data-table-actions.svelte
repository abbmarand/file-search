<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import axios from "axios";
    export let deleteItem: (index: number) => void;
    export let id: string;
    function deletefile() {
        deleteItem(id);
        axios.post("/api/deletefile", { id });
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button
            variant="ghost"
            builders={[builder]}
            size="icon"
            class="relative h-8 w-8 p-0"
        >
            <span class="sr-only">Open menu</span>
            <Ellipsis class="h-4 w-4" />
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item
                on:click={() => navigator.clipboard.writeText(id)}
            >
                Copy FileId
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <a href="http://localhost:5173/file/{id}" target="_blank"
                >View file</a
            >
        </DropdownMenu.Item>
        <DropdownMenu.Item on:click={deletefile} class="text-red-500"
            >Delete file</DropdownMenu.Item
        >
    </DropdownMenu.Content>
</DropdownMenu.Root>
