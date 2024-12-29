import { default as ExternalBarcode } from "react-barcode";
import { BarcodeFormat } from "@/types/barcode";
import React, { useEffect, useState } from "react";

type BarcodeProps = {
	value: string;
	format: BarcodeFormat;
	size?: "normal" | "large";
	setId?: (id: string) => void;
};

const sizes = {
	normal: {
		fontSize: 20,
		height: 100,
		width: 2,
	},
	large: {
		fontSize: 30,
		height: 200,
		width: 4,
	}
};

export default function Barcode(props: BarcodeProps) {
	// Generate UUID for the render
	const [uuid, setUUID] = useState<string>("");
	useEffect(() => {
		setUUID(Math.random().toString(36).substring(7));
	}, [props.setId]);

	useEffect(() => {
		if (props.setId) {
			props.setId(uuid);
		}
	}, [props.setId, uuid]);

	// Get listeners on window resize
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const [rendered, setRendered] = useState(false);

	window.addEventListener('resize', () => {
		setWindowSize(window.innerWidth);
	});

	useEffect(() => {
		// Get size of the barcode, compared to the modal, and scale it dynamically
		const wrapper = document.getElementById('barcode-image-wrapper-' + uuid);
		const container = document.getElementById('barcode-container-' + uuid);

		if (wrapper && container) {
			const wrapperWidth = wrapper.clientWidth;
			const wrapperHeight = wrapper.clientHeight;
			const containerWidth = container.clientWidth;
			const containerHeight = container.clientHeight;

			const scaleWidth = (containerWidth / wrapperWidth);
			const scaleHeight = (containerHeight / wrapperHeight);

			const scale = Math.min(scaleWidth, scaleHeight);

			let choosenScale;
			if (scale === scaleWidth) {
				choosenScale = "Width"
			} else {
				choosenScale = "Height"
			}

			console.log(scale, [wrapperWidth, wrapperHeight], [containerWidth, containerHeight], choosenScale);
			wrapper.style.transform = `scale(${scale})`;
		} else {
			console.warn("Wrapper or container not found");
		}

	}, [props, windowSize]);
	console.log(windowSize);

	return (
		<>
			<div id={"barcode-container-" + uuid} className="flex flex-col items-center w-full">
				<div id={"barcode-image-wrapper-" + uuid} className="w-fit">
					<ExternalBarcode value={props.value} format={props.format} fontSize={sizes[props.size || "normal"].fontSize} height={sizes[props.size || "normal"].height} width={sizes[props.size || "normal"].width} />
				</div>
			</div>
		</>
	);
}
