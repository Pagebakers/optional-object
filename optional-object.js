Schemas = {}

Schemas.address = new SimpleSchema({
	'address': {
		type: String,
		label: 'Street and housenumber',
		max: 100
	},
	'zipcode': {
		type: String,
		label: 'Zipcode'
	},
	'city': {
		type: String,
		label: 'City',
		max: 100
	}
});

Schemas.creditcard = new SimpleSchema({
  'firstName': {
    type: String,
    label: 'First name',
    min: 2
  },
  'lastName': {
    type: String,
    label: 'Last name',
    min: 2
  },
  'number': {
    type: Number,
    label: 'Credit card number'
  },
  'expirationDate': {
    type: Date,
    label: 'Expiration date'
  }
});

Schemas.banktransfer = new SimpleSchema({
  'firstName': {
    type: String,
    label: 'First name',
    min: 2
  },
  'lastName': {
    type: String,
    label: 'Last name',
    min: 2
  },
  'number': {
    type: Number,
    label: 'Bank account number'
  },
  'confirmation': {
    type: Boolean,
    label: 'Confirmation'
  }
});

Orders = new Meteor.Collection('orders', {
  schema: new SimpleSchema({
    paymentMethod: {
      type: String,
      allowedValues: ['creditcard', 'banktransfer']
    },
    creditcard: {
      type: Schemas.creditcard,
      optional: true,
      // custom: function () {
      //   if (this.field('paymentMethod').value == 'creditcard') {
      //     console.log('Should validate creditcard fields now');
      //     return "required";
      //   }
      // }
    },
    banktransfer: {
      type: Schemas.banktransfer,
      optional: true,
      // custom: function () {
      //   if (this.field('paymentMethod').value == 'banktransfer') {
      //     console.log('Should validate banktransfer fields now');
      //     return "required";
      //   }
      // }
    }
  })
});

if (Meteor.isClient) {  
  Template.form.events({
    'click #accordion .panel-title a': function(e, tpl) {
      Session.set('paymentMethod', $(e.currentTarget).data('payment-method'));
    }
  });
  
  Template.form.paymentMethod = function() {
    return Session.get('paymentMethod');
  }
  
  AutoForm.hooks({
    order: {
      onSuccess: function() {
        console.log('success');
      },
      onSubmit: function() {
        console.log('submit');
        return false;
      },
      onError: function(operation, error, template) {
        console.log(error);
        console.log(Orders.simpleSchema().namedContext('order').invalidKeys());
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
