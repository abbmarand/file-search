<script lang="ts">
    import * as Menubar from "$lib/components/ui/menubar";
</script>

<Menubar.Root>
    <Menubar.Menu>
        <a class="hover:bg-muted/50 rounded-md" href="/"
            ><Menubar.Item>Chat</Menubar.Item></a
        >
        <Menubar.Separator />
        <a class="hover:bg-muted/50 rounded-md" href="/upload"
            ><Menubar.Item>Upload</Menubar.Item></a
        >
        <Menubar.Separator />
        <a class="hover:bg-muted/50 rounded-md" href="/search"
            ><Menubar.Item>search</Menubar.Item></a
        >
        <Menubar.Separator />
    </Menubar.Menu>
</Menubar.Root>
