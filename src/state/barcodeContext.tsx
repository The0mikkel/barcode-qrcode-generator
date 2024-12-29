import React, { createContext, useContext, useState, ReactNode } from "react";
import { BarcodeFormat } from "@/types/barcode";

interface BarcodeContextProps {
    format: BarcodeFormat;
    value: string;
    setFormat: (format: BarcodeFormat) => void;
    setValue: (value: string) => void;
}

type BarcodeProviderProps = {
	children: ReactNode;
	format: BarcodeFormat;
	value: string;
};

const BarcodeContext = createContext<BarcodeContextProps | undefined>(undefined);

export const BarcodeProvider: React.FC<BarcodeProviderProps> = (props: BarcodeProviderProps) => {
    const [format, setFormat] = useState<BarcodeFormat>(props.format);
    const [value, setValue] = useState<string>(props.value);

    return (
        <BarcodeContext.Provider value={{ format, value, setFormat, setValue }}>
            {props.children}
        </BarcodeContext.Provider>
    );
};

export const useBarcode = (): BarcodeContextProps => {
    const context = useContext(BarcodeContext);
    if (!context) {
        throw new Error("useBarcode must be used within a BarcodeProvider");
    }
    return context;
};