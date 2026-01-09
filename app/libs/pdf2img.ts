let pdfjsLib: typeof import("pdfjs-dist") | null = null;

async function loadPdfJs() {
    if (pdfjsLib) return pdfjsLib;

    if (typeof window === "undefined") {
        throw new Error("PDF.js can only run in the browser");
    }

    const lib = await import("pdfjs-dist");
    const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");

    lib.GlobalWorkerOptions.workerSrc = worker.default;

    pdfjsLib = lib;
    return lib;
}

export async function convertPdfToImage(file: File) {
    try {
        const lib = await loadPdfJs();

        const buffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: buffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 3 });
        const canvas = document.createElement("canvas");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvas, viewport }).promise;

        return new Promise<{ file: File | null }>((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    resolve({ file: null });
                    return;
                }

                resolve({
                    file: new File([blob], "resume.png", { type: "image/png" }),
                });
            });
        });
    } catch (err) {
        console.error("PDF → Image failed:", err);
        return { file: null };
    }
}
