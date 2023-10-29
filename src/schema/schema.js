const graphql = require("graphql");


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLDate
} = graphql;

const Gym = require('../models/gym');
const Purchase = require('../models/purchase');
const Customer = require('../models/customer');
const Training = require('../models/training');

//const moment = require("moment");
//var given = moment("1970-01-01", "YYYY-MM-DD");
//var current = moment().startOf('day');


//const todayis = moment.duration(given.diff(current)).asDays();




Gym.init()
Purchase.init()
Customer.init()
Training.init()




const GymType = new GraphQLObjectType({
    name: 'Gym',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        gymName: {
            type: GraphQLString
        },
        gymAdmin: {
            type: GraphQLString
        },
        gymPhone: {
            type: GraphQLString
        },
        gymFreeSpace: {
            type: GraphQLString
        },
      
    })
})

const PurchaseType = new GraphQLObjectType({
    name: 'Purchase',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        trainID: {
            type: GraphQLString
        },
        customerID: {
            type: GraphQLString
        },
        purchaseTrainPrice: {
            type: GraphQLInt
        },
        purchaseIncome: {
            type: GraphQLInt
        },

        
        

        Training: {
            type: TrainingType,
            resolve(parent, args) {
                return Training.findById(parent.trainID)
            }
        },
        Customer: {
            type: CustomerType,
            resolve(parent, args) {
                return Customer.findById(parent.customerID)
            }
        },
    })
})

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        customerName: {
            type: GraphQLString
        },
        customerEmail: {
            type: GraphQLString
        },
        customerRegister: {
            type: GraphQLInt
        },
       /* Rent: {
            type: new GraphQLList(RentType),
            resolve(parent, args) {

                return Rent.find({
                    readerID: parent._id
                });
            }
        }*/

    })
})

const TrainingType = new GraphQLObjectType({
    name: 'Training',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        gymID: {
            type: GraphQLString
        },
        Gym: {
            type: GymType,
            resolve(parent, args) {
                return Gym.findById(parent.gymID)
            }
        },
        trainType: {
            type: GraphQLString
        },
        trainPrice: {
            type: GraphQLInt
        },
    })
})

