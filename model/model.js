module.exports.create = function (data, schema, callBack) {
  schema.create(data, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.find = function (data, schema, callBack) {
  schema.find(data, function (error, data) {
    if (error) callBack(error, null);
    else callBack(null, data);
  });
};

module.exports.findById = function (id, schema, callBack) {
  schema.findById(id, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.findByIdAndUpdate = function (id, data, options, schema, callBack) {
  schema.findByIdAndUpdate(id, data, options, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.findByIdAndRemove = function (id, schema, callBack) {
  schema.findByIdAndRemove(id, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.update = function (condition, data, options, schema, callBack) {
  schema.update(condition, data, options, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.aggregation = function (conditions, schema, callback) {
  schema.aggregate(conditions, function (error, data) {
    if (error) callback(error, null);
    else callback(null, data);
  });
};

module.exports.insertMany = function (data, Option, schema, callback) {
  schema.insertMany(data, Option, function (error, data) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports.insert = function (data, Option, schema, callback) {
  schema.insert(data, Option, function (error, data) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports.insertOne = function (data, Option, schema, callback) {
  schema.insertOne(data, Option, function (error, data) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports.findOneAndUpdate = function (
  condition,
  update,
  options,
  schema,
  callBack
) {
  schema.findOneAndUpdate(condition, update, options, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.findOne = function (condition, schema, callBack) {
  schema.findOne(condition, function (error, data) {
    if (error) callBack(error, null);
    else callBack(null, data);
  });
};

module.exports.findOneAndRemove = function (conditions, schema, callback) {
  schema.findOneAndRemove(conditions, function (error, category) {
    if (error) callback(error, null);
    else callback(null, category);
  });
};

module.exports.updateOne = function (condition, data, options, schema, callBack) {
  schema.updateOne(condition, data, options, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.addPath = function (path, schema, callBack) {
  schema.create({ path: path }, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};

module.exports.findProjectionOptionAndSort = function (
  condition,
  projection,
  option,
  schema,
  callBack
) {
  schema.find(condition, projection, option, function (error, data) {
    if (error) callBack(error, null);
    else callBack(null, data);
  });
};

module.exports.findOneProjectionOptionAndSort = function (
  condition,
  projection,
  option,
  schema,
  callBack
) {
  schema.findOne(condition, projection, option, function (error, data) {
    if (error) callBack(error, null);
    else callBack(null, data);
  });
};

module.exports.updateMany = function (condition, data, options, schema, callBack) {
  schema.updateMany(condition, data, options, function (error, data) {
    if (error) {
      callBack(error, null);
    } else {
      callBack(null, data);
    }
  });
};
