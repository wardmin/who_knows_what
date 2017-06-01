export class RatingsController {
  constructor ($http) {
    'ngInject';

      this.$http = $http;
      this.getRating();

  }
    getRating() {
        var vm = this;
        this.$http.get('http://localhost:5000/api/ratings').then(function(result){
            vm.messages = result.data;
        });
    }

    postRating() {
        this.$http.post('http://localhost:5000/api/ratings', {msg: this.message});
    }

}