const Mutataion = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addGym: {
            type: GymType,
            args: {
                gymName: {
                    type: GraphQLString
                },
                gymAdmin: {
                    type: GraphQLString
                },
                gymPhone: {
                    type: GraphQLString
                },
                gymFreeSpace: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                const gym = new Gym({
                    gymName: args.gymName,
                    gymAdmin: args.gymAdmin,
                    gymPhone: args.gymPhone,
                    gymFreeSpace: args.gymFreeSpace,
                })
                gym.save();
                return gym;
            }
        },

        addPurchase: {
            type: PurchaseType,
            args: {
                trainID: {
                    type: GraphQLString
                },
                customerID: {
                    type: GraphQLString
                },
                purchaseTrainPrice: {
                    type: GraphQLInt
                },
                purchaseIncome: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                const purchase = new Purchase({
                    trainID: args.trainID,
                    customerID: args.customerID,
                    purchaseTrainPrice: args.purchaseTrainPrice,
                    purchaseIncome: args.purchaseIncome,
                })
                purchase.save();
                return purchase;
            }
        },

        addCustomer: {
            type: CustomerType,
            args: {
                customerName: {
                    type: GraphQLString
                },
                customerEmail: {
                    type: GraphQLString
                },
                customerRegister: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                const customer = new Customer({
                    customerName: args.customerName,
                    customerEmail: args.customerEmail,
                    customerRegister: args.customerRegister
                })
                customer.save();
                return customer;
            }
        },

        addTraining: {
            type: TrainingType,
            args: {
                trainType: {
                    type: GraphQLString
                },
                trainPrice: {
                    type: GraphQLInt
                },
                gymID: {
                    type: GraphQLString
                }
                
            },
            resolve(parent, args) {
                const training = new Training({
                    trainType: args.trainType,
                    trainPrice: args.trainPrice,
                    gymID: args.gymID
                })
                training.save();
                return training;

            }
        },



        deleteGym: {
            type: GymType,
            args: {
                gymID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Gym.findByIdAndRemove(args.gymID);
            }
        },

        deletePurchase: {
            type: PurchaseType,
            args: {
                purchaseID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Purchase.findByIdAndRemove(args.purchaseID)
            }
        },

        deleteCustomer: {
            type: CustomerType,
            args: {
                customerID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Customer.findByIdAndRemove(args.customerID);
            }
        },

        deleteTraining: {
            type: TrainingType,
            args: {
                trainingID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Training.findByIdAndRemove(args.trainingID);
            }
        },

        updateGym: {
            type: GymType,
            args: {
                gymID: {
                    type: GraphQLString
                },
                gymName: {
                    type: GraphQLString
                },
                gymAdmin: {
                    type: GraphQLString
                },
                gymPhone: {
                    type: GraphQLString
                },
                
            },
            resolve(parent, args) {
                return Gym.findByIdAndUpdate(args.gymID, {
                    $set: {
                    
                        gymName: args.gymName,
                        gymAdmin: args.gymAdmin,
                        gymPhone: args.gymPhone
                    }
                }, {
                    new: true
                }, );
            }
        },

        updatePurchase: {
            type: PurchaseType,
            args: {
                purchaseID: {
                    type: GraphQLString
                },
                trainID: {
                    type: GraphQLString
                },
                customerID: {
                    type: GraphQLString
                },
                purchaseTrainPrice: {
                    type: GraphQLInt
                },
                purchaseIncome: {
                    type: GraphQLInt
                },
                
            },
            resolve(parent, args) {
                return Purchase.findByIdAndUpdate(args.purchaseID, {
                    $set: {
                        trainID: args.trainID,
                        customerID: args.customerID,
                        purchaseTrainPrice: args.purchaseTrainPrice,
                        purchaseIncome: args.purchaseIncome,
                    }
                }, {
                    new: true
                }, );
            }
        },

        updateCustomer: {
            type: CustomerType,
            args: {
                customerID: {
                    type: GraphQLString
                },
                customerName: {
                    type: GraphQLString
                },
                customerEmail: {
                    type: GraphQLString
                },
                customerRegister: {
                    type: GraphQLInt
                }
            },
            resolve(parent, args) {
                return Customer.findByIdAndUpdate(args.customerID, {
                    $set: {
                        customerName: args.customerName,
                        customerEmail: args.customerEmail,
                        customerRegister: args.customerRegister
                    }
                }, {
                    new: true
                }, );
            }
        },

        updateTraining: {
            type: TrainingType,
            args: {
                trainingID: {
                    type: GraphQLString
                },
                trainType: {
                    type: GraphQLString
                },
                trainPrice: {
                    type: GraphQLInt
                },
                gymID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args.trainingID, {
                    $set: {
                        trainType: args.trainType,
                        trainPrice: args.trainPrice,
                        gymID: args.gymID
                    }
                }, {
                    new: true
                }, );

            }
        },

        purchaseTraining: {
            type: PurchaseType,
            args: {
                trainingID: {
                    type: GraphQLString
                },
                customerID: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                Training
                    .findById(args.trainingID)
                    .exec(function(err, training) {
                        if (err) {
                            console.log(err)
                        }
                        let aboba = parseInt(training.trainPrice*0.8);
                        const purchase = new Purchase({
                            trainID: args.trainingID,
                            customerID: args.customerID,
                            purchaseTrainPrice: training.trainPrice,
                            purchaseIncome: aboba,
                        })
                        purchase.save();
                        return purchase;

                    });
            }
        },

        




    }
})




const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        training: {
            type: new GraphQLList(TrainingType),
            resolve(parent, args) {
                return Training.find();
            }
        },
        gym: {
            type: new GraphQLList(GymType),
            resolve(parent, args) {
                return Gym.find();
            }
        },
        purchases: {
            type: new GraphQLList(PurchaseType),
            args: {
                customerID: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Purchase.find({
                    customerID: args.customerID
                })
            }
        },
        readCustomer: {
            type: CustomerType,
            args: {
                CustomerId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Customer.findById(args.CustomerId);
            }
        },
        readGym: {
            type: GymType,
            args: {
                gymId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Gym.findById(args.gymId);
            }
        },
        readPurchase: {
            type: PurchaseType,
            args: {
                purchaseId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Purchase.findById(args.purchaseId);
            }
        },
        readTraining: {
            type: TrainingType,
            args: {
                trainingId: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                return Training.findById(args.trainingId);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutataion
});
