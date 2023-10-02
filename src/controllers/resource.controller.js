import Resource from '../models/Resource.js';

export const createResource = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, type, url, extFile } = req.body;

    const resourceFound = await Resource.findOne({
      name, url, owner: userId
    });

    if(resourceFound)
      return res.status(400).json({
        message: 'Resource already exists.'
      });

    const resource = new Resource({
      name,
      type,
      url,
      extFile,
      owner: userId
    });

    const savedResource = await resource.save();

    return res.status(201).json({
      message: 'Resource saved succesfully!',
      data: savedResource
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}

export const getResourcesByUser = async (req, res) => {
  try {
    const userId = req.userId;

    const [ total, data ] = await Promise.all([
      Resource.countDocuments({ owner: userId }),
      Resource.find({ owner: userId })
    ]);

    return res.status(200).json({
      total,
      data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error })
  }
}

export const updateResourceById = async (req, res) => {
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.resourceId,
      req.body
    );

    return res.status(200).json({
      message: 'Resource was updated succesfully.',
      data: updatedResource
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}

export const deleteResourceById = async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.resourceId);
    return res.status(200).json({ message: 'Resource has been deleted succesfully.'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
}