class BaseApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async findAll() {
        const response = await fetch(this.baseUrl);
        return await response.json();
    }

    async findById(id) {
        const response = await fetch(`${this.baseUrl}/${id}`);
        return await response.json();
    }

    async create(entity) {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
        return await response.json();
    }

    async modify(id, entity) {
        const response = await fetch(this.baseUrl + "/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
        return await response.json();
    }

    async removeById(id) {
        const response = await fetch(this.baseUrl + "/" + id, {
            method: 'DELETE'
        });
        return await response.text();
    }
}

//
// const productApi = new BaseApi("/api/v1/products");
// productApi.findAll()
// const orderApi = new BaseApi("/api/v1/orders");
// orderApi.findAll();



















