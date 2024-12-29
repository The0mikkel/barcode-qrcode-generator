import { BarcodeFormat } from "@/types/barcode";
import { useTranslation } from "react-i18next";
import { MdDownload, MdFullscreen } from "react-icons/md";
import Barcode from "@/atoms/barcode";
import React from "react";
import BarcodeModal from "./BarcodeViewerModal";
import barcodeSaver from "@/helper/barcodeSaver";

type BarcodeProps = {
    value: string;
    format: BarcodeFormat;
};

export default function BarcodeWrapper(props: BarcodeProps) {
    const { t } = useTranslation();

    const [shareOpen, setViewerOpen] = React.useState(false);
    const [barcodeId, setBarcodeId] = React.useState<string>("");

    const { value, format } = props;

    let barcodeValue = value;
    let emptyValue = false;

    if (!barcodeValue) {
        console.warn("No barcode value provided");
        barcodeValue = "Barcode";
        emptyValue = true;
    }

    return (
        <div className="flex flex-col items-center w-full">
            {!emptyValue ? (
                <>
                    <Barcode value={barcodeValue} format={format} size="normal" setId={setBarcodeId} />
                    {/* Toolbar */}
                    <div className="flex flex-row items-center justify-center border-t border-b border-gray-300 dark:border-gray-700 p-4 w-full mt-4">
                        {/* Save image */}
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

                        {/* Open */}
                        <button
                            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 mr-4"
                            onClick={() => {
                                setViewerOpen(true);
                            }}
                        >
                            <MdFullscreen className="text-2xl" />
                            <span>{t("app.generator.barcode.view")}</span>
                        </button>

                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600 dark:text-gray-400 my-8">
                    {emptyValue ? t("app.generator.value.no_value") : ""}
                </p>
            )}
            <BarcodeModal modalIsOpen={shareOpen} afterOpenModal={() => { }} closeModal={() => setViewerOpen(false)} />
        </div>
    );
}
