const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

const { addDummyFile, copyDummyFile } = require("./seed/seed");

const mainEntryPoint = require("../../src/index");

describe("Gets the file by public key", () => {
  describe("Gets the file by public key", () => {
    before(addDummyFile);
    before(copyDummyFile);

    context("GET /file/:publicKey", () => {
      it("should return status 200", (done) => {
        chai
          .request(mainEntryPoint)
          .get("/api/files/7b7fc110-9b41-4016-adac-326c69933391")
          .end((error, result) => {
            if (error) throw error;
            expect(result).to.have.status(200);
            expect(result.headers["content-type"]).to.have.string(
              "application/pdf"
            );
            done();
          });
      });
    });
  });

  describe("Delete a file", () => {
    context("DELETE /file/:privateKey", () => {
      it("should return status 200", (done) => {
        chai
          .request(mainEntryPoint)
          .delete("/api/files/cd8f23c9-74c5-4df2-bd67-93154073c975")
          .end((error, result) => {
            if (error) throw error;
            expect(result).to.have.status(200);
            expect(result.body["status"]).to.have.string("OK");
            expect(result.body["data"]).to.be.an("object");
            done();
          });
      });
    });
  });
});
