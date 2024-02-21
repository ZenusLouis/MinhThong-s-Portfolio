document.addEventListener("DOMContentLoaded", async function () {
    const certificationList = document.querySelector('.certification-list');
    const certificationItems = document.querySelectorAll('.certification-item');

    async function showPDF(pdfUrl, container) {
        const pdfViewer = document.createElement('div');
        container.appendChild(pdfViewer);

        const pdfDoc = await pdfjsLib.getDocument(pdfUrl);

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);

            const viewport = page.getViewport({ scale: 1 });
            const scale = container.clientWidth / viewport.width;

            const scaledViewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = scaledViewport.height;
            canvas.width = scaledViewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: scaledViewport,
            };

            await page.render(renderContext).promise;
            pdfViewer.appendChild(canvas);
        }
    }

    for (const item of certificationItems) {
        const pdfViewer = item.querySelector('.pdf-viewer');
        const pdfUrl = pdfViewer.getAttribute('data-pdf');
        await showPDF(pdfUrl, pdfViewer);
    }
});