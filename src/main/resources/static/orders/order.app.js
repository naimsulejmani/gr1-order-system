class OrderApp {
    constructor() {
        this.productApi = new ProductApi();
        this.orderApi = new OrderApi();
        this.products = [];
        this.productSelect = document.getElementById("product");
        this.dateInput = document.getElementById("date");
        this.quantityInput = document.getElementById("quantity");
        this.priceInput = document.getElementById("price");
        this.discountInput = document.getElementById("discount");
        this.totalInput = document.getElementById("total");
        this.cart = [];
        this.productForm = document.getElementById("productForm");
        this.tableCartTBody = document.querySelector("table#tableCart tbody");
        this.btnSave = document.getElementById("btnSave");
        this.customer = document.getElementById("customer");

    }

    async init() {
        this.loadAndDisplayProducts();
        this.dateInput.value = new Date().toISOString().split("T")[0];
        this.onProductSelect();
        this.onRealCalc();
        this.onProductFormSubmit();
        this.onRemoveProductFromCart();
        this.onOrderSubmit();
    }

    async onOrderSubmit() {
        this.btnSave.addEventListener("click", async event => {
            event.preventDefault();
            if(!this.customer.value) {
                alert("Please provide a customer");
                return;
            }
            const order = {
                customer: {
                    id: parseInt(this.customer.value)
                },
                date: this.dateInput.value,
                employee: 'naimsulejmani',
                comment: 'Merri paret se si jep pastaj veq genjen',
                orderDetails: this.cart
            };

            const response = await this.orderApi.create(order);
            console.log(response);
            alert("CKA KUM THAN!")
        })
    }

    onRemoveProductFromCart() {
        this.tableCartTBody.addEventListener("click", event => {
            if (event.target.tagName === 'BUTTON' && event.target.textContent === 'X') {
                console.log(event.target);
                console.log(this.cart);
                let productId = event.target.dataset.productid;
                console.log(productId)
                this.cart = this.cart.filter(p => p.product.id != parseInt(productId));
                this.displayCart();
                this.calculateOrder();
            }
        })
    }

    onProductFormSubmit() {
        this.productForm.addEventListener("submit", event => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const {
                discount, price, productId
                , quantity, total
            } = Object.fromEntries(formData);
            const productName = this.productSelect.querySelector('option:checked').textContent;
            this.cart.push({
                discount: parseFloat(discount),
                price: parseFloat(price),
                product: {id: parseInt(productId), name: productName},
                quantity: parseInt(quantity),
                total: parseFloat(total)
            });

            this.displayCart();
            event.target.reset();
            this.calculateOrder();
        })
    }

    calculateOrder() {
        const totalNeto = this.cart.reduce((total, cartItem) => total + cartItem.total, 0);
        const tvsh = totalNeto * 0.18;
        const total = totalNeto + tvsh;
        document.getElementById("totalNeto").textContent = totalNeto.toFixed(2);
        document.getElementById("tvsh").textContent = tvsh.toFixed(2);
        document.getElementById("totalTvsh").textContent = total.toFixed(2);
    }
    displayCart() {
        this.tableCartTBody.innerHTML = "";
        this.cart.forEach(cartItem => {
            this.tableCartTBody.innerHTML += `
             <tr>
                <td>${cartItem.product.id}</td>
                <td>${cartItem.product.name}</td>
                <td>${cartItem.quantity.toFixed(2)}</td>
                <td>${cartItem.price.toFixed(2)}</td>
                <td>${cartItem.discount.toFixed(2)}</td>
                <td>${cartItem.total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm"
                    data-productId="${cartItem.product.id}"
                    data-text="palidhje">X</button>
                </td>
            </tr>
            `
        })
    }

    onRealCalc() {
        document.querySelectorAll("input.real-calc").forEach(input => {
            input.addEventListener("keyup", event => {
                this.calculate();
            })
        })
    }

    calculate() {
        const quantity = parseInt(this.quantityInput.value);//Number(....)
        const price = parseFloat(this.priceInput.value);
        const discount = parseFloat(this.discountInput.value);
        const total = quantity * price * (1 - discount / 100);
        this.totalInput.value = total.toFixed(2);
    }

    onProductSelect() {
        this.productSelect.addEventListener("change", event => {
            const product = this.products.find(product => product.id == event.target.value);
            document.getElementById("price").value = product.price;
            this.quantityInput.focus();
            // this.quantityInput.value = 1;
            this.quantityInput.select();
            this.calculate();
        })
    }

    async loadAndDisplayProducts() {
        this.products = await this.productApi.findAll();
        this.displayProducts();
    }

    displayProducts() {
        this.productSelect.innerHTML = "<option value=''>Select a product</option>";

        this.products.forEach(product => {
            this.productSelect.innerHTML += `
                <option value="${product.id}">${product.name}</option>
            `;
        })

    }

}

const orderApp = new OrderApp();
orderApp.init();








