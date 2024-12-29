import html2canvas from "html2canvas";

export default async function barcodeSaver(id: string) {
    const element = document.getElementById('barcode-image-wrapper-' + id);

    if (!element) {
        console.warn('Element not found - barcode-image-wrapper-' + id);
        return;
    }

    const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 10,
    });
    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    link.href = data;
    link.download = 'barcode.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}