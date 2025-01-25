const asyncHandler = require("express-async-handler");
const Machine = require("../models/machine");

//@desc Get All machines
//@route GET /api/machine
//@access Public
const getMachines = asyncHandler(async (req, res) => {
  const machines = await Machine.find();
  if (machines) {
    res.status(200).json({
      message: "Machines found",
      machines
    });
  } else {
    res.status(404);
    throw new Error("No machines found");
  }
});

//@desc Get machine details
//@route GET /api/machine/:id
//@access Public
const getMachine = asyncHandler(async (req, res) => {
  const machineId = req.params.id;
  const user = req.user;
  console.log(user);
  const machine  = await Machine.findById(machineId);
  if (machine) {
    if(user.role === 'farmer'){
        machine.documents = [];
    }

    res.status(200).json({
      message: "Machine found",
      machine
    });
  } else {
    res.status(404);
    throw new Error("Machine not found");
  } 
});

//@desc Add a machine 
//@route POST /api/machine
//@access Private
const addMachine = asyncHandler(async (req, res) => {
  const { name, description, price, image, documents } = req.body;
  const machine = new Machine({
    name,
    description,
    price,
    image,
    documents,
  });
  const createdMachine = await machine.save();
  res.status(201).json({
    message: "Machine added successfully",
    machine: createdMachine,
  });
});
