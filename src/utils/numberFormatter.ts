import millify from "millify";

export const numberFormatter = (
    value: number,
    options?: {
        type?: "currency" | "number";
        locale?: string;
        currencySymbol?: string;
    }
): string => {
    const {
        type = "number",
        locale = "en-US",
        currencySymbol = "£",
    } = options || {};

    if (type === "currency") {
        const abbreviated = millify(value, { precision: 2, space: true });
        return `${currencySymbol} ${abbreviated}`;
    }

    return new Intl.NumberFormat(locale).format(value);
};
