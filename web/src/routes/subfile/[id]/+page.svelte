<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    let datastring: string = "loading...";
    let subdatastring: string;
    onMount(async () => {
        id = window.location.href.split("/")[4];
        response = await axios.post(`/api/subfile`, {
            id,
        });
        const newtext = response.data.filedata.data;
        const newsubdatastring = response.data.subfiledata.secdata;
        console.log(datastring.indexOf(subdatastring));

        if (newtext === undefined || newtext === "undefined") {
            datastring = "file not found";
        } else {
            datastring = newtext;
        }
    });
</script>

<div class="flex container justify-center my-10">
    <pre
        class="border p-4 dark:border-white border-black rounded-md max-w-full overflow-x-auto whitespace-pre-wrap break-words">{datastring}
    </pre>
</div>
