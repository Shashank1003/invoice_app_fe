export interface Item {
    name: string;
    quantity: number;
    price: number;
    total: number;
    id?: string; // Optional ID for the item, useful for editing or deleting
}
