import User from '../model/userModel.js';

// C - Create (create a new user)
export const create = async (req, res)  => {
    try {
        const userData = new User(req.body);

        // check if the user exist
        if(!userData) {
            return res.status(404).json({msg: "User not found"});
        }

        const savedData = await userData.save();
        res.status(200).json({ msg: "User Added Successfully", data: savedData });

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read (Read all users)
export const getAll = async (req, res) => {
    try {
        const userData = await User.find();

        // check if the user exist
        if(!userData) {
            return res.status(404).json({msg: "User not found"});
        }

        // Display all users
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// R - Read (Read paticular user by id)
export const getOne =  async (req, res) => {
    try {
        
        // get the user id
        const id = req.params.id;

        // pass the id to the function
        const userExist = await User.findById(id);

        // check if the user exist
        if(!userExist) {
            return res.status(404).json({msg: "User not found"});
        }

        // Display the user according to the id
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// U - Update (Update paticular user by id)
export const updateUser = async (req, res) => {
    try {
        // get the user id
        const id = req.params.id;

        // pass the id to the function
        const userExist = await User.findById(id);

        // check if the user exist
        if(!userExist) {
            return res.status(404).json({msg: "User not found"});
        }

        // Update the user data
        const updateData = await User.findByIdAndUpdate(id, req.body, {new:true});

        // Display the updated data
        res.status(200).json({msg: "User Updated Successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

// D - Delete (Delete User)
export const deleteUser = async (req, res) => {
    try {
        // get the user id
        const id = req.params.id;

        // pass the id to the function
        const userExist = await User.findById(id);

        // check if the user exist
        if(!userExist) {
            return res.status(404).json({msg: "User not found"});
        }

        // Delete the user
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "User deleted successfully"}); 

    } catch (error) {
        res.status(500).json({error: error});
    }
}