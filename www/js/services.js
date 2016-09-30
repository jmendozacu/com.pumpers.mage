function Service($rootScope, $http, $ionicPopup) {

    var api = {
	    website: 'restconnect/store/websiteinfo',
	    store: 'restconnect/store/storeinfo',
	    getStaticBlock: 'restconnect/index/getstaticblock',
	    getBannerBlock: 'restconnect/index/getbannerblock',
	    user: 'restconnect/customer/status',
	    forgotpwd: 'restconnect/customer/forgotpwd',
	    menus: 'restconnect/?cmd=menu',
        catalog:'restconnect/?cmd=catalog&categoryid=701&limit=20&page=1&order=name&dir=asc',
	    products: 'restconnect/',
	    login: 'restconnect/customer/login',
	    logout: 'restconnect/customer/logout',
	    register: 'restconnect/customer/register',
	    search: 'restconnect/search',
	    certGet: 'clnews/api/article',
	    searchAdvField: 'restconnect/searchadv/getfield',
	    searchAdv: 'restconnect/searchadv/index',
	    searchAgent: 'storelocator/index/city',
	    productDetail: 'restconnect/products/getproductdetail',
	    productImg: 'restconnect/products/getPicLists',
	    productOption: 'restconnect/products/getcustomoption',
	    cart: 'restconnect/cart/getCartInfo',
	    cartGetQty: 'restconnect/cart/getQty',
	    cartGetTotal: 'restconnect/cart/getTotal',
	    cartAdd: 'restconnect/cart/add'
    }, showError = false;

    $rootScope.service = {
        get: function (key, params, success, error) {
            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            //var url = Config.baseUrl + Config.getLocale() + api[key];
	        var url = Config.baseUrl + api[key];

            $http.get(url, {
                params: params,
                timeout: 20000
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        },
        post: function (key, params, success, error) {
            if (typeof params === 'function') {
                callback = params;
                params = null;
            }

            //var url = Config.baseUrl + Config.getLocale() + api[key];
	        var url = Config.baseUrl + api[key];

            $.post(url, {
                params: params,
                timeout: 20000
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        },
        sendSms: function (params, success, error) {
            if (typeof params === 'function') {
                error = success;
                success = params;
                params = null;
            }

            var url = Config.baseUrl + 'smsapi/SendTemplateSMS.php';
            $http.get(url, {
                params: params
            }).then(function (res) {
                success(res.data);
            }, handleError(error));
        }
    };

    function handleError(error) {
        return function (err) {
            if (error) error(err);
            if (showError) {
                return;
            }
            showError = true;
            console.log($rootScope.translations.network_error+'\r\n'+$rootScope.translations.check_network);
            /*
            $ionicPopup.alert({
                title: $rootScope.translations.network_error,
                template: $rootScope.translations.check_network,
                buttons: [{
                    text: $rootScope.translations.ok,
                    onTap: function () {
                        showError = false;
                    }
                }]
            });
            */
        };
    }
}
