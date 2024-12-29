export enum BarcodeEnum {
    CODE39 = "CODE39",
    CODE128 = "CODE128",
    CODE128A = "CODE128A",
    CODE128B = "CODE128B",
    CODE128C = "CODE128C",
    EAN13 = "EAN13",
    EAN8 = "EAN8",
    EAN5 = "EAN5",
    EAN2 = "EAN2",
    UPC = "UPC",
    UPCE = "UPCE",
    ITF14 = "ITF14",
    ITF = "ITF",
    MSI = "MSI",
    MSI10 = "MSI10",
    MSI11 = "MSI11",
    MSI1010 = "MSI1010",
    MSI1110 = "MSI1110",
    pharmacode = "pharmacode",
    codabar = "codabar",
    GenericBarcode = "GenericBarcode"
}

export const BarcodeRegex: { [key in BarcodeEnum]: RegExp } = {
    [BarcodeEnum.CODE39]: /^[0-9A-Z\-\.\ \$\/\+\%]+$/,
    [BarcodeEnum.CODE128]: /^[\x00-\x7F]+$/,
    [BarcodeEnum.CODE128A]: /^[\x00-\x5F]+$/,
    [BarcodeEnum.CODE128B]: /^[\x20-\x7F]+$/,
    [BarcodeEnum.CODE128C]: /^\d{2,}$/,
    [BarcodeEnum.EAN13]: /^\d{13}$/,
    [BarcodeEnum.EAN8]: /^\d{8}$/,
    [BarcodeEnum.EAN5]: /^\d{5}$/,
    [BarcodeEnum.EAN2]: /^\d{2}$/,
    [BarcodeEnum.UPC]: /^\d{12}$/,
    [BarcodeEnum.UPCE]: /^\d{6,8}$/,
    [BarcodeEnum.ITF14]: /^\d{14}$/,
    [BarcodeEnum.ITF]: /^\d{2,}$/,
    [BarcodeEnum.MSI]: /^\d+$/,
    [BarcodeEnum.MSI10]: /^\d+$/,
    [BarcodeEnum.MSI11]: /^\d+$/,
    [BarcodeEnum.MSI1010]: /^\d+$/,
    [BarcodeEnum.MSI1110]: /^\d+$/,
    [BarcodeEnum.pharmacode]: /^\d+$/,
    [BarcodeEnum.codabar]: /^[0-9A-D\-\.\$:\/\+\%]+$/,
    [BarcodeEnum.GenericBarcode]: /^.*$/
};

export type BarcodeFormat = keyof typeof BarcodeEnum;
