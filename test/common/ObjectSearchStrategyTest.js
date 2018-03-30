const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const ObjectSearchStrategy = require('../../src/common/ObjectSearchStrategy');
const { NotFoundError } = require('../../src/common/errorHandling/httpErrors');

class DaoFake {
    constructor() {
        this.objectFake = {
            name: 'fakeObject'
        };
    }
    createAndSave() {
        return this.objectFake;
    }
}
describe('ObjectSearchStrategy', () => {
    let objectSearch = null;
    let searchPromiseStub = null;


    beforeEach(() => {
        objectSearch = new ObjectSearchStrategy();
        searchPromiseStub = sinon.stub(objectSearch, 'searchPromise');
    });

    describe('getObject', () => {
        it ('should return object when object found',  () => {
            let expectedResult = true;
            searchPromiseStub.returns(Promise.resolve(expectedResult));

            return expect(objectSearch.getObject()).to.be.fulfilled.and.eventually.equal(expectedResult);
        });
        it ('should throw not found error when object not found',  () => {
            searchPromiseStub.returns(Promise.resolve());

            return expect(objectSearch.getObject()).to.be.rejectedWith(NotFoundError);
        });
    });

    describe('getOrCreateObject', () => {
        let exampleParameters = {
            id: 0
        };

        it ('should return new object when object not found',  () => {
            let fakeDao = new DaoFake();
            let expectedResult = {
                isNewObject: true,
                object: fakeDao.objectFake
            };

            searchPromiseStub.returns(Promise.resolve());

            let promise = objectSearch.getOrCreateObject(fakeDao, exampleParameters);
            return expect(promise).to.be.fulfilled.and.eventually.deep.equal(expectedResult);
        });

        it ('should return existing object when object not found',  () => {
            let expectedResult = {
                isNewObject: false,
                object: exampleParameters
            };

            searchPromiseStub.returns(Promise.resolve(exampleParameters));

            return expect(objectSearch.getOrCreateObject()).to.be.fulfilled.and.eventually.deep.equal(expectedResult);
        });
    });
});