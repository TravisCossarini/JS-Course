class Product {
    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

class ElementAttribute {
    constructor(attrName, attrValue) {
        this.name = attrName;
        this.value = attrValue;
    }
}
class Component {
    constructor(renderHookId, shouldRender = true) {
        this.hookId = renderHookId;
        if (shouldRender) {
            this.render();
        }
    }

    createRootElement(tag, cssClasses, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClasses) {
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        document.getElementById(this.hookId).append(rootElement);
        return rootElement;
    }

    render() {}
}

class ShoppingCart extends Component {
    items = [];

    constructor(renderHookId) {
        super(renderHookId);
    }

    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
            2
        )}<h2>`;
    }

    get totalAmount() {
        const sum = this.items.reduce((previousValue, currentItem) => {
            return previousValue + currentItem.price;
        }, 0);
        return sum;
    }

    addProduct(product) {
        const updatedItems = [...this.items];
        updatedItems.push(product);
        this.cartItems = updatedItems;
    }

    orderProducts() {
        console.log('Ordering');
    }

    render() {
        const cartEl = this.createRootElement('section', 'cart');

        cartEl.innerHTML = `
        <h2>\$${0}</h2>
        <button>Order Now</button>
        `;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', () => this.orderProducts());
        this.totalOutput = cartEl.querySelector('h2');
    }
}

class Shop extends Component {
    constructor() {
        super();
    }

    render() {
        this.cart = new ShoppingCart('app');
        new ProductList('app');
    }
}

class ProductItem extends Component {
    constructor(product, renderHookId) {
        super(renderHookId, false);
        this.product = product;
        this.render();
    }

    addToCartHandler() {
        App.addProductToCart(this.product);
    }

    render() {
        const prodEl = this.createRootElement('li', 'product-item');
        prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" >
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
            </div>
        </div>
        `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener(
            'click',
            this.addToCartHandler.bind(this)
        );
        return prodEl;
    }
}

class ProductList extends Component {
    #products = [];

    constructor(renderHookId) {
        super(renderHookId, false);
        this.render();
        this.fetchProducts();
    }

    fetchProducts() {
        this.#products = [
            new Product(
                'A Pillow',
                'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
                'A soft pillow!',
                19.99
            ),
            new Product(
                'A Carpet',
                'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
                'A carpet which you might like - or not.',
                89.99
            ),
        ];
        this.renderProducts();
    }

    renderProducts() {
        for (const prod of this.#products) {
            const productItem = new ProductItem(prod, 'prod-list');
        }
    }

    render() {
        this.createRootElement('ul', 'product-list', [
            new ElementAttribute('id', 'prod-list'),
        ]);
        if (this.#products && this.#products.length > 0) {
            this.renderProducts();
        }
    }
}

class App {
    static init() {
        const shop = new Shop();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();
