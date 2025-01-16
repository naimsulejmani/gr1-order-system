

class OrderApi extends BaseApi {
    constructor() {
        super("/api/v1/orders");
    }

    // async getReports() {
    //     const response = await fetch(this.baseUrl + "/reports");
    //     return await response.json();
    // }
}