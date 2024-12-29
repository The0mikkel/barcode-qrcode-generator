import { default as ExternalBarcode } from "react-barcode";
import { BarcodeFormat } from "@/types/barcode";

type BarcodeProps = {
	value: string;
	format: BarcodeFormat;
};

export default function Barcode(props: BarcodeProps) {
  return (
	<>
		<ExternalBarcode value={props.value} format={props.format} />
	</>
  );
}
	