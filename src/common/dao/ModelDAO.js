'use strict';

class ModelDAO {
    constructor(model) {
        this.Model = model;
    }

    createAndSave(data) {
        const object = new this.Model(data);
        return this.save(object);
    }

    save(object) {
        return object.save();
    }

    findOne(where) {
        return this.Model.findOne({ where });
    }

    findAll(where) {
        return this.Model.findAll({ where });
    }

    destroyAll() {
        return this.Model.destroy({ where: {},truncate: true });
    }
}

module.exports = ModelDAO;