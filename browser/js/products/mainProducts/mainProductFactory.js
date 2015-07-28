app.factory('mainProductFactory', function($http,$state){
	return {
		getAll: function(){
			return $http.get('/api/products')
			.then(function(res){
				return res.data
			})
		},
		getOne: function(id){
			return $http.get('api/products/'+ id)
			.then(function(res){
				return res.data
			})
		},
		addProduct: function(data){
			return $http.post('api/products', data)
			.then(function(res){
				return res.data
			})
			.then(function(){
				$state.go('mainProductState')
			})
		},
		deleteProduct: function(id){
			return $http.delete('api/products/'+ id)
			.then(function(res){
				return res.data
			})
			.then(function(){
				$state.go('mainProductState');
			})
		},
		editProduct: function(id, updateData){
			return $http.put('api/products/'+ id, updateData)
			.then(function(res){
				return res.data
			})
			.then(function(){
				$state.go('mainProductState');
			})
		}
	}
})