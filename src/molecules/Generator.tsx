import Barcode from "@/atoms/barcode";
import { URLHelper } from "@/helper/URL";
import { BarcodeProvider, useBarcode } from "@/state/barcodeContext";
import { BarcodeEnum, BarcodeFormat, BarcodeRegex } from "@/types/barcode";
import React from "react";

export default function Generator(): JSX.Element {
	const { format, value, setFormat, setValue } = useBarcode();
	const [error, setError] = React.useState<string>("");

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setValue(newValue);

		// Validate the new value based on the selected format
		if (BarcodeRegex[format].test(newValue)) {
			setError("");
		} else {
			setError(`Invalid value for format ${format}`);
		}

		URLHelper.updateParameter('value', newValue);
	};

	const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newFormat = e.target.value as BarcodeFormat;
		setFormat(newFormat);
		URLHelper.updateParameter('format', newFormat);

		if (BarcodeRegex[newFormat].test(value)) {
			setError("");
		} else {
			setError(`Invalid value for format ${format}`);
		}
	}

	return (
		<>
			<div className="space-y-6">
				<div>
					<label className="block text-gray-700 dark:text-gray-300 mb-2">Format</label>
					<select
						value={format}
						onChange={handleFormatChange}
						className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
					>
						{Object.keys(BarcodeEnum).map((key) => (
							<option key={key} value={key}>
								{key}
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block text-gray-700 dark:text-gray-300 mb-2">Value</label>
					<input
						type="text"
						value={value}
						onChange={handleValueChange}
						className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
					/>
					{error && <p className="text-red-500 mt-2">{error}</p>}
				</div>

				<div className="text-center">
					<div className="flex justify-center">
						<Barcode value={value} format={format} />
					</div>
				</div>
			</div>
		</>
	)
}