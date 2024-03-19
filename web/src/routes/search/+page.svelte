<script>
    import axios from "axios";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    const orgid = "82e2f8eb-b9ef-469c-8678-27211299b6ba";
    let query = "";
    let qans = "";
    async function ask() {
        const res = await axios.post(`/api/search`, {
            text: query,
        });
        qans = res.data;
        query = query;
    }
</script>

<div class="container my-10">
    <Textarea bind:value={query}></Textarea>
    <div class="flex mt-4 justify-center">
        <Button on:click={ask}>ask</Button>
    </div>
</div>
<div class="flex flex-col container justify-center">
    {#each qans as an}
        <div class="my-4 flex justify-center">
            <div class="border p-4 dark:border-white border-black rounded-md">
                <pre
                    class=" max-w-full overflow-x-auto whitespace-pre-wrap break-words">{an.secdata}</pre>
                <a href="/subfile/{an.subfileid}">
                    <Button class="mx-auto w-full">
                        go to {an.subfileid}</Button
                    ></a
                >
            </div>
        </div>
    {/each}
</div>
