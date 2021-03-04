const { describe, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("./app.js");
const FS = require("fs");
const dataBase = require("./dataBaseIndex.js");
const { TestScheduler } = require("jest");
let dataCheck = { full: "http://www.testurl.test" };
//  = {
//   full: "http://www.testurl.test",
//   id: "7FHt0",
//   createdAt: 1614817002422,
//   clicks: 0,
// };

beforeAll(async () => {
  await dataBase.load();
});

describe("Post method tests", () => {
  it("Should be able to get shortened URL", async () => {
    let response = await request(app)
      .post("/api/short/new")
      .send({ fullUrl: "http://www.testurl.test" });
    expect(response.status).toBe(200);
    expect(response.text.length).toBeLessThan("http://www.testurl.test".length);
    dataCheck.id = response.text;
  });
  it("Should response with an error if receiving an invalid URL", async () => {
    let response = await request(app)
      .post("/api/short/new")
      .send({ fullUrl: "zcp://dfww.testcvburl.sdfsdfvvfd" });
    expect(response.status).toBe(400);
    expect(response.text).toBe(`{"error":"invalid url"}`);
  });
  it("Should response with the same id if receiving an existing URL", async () => {
    let response = await request(app)
      .post("/api/short/new")
      .send({ fullUrl: `${dataCheck.full}` });
    expect(response.status).toBe(200);
    expect(response.text).toBe(dataCheck.id);
  });
});

describe("Get method tests", () => {
  it("Should be able to get redirected", async () => {
    let response = await request(app).get("/api/short/" + dataCheck.id);
    expect(response.status).toBe(302);
    expect(response.header.location).toEqual(dataCheck.full);
  });

  it("Should be able to get statistics for a short URL", async () => {
    let response = await request(app).get("/api/statistic/" + dataCheck.id);
    expect(response.status).toBe(200);
    const resText = response.text;
    const clicksRegExp = /\"clicks\":(\d*)/;
    const dateRegExp = /\"createdAt\":(\d*)/;
    const clicks = resText.match(clicksRegExp);
    const date = resText.match(dateRegExp);
    expect(resText).toEqual(
      `{\"full\":\"${dataCheck.full}\",\"id\":\"${dataCheck.id}\",${date[0]},${clicks[0]}}`
    );
  });

  it("Should add 1 to 'clicks' when redirecting", async () => {
    let response = await request(app).get("/api/statistic/" + dataCheck.id);
    expect(response.status).toBe(200);
    const clicksBefore = response.body.clicks;
    await request(app).get("/api/short/" + dataCheck.id);
    let response2 = await request(app).get("/api/statistic/" + dataCheck.id);
    expect(response.status).toBe(200);
    const clicksAfter = response2.body.clicks;

    expect(clicksAfter).toBe(clicksBefore + 1);
  });

  it("Should return an error when recieveing an invalid ID", async () => {
    let response = await request(app).get("/api/short/" + "not-existingid");
    expect(response.status).toBe(404);
    expect(response.text).toBe(`Not Found`);
  });
});

describe("Final test in honor of Ricky LaFlour", () => {
  test("it should be doing all the shit that needs to be done", async () => {
    let postRes = await request(app)
      .post("/api/short/new")
      .send({ fullUrl: "http://www.testurl.test" });
    expect(postRes.status).toBe(200);
    expect(postRes.text.length).toBeLessThan("http://www.testurl.test".length);

    let inValidPostRes = await request(app)
      .post("/api/short/new")
      .send({ fullUrl: "zcp://dfww.testcvburl.sdfsdfvvfd" });
    expect(inValidPostRes.status).toBe(400);
    expect(inValidPostRes.text).toBe(`{"error":"invalid url"}`);

    let sameIdPostRes = await request(app)
      .post("/api/short/new")
      .send({ fullUrl: "http://www.testurl.test" });
    expect(sameIdPostRes.status).toBe(200);
    expect(sameIdPostRes.text).toBe(dataCheck.id);

    let firstGetRes = await request(app).get("/api/short/" + dataCheck.id);
    expect(firstGetRes.status).toBe(302);
    expect(firstGetRes.header.location).toEqual(dataCheck.full);

    let statisticsRes = await request(app).get(
      "/api/statistic/" + dataCheck.id
    );
    expect(statisticsRes.status).toBe(200);
    const resText = statisticsRes.text;
    const clicksRegExp = /\"clicks\":(\d*)/;
    const dateRegExp = /\"createdAt\":(\d*)/;
    const clicks = resText.match(clicksRegExp);
    const date = resText.match(dateRegExp);
    expect(resText).toEqual(
      `{\"full\":\"${dataCheck.full}\",\"id\":\"${dataCheck.id}\",${date[0]},${clicks[0]}}`
    );

    let clicksRes = await request(app).get("/api/statistic/" + dataCheck.id);
    expect(clicksRes.status).toBe(200);
    const clicksBefore = clicksRes.body.clicks;
    await request(app).get("/api/short/" + dataCheck.id);
    let clicksRes2 = await request(app).get("/api/statistic/" + dataCheck.id);
    expect(clicksRes.status).toBe(200);
    const clicksAfter = clicksRes2.body.clicks;

    expect(clicksAfter).toBe(clicksBefore + 1);

    let response = await request(app).get("/api/short/" + "not-existingid");
    expect(response.status).toBe(404);
    expect(response.text).toBe(`Not Found`);
  });
});

// describe("PUT method tests", () => {
//   it("can update a bin by ID", async () => {
//     let getFirstResponse = await request(DB).get(
//       "/b/test-collection/test-put-file"
//     );
//     expect(getFirstResponse.status).toBe(200);
//     let response = await request(DB)
//       .put("/b/test-collection/test-put-file")
//       .send({ postTest: "put-test-value" });
//     expect(resppoonse.status).toBe(200);
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
// });
