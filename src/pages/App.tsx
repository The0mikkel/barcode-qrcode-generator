import React from "react";
import Barcode from "react-barcode";
import { BarcodeEnum, BarcodeFormat, BarcodeRegex } from "@/types/barcode";
import Generator from "@/molecules/Generator";
import { BarcodeProvider, useBarcode } from "@/state/barcodeContext";
import { URLHelper } from "@/helper/URL";

export default function App() {
	// Get paramters from the URL
	const formatKey = URLHelper.getParameter("format") || BarcodeEnum.CODE128;

	const barcodeStrings = Object.keys(BarcodeEnum);
	let format = BarcodeEnum.CODE128;
	if (barcodeStrings.includes(formatKey)) {
		format = BarcodeEnum[formatKey as BarcodeFormat];
	}
	const value = URLHelper.getParameter('value') || 'Barcode';

	return (
		<BarcodeProvider format={format} value={value}>
			<Body />
		</BarcodeProvider>
	);
}

function Body() {
	// Get default from url
	const defaultType = URLHelper.getParameter('type') || "barcode";

	const [generator, setGenerator] = React.useState<string>(defaultType);

	const handleTypeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
		setGenerator(e.target.value);
		URLHelper.updateParameter('type', e.target.value);
	}

	const { setFormat, setValue } = useBarcode();

	return (
		<body className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full">
				<h1 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">Barcode & QR Code Generator</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
					Generate barcode and QR code images with React.
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
						<label htmlFor="barcode" className="ml-2 text-gray-700 dark:text-gray-300">Barcode</label>
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
						<label htmlFor="qr" className="ml-2 text-gray-700 dark:text-gray-300">QR Code</label>
					</div>
				</div>
				{/* Generator */}
				{generator === "barcode" && <Generator />}
				{generator === "qr" && <div className="flex justify-center my-20">
					<i>
						Currently not supported
					</i>
					</div>}

				{/* Reset */}
				<div className="flex justify-center mt-4">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						onClick={() => {
							setFormat(BarcodeEnum.CODE128);
							setValue("Barcode");

							URLHelper.removeParameter('format');
							URLHelper.removeParameter('value');
						}}
					>
						Reset
					</button>
				</div>
			</div>
		</body>
	);
}
