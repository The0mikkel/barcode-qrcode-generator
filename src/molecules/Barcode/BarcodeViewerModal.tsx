import Barcode from "@/atoms/barcode";
import { useBarcode } from "@/state/barcodeContext";
import Modal from 'react-modal';
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MdDownload, MdIosShare } from "react-icons/md";
import barcodeSaver from "@/helper/barcodeSaver";

type BarcodeModalProps = {
    modalIsOpen: boolean;
    afterOpenModal: () => void;
    closeModal: () => void;
};

export default function BarcodeModal({ modalIsOpen, afterOpenModal, closeModal }: BarcodeModalProps) {
    const { t } = useTranslation();

    const { value, format } = useBarcode();
    const [barcodeId, setBarcodeId] = useState<string>("");

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Barcode Modal"
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-4xl" id="barcode-modal">
                <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
                    {t("app.generator.barcode.share")}
                </h2>

                {/* Scale content to fit inside container */}
                <div className="flex flex-col items-center w-full h-fit">
                    <Barcode value={value} format={format} size="large" setId={setBarcodeId} />
                </div>
                <div className="flex flex-row items-center justify-center border-t border-b border-gray-300 dark:border-gray-700 p-4 w-full mt-4">
                    {/* Share image */}
                    <button
                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mr-6"
                        onClick={() => {
                            // Save the barcode as an image
                            barcodeSaver(barcodeId);
                        }}
                    >
                        <MdDownload className="text-xl" />
                        <span>{t("app.generator.barcode.save")}</span>
                    </button>

                    {/* Share link */}
                    <button
                        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                        onClick={() => {
                            // Get current URL
                            const url = window.location.href;

                            // Copy to clipboard
                            navigator.clipboard.writeText(url);

                            // Prompt mobile share
                            if (navigator.share) {
                                navigator.share({
                                    title: "Barcode",
                                    text: "Barcode",
                                    url: url,
                                });
                            }
                        }}
                    >
                        <MdIosShare className="text-xl" />
                        <span>{t("app.generator.barcode.share")}</span>
                    </button>
                </div>

                <div className="flex flex-row justify-center w-full">
                    <button
                        onClick={closeModal}
                        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {t("word.close")}
                    </button>
                </div>
            </div>

        </Modal >
    );
}

