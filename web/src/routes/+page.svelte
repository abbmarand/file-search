<script>
    import axios from "axios";
    import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

    let files = {
        accepted: [],
        rejected: [],
    };
    const filesdb = {};
    let text = "";
    let filedata;
    let answer = false;
    async function Upload(text, filedata) {
        if (text !== "") {
            console.log(text, filedata);
            const res = await axios.post(`http://127.0.0.1:4000/sqa`, {
                q: text,
                c: filedata,
            });
            text = "";
            console.log(res);
            answer = res.data.answer.answer;
        }
    }
    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];

        for (let file of acceptedFiles) {
            let reader = new FileReader();
            reader.onload = function (event) {
                console.log(`File content: ${event.target.result}`);
                filesdb[file.name] = event.target.result;
            };
            reader.readAsText(file);
            console.log(filesdb);
        }
    }
</script>

<label for="avatar">Upload a picture:</label>
<input
    accept="image/png, image/jpeg"
    bind:files
    id="avatar"
    name="avatar"
    type="file"
/>
<label for="many">Upload multiple files of any type:</label>
<input bind:value={text} type="text" name="" id="" />
<input bind:files id="many" multiple type="file" />
<button on:click={Upload}>data</button>
{answer}

<Dropzone on:drop={handleFilesSelect} />
<ol>
    {#each files.accepted as item}
        <div class="flex flex-row">
            <li>{item.name}</li>
            <button on:click={Upload(text, filesdb[item.name])}>ask</button>
        </div>
    {/each}
</ol>
