const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const propertyConfigAndKeyUpdate = require('../../src/config/propertyConfigAndKeyUpdate');



describe('PropertyConfigAndKeyUpdate', () => {
    let getOrCreateObjectStub = sinon.stub(propertyConfigAndKeyUpdate, 'getOrCreateObject');;


    beforeEach(() => {
        getOrCreateObjectStub.reset();
    });

    describe('updateOrCreateProperty', () => {
        it ('should return new when object created',  () => {
            let expectedResult = {
                isNewObject: true,
                object: {}
            };

            getOrCreateObjectStub.returns(Promise.resolve(expectedResult));

            return expect(propertyConfigAndKeyUpdate.updateOrCreateProperty())
                .to.be.fulfilled.and.eventually.equal(expectedResult);
        });

        it ('should update object key when property exists',  () => {
            let fakeDAO = {
                save: sinon.stub()
            };
            let properties = { value: 'updatedValue'}
            let result = {
                isNewObject: false,
                object: {}
            };

            let expectedResult = {
                isNewObject: false,
                object: {
                    value: properties.key
                }
            };

            getOrCreateObjectStub.returns(Promise.resolve(result));

            expect(fakeDAO.save.calledOnce);
            expect(fakeDAO.save.calledWith(expectedResult));
        });
    });
});