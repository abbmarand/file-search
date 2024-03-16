<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    let id: string;
    let response: string;
    let displaytext: string = "loading";
    onMount(async () => {
        try {
            id = window.location.href.split("/")[4];
            response = await axios.post(`/api/file`, {
                id,
            });

            const newtext = JSON.parse(JSON.stringify(response.data)).data;

            if (newtext === undefined || newtext === "undefined") {
                displaytext = "file not found";
            } else {
                displaytext = newtext;
            }
        } catch (error) {
            displaytext = "file not found";
        }
    });
</script>

<div class="flex container justify-center my-10">
    <pre class="border p-4 border-white rounded-md">{displaytext}</pre>
</div>
