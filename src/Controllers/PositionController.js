import Position from "../Models/PositionModel.js";

export const getPositions = async (req, res) => {
  const positions = await Position.find({});
  res.status(200).json(positions);
};

export const getPosition = async (req, res) => { 
  const position = await Position.findById(req.params.id);
  if (!position) res.status(404).json({ message: "Position not found" });

  res.status(200).json(position);
};

export const createPosition = async (req, res) => {
  const { name } = req.body;
  const newPosition = Position.create({
    name,
  });

  try {
    res.status(200).json({
      message: "Success created",
      data: newPosition,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updatePosition = async (req, res) => {
  const { name } = req.body;
  const position = await Position.findById(req.params.id);
  if (!position) res.status(404).json({ message: "Position not found" });

  position.name = name;
  position.save();

  try {
    res.status(200).json({
      message: "Success updated",
      data: position,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deletePosition = async (req, res) => {
  const position = await Position.findById(req.params.id);
  if (!position) res.status(404).json({ message: "Position not found" });
  position.deleteOne({});

  res.status(200).json({ message: "Success deleted" });
};
