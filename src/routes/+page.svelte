<script lang="ts">
    import { onMount } from "svelte";
    let urlexemple = $state("");
    let theme = $state("icon");
    onMount(() => {
        urlexemple = `${window.location.href}api/icon?icons=windows11,apple,linux,svelte`;
    });
</script>

<main class="min-h-dvh min-w-dvw bg-gray-50 p-12">
    <div class="max-w-3xl flex flex-col mx-auto gap-8">
        <header class="text-center space-y-2">
            <h1 class="text-4xl font-extrabold text-gray-900">
                GitProfile<span class="text-indigo-600">Icons</span>
            </h1>
        </header>

        <section
            class="p-8 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4"
        >
            <h2 class="text-2xl font-bold text-gray-800">An exemple</h2>

            <input
                bind:value={urlexemple}
                class="bg-gray-50 border-gray-100 rounded-lg p-4 text-slate-900 font-mono text-sm"
            />

            <div
                class="flex justify-center items-center bg-gray-50 rounded-lg border border-gray-100 p-8"
            >
                <img
                    src={urlexemple}
                    class="h-auto max-w-full transition-transform"
                    alt="Exemple icons"
                />
            </div>
        </section>

        <section
            class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col gap-4"
        >
            <h2 class="text-2xl font-bold text-gray-800">All the icons</h2>
            <p>
                All the icons come from <a
                    class="text-indigo-600"
                    href="https://devicon.dev/">devicon.dev</a
                > and have the same names.
            </p>
            <select bind:value={theme}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="icon">icon</option>
            </select>

            <img
                src="/api/{theme}"
                class="w-full h-auto rounded-lg"
                alt="All the icons"
            />
        </section>
    </div>
</main>
