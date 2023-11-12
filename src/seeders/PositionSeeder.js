import Position from "../Models/PositionModel.js";

const PositionSeeder = async () => {
    const positions = []
    const positionOptions = ["Staff", "Employe", "Manager"];

    positionOptions.forEach(position => {
       positions.push({name:position})
    });
    
    await Position.insertMany(positions)
    console.log("position seeders success");
}

export default PositionSeeder