export class Product {
    name: string;
    code: string;
    description: string;
    price: number;
    quantityInStock: number;
    category: string;
    active: boolean;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;

    constructor(props: Product) {
        this.name = props.name;
        this.code = props.code;
        this.description = props.description;
        this.price = props.price;
        this.quantityInStock = props.quantityInStock;
        this.category = props.category;
        this.active = props.active;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.deletedAt = props.deletedAt;
    }

    static createProduct(props: Product) {
        const product = new Product(props);
        return product;
    }

    static updateProduct(props: Product) {
        const product = new Product({ ...props, updatedAt: new Date() });
        return product;
    }

    static deleteProduct(props: Product) {
        const product: Product = { ...props, deletedAt: new Date() };
        return product;
    }

}
