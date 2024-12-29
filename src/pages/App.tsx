import React from "react";
import { BarcodeEnum, BarcodeFormat } from "@/types/barcode";
import Generator from "@/molecules/Barcode/Generator";
import { BarcodeProvider, useBarcode } from "@/state/barcodeContext";
import { URLHelper } from "@/helper/URL";
import { useTranslation } from 'react-i18next';
import { MdIosShare, MdRestore } from "react-icons/md";

export default function App() {
	// Get paramters from the URL
	const formatKey = URLHelper.getParameter("format") || BarcodeEnum.CODE128;

	const barcodeStrings = Object.keys(BarcodeEnum);
	let format = BarcodeEnum.CODE128;
	if (barcodeStrings.includes(formatKey)) {
		format = BarcodeEnum[formatKey as BarcodeFormat];
	}
	const value = URLHelper.getParameter('value') || '';

	return (
		<BarcodeProvider format={format} value={value}>
			<Body />
		</BarcodeProvider>
	);
}

function Body() {
	const { t, i18n } = useTranslation();

	// Get default from url
	const defaultType = URLHelper.getParameter('type') || "barcode";

	const [generator, setGenerator] = React.useState<string>(defaultType);

	const handleTypeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGenerator(e.target.value);
		URLHelper.updateParameter('type', e.target.value);
	}

	const { setFormat, setValue } = useBarcode();

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900" lang={i18n.language}>
			<main className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full" lang={i18n.language}>
				<h1 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
					{t('app.title')}
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
					{t('app.subtitle')}
				</p>

				{/* Switch to switch between barcode and QR */}
				<div className="flex justify-center mb-4">
					<div className="flex items-center mr-4">
						<input
							type="radio"
							id="barcode"
							name="type"
							value="barcode"
							onChange={handleTypeUpdate}
							checked={generator === "barcode"}
							className="form-radio text-blue-600 dark:text-blue-400"
						/>
						<label htmlFor="barcode" className="ml-2 text-gray-700 dark:text-gray-300">
							{t('word.barcode')}
						</label>
					</div>
					<div className="flex items-center">
						<input
							type="radio"
							id="qr"
							name="type"
							value="qr"
							onChange={handleTypeUpdate}
							checked={generator === "qr"}
							className="form-radio text-blue-600 dark:text-blue-400"
						/>
						<label htmlFor="qr" className="ml-2 text-gray-700 dark:text-gray-300">
							{t('word.qrcode')}
						</label>
					</div>
				</div>
				{/* Generator */}
				{generator === "barcode" && <Generator />}
				{generator === "qr" && <div className="flex justify-center my-20">
					<i>
						{t('util.util.currently_not_supported')}
					</i>
				</div>}

				{/* Reset */}
				<div className="flex flex-col items-center justify-center">
					<div className="flex justify-center mt-4">
						<button
							className="flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
							onClick={() => {
								setFormat(BarcodeEnum.CODE128);
								setValue("");

								URLHelper.removeParameter('format');
								URLHelper.removeParameter('value');
							}}
						>
							<MdRestore className="text-xl mr-2" />
							{t('word.reset')}
						</button>
						<button
							className="flex flex-row items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
							<MdIosShare className="text-xl mr-2" />
							{t('word.share')}
						</button>
					</div>
				</div>
			</main>

			<footer className="flex justify-center mt-8 text-gray-600 dark:text-gray-400">
				<p>
					{t('app.footer.created_by')}
					{" "}
					<a
						href="https://themikkel.dk"
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						Mikkel Albrechtsen
					</a> -
					{" "}
					{t('app.footer.source_available_at')}
					{" "}
					<a
						href="
						https://github.com/The0mikkel/tm-barcode-qrcode-generator
						"
						target="_blank"
						rel="noopener noreferrer"
						className="underline"
					>
						Github
					</a>
				</p>
			</footer>
		</div>
	);
}
