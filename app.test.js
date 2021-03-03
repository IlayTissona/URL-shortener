const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("./app.js");
const FS = require("fs");
const testFile = {
  property1: "test-property1 value",
  property2: "test-property2 value",
  property3: "test-property3 value",
  property4: "test-property4 value",
};

// describe("Post method tests", () => {
//   it("Should be able to add a new bin", async () => {
//     let response = await request(DB)
//       .post("/b/test-collection/post-test")
//       .send({ postTest: "post-test-value" });
//     expect(response.status).toBe(200);
//     let getResponse = await request(DB).get("/b/test-collection/post-test");

//     expect(getResponse.status).toBe(200);
//     expect(getResponse.body).toEqual({ postTest: "post-test-value" });
//   });

//   // todo invalid post method test
// });







// describe("Get method tests", () => {
//   it("Should be able to get redirected", async () => {
//     let response = await request(DB).get("/b/test-collection/test-file");
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(testFile);
//   });
//   it("Should send an appropriate response if an illegal id is requested ", async () => {
//     let response = await request(DB).get(
//       "/b/test-collection/test-notExistingFile"
//     );
//     expect(response.status).toBe(404);
//     expect(response.text).toBe("File does not exist!");
//   });
// });



// describe("PUT method tests", () => {
//   it("can update a bin by ID", async () => {
//     let getFirstResponse = await request(DB).get(
//       "/b/test-collection/test-put-file"
//     );
//     expect(getFirstResponse.status).toBe(200);
//     let response = await request(DB)
//       .put("/b/test-collection/test-put-file")
//       .send({ postTest: "put-test-value" });
//     expect(response.status).toBe(200);
//     let getSecondResponse = await request(DB).get(
//       "/b/test-collection/test-put-file"
//     );
//     expect(getSecondResponse.status).toBe(200);
//     expect(getSecondResponse.body).not.toEqual(getFirstResponse.body);
//     await request(DB)
//       .put("/b/test-collection/test-put-file")
//       .send({ postTest: "back to normal" });
//   });

//   it("Should not create a new bin", async () => {
//     const before = FS.readdirSync("../Backend-excercises/bins/test-collection");
//     let response = await request(DB)
//       .put("/b/test-collection/test-put-file")
//       .send({ postTest: "second put test value" });
//     expect(response.status).toBe(200);
//     const after = FS.readdirSync("../Backend-excercises/bins/test-collection");
//     expect(after.length).toBe(before.length);
//   });

//   it("Should send an appropriate response if the bin is not found", async () => {
//     let response = await request(DB).put(
//       "/b/test-collection/test-notExistingFile"
//     );
//     expect(response.status).toBe(404);
//     expect(response.text).toBe("File does not exist!");
//   });
// });

// describe("DELETE method tests", () => {
//   it("can delete a bin by ID", async () => {
//     const before = FS.readdirSync("../Backend-excercises/bins/test-collection");
//     const response = await request(DB).delete("/b/test-collection/post-test");
//     expect(response.status).toBe(200);
//     const after = FS.readdirSync("../Backend-excercises/bins/test-collection");
//     expect(after.length).not.toBe(before.length);
//   });

//   it("Should send an appropriate response if the bin is not found", async () => {
//     let response = await request(DB).delete(
//       "/b/test-collection/test-notExistingFile"
//     );
//     expect(response.status).toBe(404);
//     expect(response.text).toBe("File does not exist!");
//   });
});
